import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const [page, schedule, scheduleExplorer, meritBadges, programExplorer, layout, css] = await Promise.all([
  readFile(new URL("app/page.tsx", root), "utf8"),
  readFile(new URL("app/schedule/page.tsx", root), "utf8"),
  readFile(new URL("components/ScheduleExplorer.tsx", root), "utf8"),
  readFile(new URL("app/merit-badges/page.tsx", root), "utf8"),
  readFile(new URL("components/ProgramExplorer.tsx", root), "utf8"),
  readFile(new URL("app/layout.tsx", root), "utf8"),
  readFile(new URL("app/globals.css", root), "utf8"),
]);

test("the application source contains the Camp Lawton product", () => {
  assert.match(page, /Camp Lawton/);
  assert.match(page, /Leader’s guide/);
  assert.match(schedule, /2027 agenda/);
  assert.match(meritBadges, /Program explorer/);
  assert.match(page, /Conditions & notices/);
  assert.match(page, /Pre-register/);
});

test("the application provides interactions across product routes", () => {
  assert.match(page, /setGuideQuery/);
  assert.match(programExplorer, /setView/);
  assert.match(scheduleExplorer, /setSelectedDay/);
  assert.match(scheduleExplorer, /aria-selected/);
  assert.match(programExplorer, /aria-pressed/);
});

test("metadata and responsive styling describe the actual product", () => {
  assert.match(layout, /Camp Lawton Leader Hub/);
  assert.match(layout, /Plan a safe, memorable 2027 summer camp/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.hero/);
  assert.match(css, /\.planner-grid/);
});
