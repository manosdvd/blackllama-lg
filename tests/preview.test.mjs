import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

const [html, css, js] = await Promise.all([
  readFile(new URL("preview/index.html", root), "utf8"),
  readFile(new URL("preview/styles.css", root), "utf8"),
  readFile(new URL("preview/app.js", root), "utf8"),
]);

test("preview includes the primary product sections", () => {
  for (const id of ["guide", "schedule", "badges", "alerts", "preregister"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.match(html, /Camp Lawton Leader Hub/);
  assert.match(html, /Working prototype/);
});

test("preview includes real interactions rather than dead controls", () => {
  assert.match(js, /renderGuide/);
  assert.match(js, /renderSchedule/);
  assert.match(js, /showModal/);
  assert.match(js, /renderPlan/);
  assert.match(js, /interest-form/);
});

test("preview has mobile and reduced-motion support", () => {
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(html, /class="menu-button"/);
});
