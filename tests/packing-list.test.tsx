import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import PackingListClient from "../components/PackingListClient";
import { guideArticles } from "../lib/camp-catalog";
import { parsePackingList } from "../lib/packing-list";

const packingArticle = guideArticles.find((article) => article.slug === "packing-list");
assert.ok(packingArticle, "canonical packing article should exist");

test("packing guide parses live Markdown into core, optional, and warning groups", () => {
  const parsed = parsePackingList(packingArticle.body);
  assert.equal(parsed.recognizedGroupCount, 4);
  assert.deepEqual(parsed.sections.map(({ id, kind }) => [id, kind]), [
    ["unit-leader-check-in", "core"],
    ["participant-essentials", "core"],
    ["participant-optional", "optional"],
    ["leave-at-home", "warning"],
  ]);

  const items = parsed.sections.flatMap((section) => section.items);
  assert.equal(new Set(items.map((item) => item.id)).size, items.length, "item IDs must remain unique");
  assert.ok(parsed.sections.find((section) => section.owner === "unit")?.items.length);
  assert.match(parsed.introSource, /high-elevation mountain camp/);
});

test("interactive packing markup keeps warnings out of the checkable progress list", () => {
  const parsed = parsePackingList(packingArticle.body);
  const expectedCheckboxes = parsed.sections
    .filter((section) => section.kind !== "warning")
    .reduce((total, section) => total + section.items.length, 0);
  const html = renderToStaticMarkup(<PackingListClient source={packingArticle.body} />);

  assert.match(html, /Pack with confidence/);
  assert.match(html, /Print checklist/);
  assert.match(html, /Search the list/);
  assert.match(html, /Personal extras/);
  assert.match(html, /Keep camp safe/);
  assert.match(html, /Leave at Home/);
  assert.equal((html.match(/type="checkbox"/g) ?? []).length, expectedCheckboxes);
});

test("packing tool fails soft when a staff-published article no longer has checklist headings", () => {
  const source = "## Updated staff guidance\n\nBring the final packet distributed before camp.";
  const html = renderToStaticMarkup(<PackingListClient source={source} />);
  assert.match(html, /Interactive controls will return/);
  assert.match(html, /Updated staff guidance/);
  assert.doesNotMatch(html, /Search the list/);
});

test("packing progress uses guarded, versioned on-device storage", async () => {
  const source = await readFile(new URL("../components/PackingListClient.tsx", import.meta.url), "utf8");
  assert.match(source, /camp-lawton-packing-list:v1/);
  assert.match(source, /localStorage\.getItem/);
  assert.match(source, /localStorage\.setItem/);
  assert.match(source, /window\.print\(\)/);
  assert.match(source, /window\.confirm/);
});
