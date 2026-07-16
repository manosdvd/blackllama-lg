import assert from "node:assert/strict";
import test from "node:test";
import { guideArticles } from "../lib/camp-catalog";
import { parseTribeProgram } from "../lib/tribe-of-papago";

const article = guideArticles.find((item) => item.slug === "history-and-camp-spirit");
assert.ok(article);

test("Tribe of Papago explorer parses the working rank paths and Barker Standard", () => {
  const program = parseTribeProgram(article.body);
  assert.equal(program.ranks.length, 6);
  assert.deepEqual(program.ranks.slice(0, 4).map((rank) => rank.title.split("—")[0].trim()), ["Hunter", "Warrior", "Medicine Man", "Chief"]);
  assert.ok(program.ranks.every((rank) => rank.requirements.length > 0));
  assert.equal(program.barkerRequirements.length, 9);
  assert.match(program.introduction, /Harry B\. Ogle/);
});

test("Tribe of Papago page is a public, linked route", async () => {
  const { readFile } = await import("node:fs/promises");
  const page = await readFile(new URL("../app/tribe-of-papago/page.tsx", import.meta.url), "utf8");
  const explorer = await readFile(new URL("../components/TribeExplorer.tsx", import.meta.url), "utf8");
  assert.match(page, /TribeExplorer/);
  assert.match(page, /TraditionGallery/);
  assert.match(explorer, /Search requirements/);
  assert.match(explorer, /aria-selected/);
});
