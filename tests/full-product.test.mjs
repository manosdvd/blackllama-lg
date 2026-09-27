import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const [catalog, referenceCatalog, planner, schema, migration, staffAuth, css] = await Promise.all([
  read("lib/camp-catalog.ts"), read("lib/merit-badge-reference.generated.ts"), read("components/PlannerClient.tsx"),
  read("db/schema.ts"), read("drizzle/0003_workspaces_and_submissions.sql"),
  read("app/staff-auth.ts"), read("app/globals.css"),
]);

test("archived catalog retains sessions, guide, programs, and BSA/Cub working schedules", () => {
  assert.match(catalog, /Cub Scout Weekend/);
  assert.match(catalog, /BSA Week 3/);
  assert.match(catalog, /Health, Safety & Youth Protection/);
  assert.match(catalog, /Environmental Science/);
  assert.match(catalog, /bsaSchedule/);
  assert.match(catalog, /cubSchedule/);
  assert.match(referenceCatalog, /American Business/);
  assert.match(referenceCatalog, /Soil and Water Conservation/);
});

test("archived planner retains deterministic conflict and alternative rules", () => {
  assert.match(planner, /overlap exactly/);
  assert.match(planner, /travelMinutes/);
  assert.match(planner, /selected more than once/);
  assert.match(planner, /alternativeFor/);
  assert.match(planner, /localStorage/);
});

test("workspace and operational schema supports private planning", () => {
  for (const entity of ["unitWorkspaces", "workspaceMembers", "participants", "interests", "planSelections", "submissions", "auditLogs"]) assert.match(schema, new RegExp(entity));
  assert.match(migration, /CREATE TABLE `submissions`/);
  assert.match(migration, /workspace_member_unique/);
  assert.match(staffAuth, /missing database must fail closed/);
});

test("responsive, reduced-motion, and print styles cover the application", () => {
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /@media print/);
  assert.match(css, /\.planner-app/);
  assert.match(css, /\.registration-page/);
});

test("service worker excludes private and dynamic application data", async () => {
  const worker = await read("public/sw.js");
  assert.match(worker, /startsWith\("\/staff"\)/);
  assert.match(worker, /startsWith\("\/workspace"\)/);
  assert.match(worker, /endsWith\("\.rsc"\)/);
  assert.doesNotMatch(worker, /cache\.put\(event\.request/);
});
