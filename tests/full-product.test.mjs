import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const [catalog, surveyCatalog, planner, prereg, preregApi, schema, migration, staffAuth, staffSubmissions, css] = await Promise.all([
  read("lib/camp-catalog.ts"), read("lib/merit-badge-survey.generated.ts"), read("components/PlannerClient.tsx"), read("components/PreRegisterClient.tsx"),
  read("app/api/pre-register/route.ts"), read("db/schema.ts"), read("drizzle/0003_workspaces_and_submissions.sql"),
  read("app/staff-auth.ts"), read("app/staff/submissions/page.tsx"), read("app/globals.css"),
]);

test("archived catalog retains sessions, guide, programs, and BSA/Cub working schedules", () => {
  assert.match(catalog, /Cub Scout Weekend/);
  assert.match(catalog, /BSA Week 3/);
  assert.match(catalog, /Health, Safety & Youth Protection/);
  assert.match(catalog, /Environmental Science/);
  assert.match(catalog, /bsaSchedule/);
  assert.match(catalog, /cubSchedule/);
  assert.match(surveyCatalog, /American Business/);
  assert.match(surveyCatalog, /Soil and Water Conservation/);
});

test("archived planner retains deterministic conflict and alternative rules", () => {
  assert.match(planner, /overlap exactly/);
  assert.match(planner, /travelMinutes/);
  assert.match(planner, /selected more than once/);
  assert.match(planner, /alternativeFor/);
  assert.match(planner, /localStorage/);
});

test("planning submission minimizes and validates collected data", () => {
  assert.match(prereg, /Do not enter birth dates, health details/);
  assert.match(prereg, /Non-binding pre-registration/);
  assert.doesNotMatch(prereg, /Scout display names|scouts:/);
  assert.match(preregApi, /Invalid request origin/);
  assert.match(preregApi, /scouts: \[\]/);
  assert.match(preregApi, /deleteAfter: new Date\("2027-08-31/);
  assert.doesNotMatch(preregApi, /birthDate|medicalRecord|medicationDetail/);
});

test("workspace and operational schema supports private planning", () => {
  for (const entity of ["unitWorkspaces", "workspaceMembers", "participants", "interests", "planSelections", "submissions", "auditLogs"]) assert.match(schema, new RegExp(entity));
  assert.match(migration, /CREATE TABLE `submissions`/);
  assert.match(migration, /workspace_member_unique/);
  assert.match(staffAuth, /missing database must fail closed/);
  assert.match(staffSubmissions, /Badge demand/);
});

test("responsive, reduced-motion, and print styles cover the application", () => {
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /@media print/);
  assert.match(css, /\.planner-app/);
  assert.match(css, /\.prereg-app/);
});

test("service worker excludes private and dynamic application data", async () => {
  const worker = await read("public/sw.js");
  assert.match(worker, /startsWith\("\/staff"\)/);
  assert.match(worker, /startsWith\("\/workspace"\)/);
  assert.match(worker, /endsWith\("\.rsc"\)/);
  assert.doesNotMatch(worker, /cache\.put\(event\.request/);
});
