export type LeaderGuideRequirementStatus = "source-backed" | "placeholder" | "mixed";

export type LeaderGuideRequirement = {
  id: string;
  label: string;
  standard: string;
  status: LeaderGuideRequirementStatus;
  path: `/guide/${string}`;
  anchor: string;
  sources: string[];
  searchTerms: string[];
};

export const leaderGuideRequirements: LeaderGuideRequirement[] = [
  { id: "overall-goals-outcomes", label: "Overall goals and behavioral outcomes", standard: "NCAP PD-101", status: "source-backed", path: "/guide/camp-purpose-and-outcomes", anchor: "goals-and-behavioral-outcomes", sources: ["2027leadersGuideAdvanced.md"], searchTerms: ["mission", "purpose", "outcomes", "values", "youth development"] },
  { id: "unit-program-building", label: "Unit program building", standard: "NCAP PD-108", status: "source-backed", path: "/guide/build-your-unit-program", anchor: "build-a-balanced-unit-program", sources: ["2027leadersGuideAdvanced.md"], searchTerms: ["unit program", "troop schedule", "balance", "youth growth"] },
  { id: "preparation-training", label: "Preparation and training", standard: "NCAP PD-108", status: "mixed", path: "/guide/preparation-training-and-risk-advisory", anchor: "preparation-and-training", sources: ["2027leadersGuideAdvanced.md", "packing-list"], searchTerms: ["conditioning", "experience", "training", "altitude", "prepare"] },
  { id: "risk-advisory", label: "Risk advisory", standard: "NCAP PD-108", status: "source-backed", path: "/guide/preparation-training-and-risk-advisory", anchor: "risk-advisory", sources: ["2027leadersGuideAdvanced.md", "fire-weather-and-wildlife"], searchTerms: ["risk", "hazards", "weather", "wildlife", "fire"] },
  { id: "equipment-needs", label: "Personal and program equipment", standard: "NCAP PS-207 / PS-221", status: "mixed", path: "/guide/program-requirements-and-materials", anchor: "equipment-needs", sources: ["packing-list"], searchTerms: ["equipment", "gear", "bring", "fishing", "trek"] },
  { id: "advancement-prerequisites", label: "Advancement prerequisites", standard: "NCS advancement preparation", status: "placeholder", path: "/guide/program-requirements-and-materials", anchor: "prerequisites", sources: [], searchTerms: ["prerequisites", "merit badge", "requirements", "before camp"] },
  { id: "advancement-materials", label: "Advancement materials required", standard: "NCS advancement preparation", status: "placeholder", path: "/guide/program-requirements-and-materials", anchor: "materials-required", sources: [], searchTerms: ["materials", "workbook", "bring to class", "advancement"] },
  { id: "big-picture", label: "The big picture", standard: "Scouting America best practice", status: "source-backed", path: "/guide/camp-purpose-and-outcomes", anchor: "welcome-to-camp-lawton", sources: ["2027leadersGuideAdvanced.md"], searchTerms: ["welcome", "purpose", "core values", "development"] },
  { id: "logistics-financials", label: "Logistics and financials", standard: "Scouting America best practice", status: "mixed", path: "/guide/dates-fees-and-registration", anchor: "registration-and-financial-planning", sources: ["2027leadersGuideAdvanced.md"], searchTerms: ["registration", "reservation", "dates", "payment", "refund", "campership", "financial aid"] },
  { id: "health-safety", label: "Health and safety", standard: "Scouting America best practice", status: "mixed", path: "/guide/health-safety-and-youth-protection", anchor: "health-and-safety-planning", sources: ["2027leadersGuideAdvanced.md"], searchTerms: ["medical forms", "dietary", "medications", "supervision", "emergency", "deadline"] },
  { id: "daily-camp-life", label: "Daily camp life", standard: "Scouting America best practice", status: "mixed", path: "/guide/daily-camp-life", anchor: "daily-camp-life", sources: ["arrival-and-check-in", "leader-logistics", "facilities-and-campsites", "departure-checklist"], searchTerms: ["arrival", "departure", "daily schedule", "meals", "campsite", "visitors"] },
  { id: "program-planning-guidance", label: "Program planning guidance", standard: "Scouting America best practice", status: "mixed", path: "/guide/build-your-unit-program", anchor: "program-planning-checklist", sources: ["2027leadersGuideAdvanced.md"], searchTerms: ["activity load", "first year", "age restriction", "physical restriction", "extra cost", "games", "competition"] },
];

export function requirementsForPath(path: string): LeaderGuideRequirement[] {
  return leaderGuideRequirements.filter((requirement) => requirement.path === path);
}

export function hasLeaderGuideRequirements(slug: string): boolean {
  return leaderGuideRequirements.some((requirement) => requirement.path === `/guide/${slug}`);
}

export function guidePathStatus(path: string): LeaderGuideRequirementStatus | undefined {
  const statuses = new Set(requirementsForPath(path).map((requirement) => requirement.status));
  if (!statuses.size) return undefined;
  return statuses.size === 1 ? [...statuses][0] : "mixed";
}
