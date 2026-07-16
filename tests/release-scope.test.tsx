import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ProgramPlanningPaused from "../components/ProgramPlanningPaused";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import sitemap from "../app/sitemap";
import { PROGRAM_PLANNING_PUBLISHED } from "../lib/site-features";

const root = new URL("../", import.meta.url);

test("current navigation promotes approved release priorities only", () => {
  assert.equal(PROGRAM_PLANNING_PUBLISHED, false);
  const html = renderToStaticMarkup(createElement("div", null, createElement(SiteHeader), createElement(SiteFooter)));
  assert.match(html, /Leader's Guide|Leader&#x27;s guide/);
  assert.match(html, /href="\/guide\/packing-list"/);
  assert.match(html, /Packing checklist/);
  assert.match(html, /Badge Survey|Merit badge survey/);
  assert.match(html, /Pre-register/);
  assert.doesNotMatch(html, /href="\/(?:schedule|my-plan|workspace)"/);

  const urls = sitemap().map((entry) => new URL(entry.url).pathname);
  for (const path of ["/schedule", "/my-plan", "/workspace", "/guide/daily-rhythm-and-program", "/guide/cub-weekend-program"]) {
    assert.ok(!urls.includes(path), `${path} must not be advertised in the sitemap`);
  }
  for (const path of ["/guide", "/merit-badges", "/pre-register", "/history", "/tribe-of-papago"]) assert.ok(urls.includes(path));
});

test("packing checklist is promoted from the primary public planning surfaces", async () => {
  const [home, guide, plan] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("components/GuideDirectory.tsx", root), "utf8"),
    readFile(new URL("app/plan/page.tsx", root), "utf8"),
  ]);
  for (const source of [home, guide, plan]) assert.match(source, /\/guide\/packing-list/);
  assert.match(home, /Interactive packing list/);
  assert.match(guide, /save progress on this device/);
});

test("old planning URLs explain the pause and mutation paths are gated", async () => {
  const paused = renderToStaticMarkup(createElement(ProgramPlanningPaused, { tool: "schedule" }));
  assert.match(paused, /schedule is in development/);
  assert.match(paused, /not final/);
  assert.match(paused, /Start the planning survey/);

  const [schedulePage, plannerPage, workspacePage, workspaceActions, editorActions] = await Promise.all([
    readFile(new URL("app/schedule/page.tsx", root), "utf8"),
    readFile(new URL("app/my-plan/page.tsx", root), "utf8"),
    readFile(new URL("app/workspace/page.tsx", root), "utf8"),
    readFile(new URL("app/workspace/actions.ts", root), "utf8"),
    readFile(new URL("app/staff/editor/actions.ts", root), "utf8"),
  ]);
  for (const source of [schedulePage, plannerPage, workspacePage, workspaceActions, editorActions]) {
    assert.match(source, /PROGRAM_PLANNING_PUBLISHED/);
  }
  assert.match(editorActions, /Schedule editing is archived/);
});
