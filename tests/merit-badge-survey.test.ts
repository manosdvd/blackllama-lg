import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { parse } from "csv-parse/sync";
import { meritBadgeSurveyCatalog } from "../lib/merit-badge-survey.generated";
import { aggregateBadgeDemand, normalizeSurveyInterests, parsePlanningSnapshot, type PlanningSnapshot } from "../lib/planning-submission";

const root = new URL("../", import.meta.url);

test("generated survey catalog preserves every source record and stable scheduled IDs", async () => {
  const matrix = parse(await readFile(new URL("masterMB.csv", root), "utf8"), { skip_empty_lines: true, trim: true });
  assert.equal(matrix.length, 87);
  assert.equal(meritBadgeSurveyCatalog.length, 84);
  assert.equal(new Set(meritBadgeSurveyCatalog.map((badge) => badge.id)).size, 84);
  meritBadgeSurveyCatalog.forEach((badge, index) => {
    const source = matrix[index + 3];
    assert.equal(badge.sourceTitle, source[1]);
    assert.equal(badge.tier, source[0]);
    assert.equal(badge.area, source[2]);
    assert.equal(badge.sourceRow, index + 4);
  });
  for (const id of ["archery", "first-aid", "orienteering", "pioneering", "basketry", "leatherwork", "wood-carving", "nature", "astronomy", "weather", "environmental-science", "emergency-preparedness", "communication", "chess", "geocaching", "hiking"]) {
    assert.ok(meritBadgeSurveyCatalog.some((badge) => badge.id === id), `missing stable id ${id}`);
  }
});

test("catalog normalization retains conditional, partial, effort, and source metadata", () => {
  const americanBusiness = meritBadgeSurveyCatalog.find((badge) => badge.id === "american-business");
  assert.equal(americanBusiness?.title, "American Business");
  assert.equal(americanBusiness?.completion, "conditional");
  assert.equal(americanBusiness?.unavailableAtCamp, "Business tours/interviews");
  const hiking = meritBadgeSurveyCatalog.find((badge) => badge.id === "hiking");
  assert.equal(hiking?.completion, "partial");
  assert.equal(hiking?.individualEffort.minimumHours, 30);
  assert.equal(hiking?.individualEffort.openEnded, true);
  assert.equal(hiking?.individualEffort.context, "Home");
});

test("submission normalization allowlists badges and clamps demand to youth attendance", () => {
  const interests = normalizeSurveyInterests({
    "first-aid": { count: 99, priority: "must-have", note: "  Staff two sections if possible.  " },
    weather: { count: 3, priority: "invalid" },
    "unknown-badge": { count: 4, priority: "must-have" },
  }, 5);
  assert.deepEqual(interests, [
    { offeringId: "first-aid", interestedCount: 5, priority: "must-have", note: "Staff two sections if possible." },
    { offeringId: "weather", interestedCount: 3, priority: "nice-to-have", note: null },
  ]);
});

const snapshot = (sessionId: string, unitNumber: string, interests: PlanningSnapshot["interests"]): PlanningSnapshot => ({
  unit: { unitType: "Troop", unitNumber, council: "Catalina Council", city: "Tucson", state: "AZ", sessionId },
  attendance: { youthMale: 5, youthFemale: 0, youthOther: 0, adultMale: 2, adultFemale: 0, adultOther: 0 },
  contacts: {}, scouts: [], interests, accommodationFollowUp: false, disclaimerVersion: "test",
});

test("legacy snapshots parse safely and malformed snapshots are isolated", () => {
  const legacy = JSON.stringify(snapshot("bsa-week-1", "101", [{ offeringId: "first-aid", interestedCount: 4, priority: "strong", note: null }]));
  assert.equal(parsePlanningSnapshot(legacy)?.interests[0].offeringId, "first-aid");
  assert.equal(parsePlanningSnapshot("not json"), null);
  assert.equal(parsePlanningSnapshot(JSON.stringify({ interests: [] })), null);
});

test("staff demand aggregation includes units, priorities, sessions, and notes", () => {
  const demand = aggregateBadgeDemand([
    snapshot("bsa-week-1", "101", [{ offeringId: "first-aid", interestedCount: 4, priority: "must-have", note: "High priority" }]),
    snapshot("bsa-week-2", "202", [{ offeringId: "first-aid", interestedCount: 3, priority: "strong", note: null }]),
  ]);
  assert.equal(demand[0].badge.id, "first-aid");
  assert.equal(demand[0].interestedCount, 7);
  assert.equal(demand[0].unitCount, 2);
  assert.equal(demand[0].priorityCounts["must-have"], 1);
  assert.deepEqual(demand[0].sessionCounts, { "bsa-week-1": 4, "bsa-week-2": 3 });
  assert.equal(demand[0].notes[0].unit, "Troop 101");
});

test("survey UI, API, staff report, and export share the generated catalog contract", async () => {
  const [client, api, staff, exportRoute] = await Promise.all([
    readFile(new URL("components/PreRegisterClient.tsx", root), "utf8"),
    readFile(new URL("app/api/pre-register/route.ts", root), "utf8"),
    readFile(new URL("app/staff/submissions/page.tsx", root), "utf8"),
    readFile(new URL("app/staff/submissions/export/route.ts", root), "utf8"),
  ]);
  assert.match(client, /MeritBadgeSurveyStep/);
  assert.match(api, /normalizeSurveyInterests/);
  assert.match(staff, /aggregateBadgeDemand/);
  assert.match(exportRoute, /interested_count/);
  assert.match(exportRoute, /spreadsheetSafe/);
});
