import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const [page, layout, css] = await Promise.all([
  readFile(new URL("app/page.tsx", root), "utf8"),
  readFile(new URL("app/layout.tsx", root), "utf8"),
  readFile(new URL("app/globals.css", root), "utf8"),
]);

test("the application source contains the recovered Camp Lawton prototype", () => {
  assert.match(page, /Camp Lawton/);
  assert.match(page, /Leader’s guide/);
  assert.match(page, /Week at a glance/);
  assert.match(page, /Program planner/);
  assert.match(page, /Conditions & notices/);
  assert.match(page, /Pre-register/);
});

test("the prototype retains its main client-side interactions", () => {
  assert.match(page, /useState<DayKey>/);
  assert.match(page, /setGuideQuery/);
  assert.match(page, /togglePlan/);
  assert.match(page, /submitInterest/);
  assert.match(page, /aria-selected/);
  assert.match(page, /aria-pressed/);
});

test("metadata and responsive styling describe the actual product", () => {
  assert.match(layout, /Camp Lawton Leader Hub/);
  assert.match(layout, /Plan a safe, memorable 2027 summer camp/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /\.hero/);
  assert.match(css, /\.planner-grid/);
});
