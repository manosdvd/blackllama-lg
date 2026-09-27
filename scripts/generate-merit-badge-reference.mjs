import { readFile, writeFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

const sourceUrl = new URL("../masterMB.csv", import.meta.url);
const outputUrl = new URL("../lib/merit-badge-reference.generated.ts", import.meta.url);
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

const source = await readFile(sourceUrl, "utf8");
const matrix = parse(source, { bom: true, skip_empty_lines: true, relax_column_count: false, trim: true });
if (matrix.length !== 87) throw new Error(`Expected 87 CSV rows, received ${matrix.length}`);
if (JSON.stringify(matrix[2]) !== JSON.stringify(expectedHeaders)) throw new Error("masterMB.csv headers do not match the supported schema");

const ids = new Set();
const badges = matrix.slice(3).map((row) => {
  const [, sourceTitle, area] = row;
  const title = titleOverrides.get(sourceTitle) ?? sourceTitle;
  const id = slug(title);
  if (ids.has(id)) throw new Error(`Duplicate generated badge id: ${id}`);
  ids.add(id);
  return { id, title, area };
});

if (badges.length !== 84) throw new Error(`Expected 84 merit badges, received ${badges.length}`);

const rendered = `// Generated from masterMB.csv by scripts/generate-merit-badge-reference.mjs. Do not edit directly.
// General reference subjects; use the council event catalog for camp offerings.
export type MeritBadgeReferenceItem = {
  id: string;
  title: string;
  area: string;
};

export const meritBadgeReferenceCatalog: MeritBadgeReferenceItem[] = ${JSON.stringify(badges, null, 2)};
`;

if (process.argv.includes("--check")) {
  const existing = await readFile(outputUrl, "utf8").catch(() => "");
  if (existing !== rendered) {
    console.error("Generated badge reference is out of date. Run: npm run badges:generate");
    process.exitCode = 1;
  }
} else {
  await writeFile(outputUrl, rendered, "utf8");
  console.log(`Generated ${badges.length} merit badge reference records.`);
}
