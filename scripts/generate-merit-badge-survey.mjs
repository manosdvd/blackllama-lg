import { readFile, writeFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const sourceUrl = new URL("../masterMB.csv", import.meta.url);
const outputUrl = new URL("../lib/merit-badge-survey.generated.ts", import.meta.url);
const expectedHeaders = ["Tier", "Merit Badge", "Area", "Status", "Prerequisites", "Unattainable at Camp", "Est. Class Hrs", "Est. Ind. Hrs"];

const titleOverrides = new Map([
  ["Am. Business", "American Business"],
  ["Am. Cultures", "American Cultures"],
  ["Am. Heritage", "American Heritage"],
  ["Cit. in Community", "Citizenship in the Community"],
  ["Cit. in Nation", "Citizenship in the Nation"],
  ["Cit. in World", "Citizenship in the World"],
  ["Emergency Prep.", "Emergency Preparedness"],
  ["Fish & Wildlife Mgt.", "Fish and Wildlife Management"],
  ["Model Design & Bldg.", "Model Design and Building"],
  ["Reptile/Amphibian", "Reptile and Amphibian Study"],
  ["Signs, Signals, Codes", "Signs, Signals, and Codes"],
  ["Soil & Water Cons.", "Soil and Water Conservation"],
]);

function slug(value) {
  return value.toLowerCase().replaceAll("&", " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function optional(value) {
  return value === "None" || value === "N/A" ? null : value;
}

function completion(value) {
  const normalized = value.replaceAll(" ", "");
  if (normalized === "Complete") return "complete";
  if (normalized === "Complete*") return "conditional";
  if (normalized === "Partial") return "partial";
  throw new Error(`Unsupported completion status: ${value}`);
}

function effort(value) {
  if (value === "N/A") return { minimumHours: null, openEnded: false, context: null, raw: value };
  const match = /^(\d+)(\+)?(?: \(([^)]+)\))?$/.exec(value);
  if (!match) throw new Error(`Unsupported independent-hours value: ${value}`);
  return { minimumHours: Number(match[1]), openEnded: Boolean(match[2]), context: match[3] ?? null, raw: value };
}

const source = await readFile(sourceUrl, "utf8");
const matrix = parse(source, { bom: true, skip_empty_lines: true, relax_column_count: false, trim: true });
if (matrix.length !== 87) throw new Error(`Expected 87 CSV rows, received ${matrix.length}`);
if (JSON.stringify(matrix[2]) !== JSON.stringify(expectedHeaders)) throw new Error("masterMB.csv headers do not match the supported schema");

const completeNote = String(matrix[1][3] ?? "").trim();
const ids = new Set();
const badges = matrix.slice(3).map((row, index) => {
  const [tier, sourceTitle, area, sourceStatus, prerequisites, unavailableAtCamp, classHours, individualHours] = row;
  const title = titleOverrides.get(sourceTitle) ?? sourceTitle;
  const id = slug(title);
  if (ids.has(id)) throw new Error(`Duplicate generated badge id: ${id}`);
  ids.add(id);
  const numericClassHours = Number(classHours);
  if (!Number.isInteger(numericClassHours) || numericClassHours < 0) throw new Error(`Invalid class hours for ${sourceTitle}`);
  return {
    id,
    title,
    sourceTitle,
    tier,
    area,
    completion: completion(sourceStatus),
    sourceStatus: sourceStatus.replace("Complete *", "Complete*"),
    prerequisites: optional(prerequisites),
    unavailableAtCamp: optional(unavailableAtCamp),
    classHours: numericClassHours,
    individualEffort: effort(individualHours),
    sourceRow: index + 4,
  };
});

if (badges.length !== 84) throw new Error(`Expected 84 merit badges, received ${badges.length}`);

const rendered = `// Generated from masterMB.csv by scripts/generate-merit-badge-survey.mjs. Do not edit directly.
export type SurveyTier = "S" | "A" | "B" | "C" | "D";
export type CampCompletion = "complete" | "conditional" | "partial";
export type MeritBadgeSurveyItem = {
  id: string;
  title: string;
  sourceTitle: string;
  tier: SurveyTier;
  area: "STEM" | "Nature" | "Outdoor Skills" | "Handicraft" | "Eagle's Nest" | "Rendezvous" | "RATA" | "High Adventure";
  completion: CampCompletion;
  sourceStatus: string;
  prerequisites: string | null;
  unavailableAtCamp: string | null;
  classHours: number;
  individualEffort: { minimumHours: number | null; openEnded: boolean; context: string | null; raw: string };
  sourceRow: number;
};

export const CONDITIONAL_COMPLETION_NOTE = ${JSON.stringify(completeNote)};

export const meritBadgeSurveyCatalog: MeritBadgeSurveyItem[] = ${JSON.stringify(badges, null, 2)};
`;

if (process.argv.includes("--check")) {
  const existing = await readFile(outputUrl, "utf8").catch(() => "");
  if (existing !== rendered) {
    console.error("Generated survey catalog is out of date. Run: npm run survey:generate");
    process.exitCode = 1;
  }
} else {
  await writeFile(outputUrl, rendered, "utf8");
  console.log(`Generated ${badges.length} merit badge survey records.`);
}
