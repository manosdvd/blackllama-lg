import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const [page, schedule, scheduleExplorer, meritBadges, programExplorer, layout, css, features, header, sitemap] = await Promise.all([
  readFile(new URL("app/page.tsx", root), "utf8"),
  readFile(new URL("app/schedule/page.tsx", root), "utf8"),
  readFile(new URL("components/ScheduleExplorer.tsx", root), "utf8"),
  readFile(new URL("app/merit-badges/page.tsx", root), "utf8"),
  readFile(new URL("components/ProgramExplorer.tsx", root), "utf8"),
  readFile(new URL("app/layout.tsx", root), "utf8"),
  readFile(new URL("app/globals.css", root), "utf8"),
  readFile(new URL("lib/site-features.ts", root), "utf8"),
  readFile(new URL("components/SiteHeader.tsx", root), "utf8"),
  readFile(new URL("app/sitemap.ts", root), "utf8"),
]);

test("the application source contains the Camp Lawton product", () => {
  assert.match(page, /Camp Lawton/);
  assert.match(page, /Leader’s guide/);
  assert.match(schedule, /ProgramPlanningPaused/);
  assert.match(meritBadges, /Merit badge interest survey/);
  assert.doesNotMatch(meritBadges, /ProgramExplorer|programOfferings/);
  assert.match(page, /Conditions & notices/);
  assert.match(page, /Start the planning survey/);
});

test("active interactions and archived planning code remain intentional", () => {
  assert.match(page, /setGuideQuery/);
  assert.match(programExplorer, /setView/);
  assert.match(scheduleExplorer, /setSelectedDay/);
  assert.match(scheduleExplorer, /aria-pressed/);
  assert.match(programExplorer, /aria-pressed/);
  assert.match(features, /PROGRAM_PLANNING_PUBLISHED = false/);
  assert.match(header, /Badge Survey/);
  assert.match(sitemap, /"\/merit-badges"/);
  assert.doesNotMatch(sitemap, /"\/schedule"|"\/my-plan"|programOfferings/);
});

test("metadata and responsive styling describe the actual product", () => {
  assert.match(layout, /Camp Lawton Leader Hub/);
  assert.match(layout, /Discover Camp Lawton/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.hero/);
  assert.match(css, /\.planner-grid/);
});
