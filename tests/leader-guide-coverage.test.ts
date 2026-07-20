import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { extractMarkdownHeadings } from "../components/MarkdownContent";
import { guideArticles } from "../lib/camp-catalog";
import { leaderGuideRequirements } from "../lib/leader-guide-requirements";
import { isGuideArticlePublic, PROGRAM_PLANNING_PUBLISHED } from "../lib/site-features";

const requiredIds = [
  "overall-goals-outcomes",
  "unit-program-building",
  "preparation-training",
  "risk-advisory",
  "equipment-needs",
  "advancement-prerequisites",
  "advancement-materials",
  "big-picture",
  "logistics-financials",
  "health-safety",
  "daily-camp-life",
  "program-planning-guidance",
];

test("every required leader-guide element has a public canonical route and anchor", () => {
  assert.deepEqual(leaderGuideRequirements.map((requirement) => requirement.id).sort(), [...requiredIds].sort());

  for (const requirement of leaderGuideRequirements) {
    const slug = requirement.path.replace("/guide/", "");
    const article = guideArticles.find((candidate) => candidate.slug === slug);
    assert.ok(article, `${requirement.id} must map to a guide article`);
    assert.ok(isGuideArticlePublic(slug), `${requirement.path} must be public`);
    const headingIds = extractMarkdownHeadings(article.body).map((heading) => heading.id);
    assert.ok(headingIds.includes(requirement.anchor), `${requirement.id} anchor ${requirement.anchor} must exist`);
    if (requirement.status === "placeholder" || requirement.status === "mixed") {
      assert.match(article.body, /:::placeholder /, `${requirement.id} must expose its missing approved fields`);
    }
  }
});

test("pending planning fields use the standard public placeholder body", () => {
  const pendingArticles = guideArticles.filter((article) => article.body.includes(":::placeholder "));
  assert.ok(pendingArticles.length >= 5);
  for (const article of pendingArticles) {
    const directives = article.body.match(/:::placeholder [^\n]+\n([\s\S]*?)\n:::/g) ?? [];
    assert.ok(directives.length > 0, `${article.slug} must contain a complete placeholder directive`);
    for (const directive of directives) assert.match(directive, /Lorem ipsum dolor sit amet, consectetur adipiscing elit\./);
  }
});

test("guide entry points are integrated across the public planning experience", async () => {
  const root = new URL("../", import.meta.url);
  const surfaces = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/plan/page.tsx", root), "utf8"),
    readFile(new URL("app/merit-badges/page.tsx", root), "utf8"),
    readFile(new URL("app/alerts/page.tsx", root), "utf8"),
    readFile(new URL("app/map/page.tsx", root), "utf8"),
  ]);
  const combined = surfaces.join("\n");
  for (const path of [
    "/guide/camp-purpose-and-outcomes",
    "/guide/build-your-unit-program",
    "/guide/preparation-training-and-risk-advisory",
    "/guide/program-requirements-and-materials",
    "/guide/daily-camp-life",
  ]) assert.match(combined, new RegExp(path.replaceAll("/", "\\/")));
});

test("unapproved schedules and program offerings remain release-gated", () => {
  assert.equal(PROGRAM_PLANNING_PUBLISHED, false);
  assert.equal(isGuideArticlePublic("daily-rhythm-and-program"), false);
  assert.equal(isGuideArticlePublic("cub-weekend-program"), false);
  const newCanonicalBodies = guideArticles
    .filter((article) => leaderGuideRequirements.some((requirement) => requirement.path === `/guide/${article.slug}`))
    .map((article) => article.body)
    .join("\n");
  assert.doesNotMatch(newCanonicalBodies, /\| \*\*6:30 AM\*\*|capacity:\s*\d+|fee:\s*\d+/i);
});
