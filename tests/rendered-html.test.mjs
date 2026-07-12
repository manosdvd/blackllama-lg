import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const [page, schedule, meritBadges, layout, css] = await Promise.all([
  readFile(new URL("app/page.tsx", root), "utf8"),
  readFile(new URL("app/schedule/page.tsx", root), "utf8"),
  readFile(new URL("app/merit-badges/page.tsx", root), "utf8"),
  readFile(new URL("app/layout.tsx", root), "utf8"),
  readFile(new URL("app/globals.css", root), "utf8"),
]);

test("the application source contains the recovered Camp Lawton prototype", () => {
  assert.match(page, /Camp Lawton/);
  assert.match(page, /Leader’s guide/);
  assert.match(schedule, /Week at a glance/);
  assert.match(meritBadges, /Program explorer/);
  assert.match(page, /Conditions & notices/);
  assert.match(page, /Pre-register/);
});

test("the application retains its main interactions across product routes", () => {
  assert.match(page, /setGuideQuery/);
  assert.match(meritBadges, /togglePlan/);
  assert.match(page, /submitInterest/);
  assert.match(schedule, /aria-selected/);
  assert.match(meritBadges, /aria-pressed/);
});

test("metadata and responsive styling describe the actual product", () => {
  assert.match(layout, /Camp Lawton Leader Hub/);
  assert.match(layout, /Plan a safe, memorable 2027 summer camp/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.hero/);
  assert.match(css, /\.planner-grid/);
});
