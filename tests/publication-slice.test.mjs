import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const [schema, migration, repository, actions, articlePage, schedulePage, homepage, markdown, features] = await Promise.all([
  readFile(new URL("db/schema.ts", root), "utf8"),
  readFile(new URL("drizzle/0002_publication_slice.sql", root), "utf8"),
  readFile(new URL("lib/content-repository.ts", root), "utf8"),
  readFile(new URL("app/staff/editor/actions.ts", root), "utf8"),
  readFile(new URL("app/guide/[slug]/page.tsx", root), "utf8"),
  readFile(new URL("app/schedule/page.tsx", root), "utf8"),
  readFile(new URL("app/page.tsx", root), "utf8"),
  readFile(new URL("components/MarkdownContent.tsx", root), "utf8"),
  readFile(new URL("lib/site-features.ts", root), "utf8"),
]);

test("publication schema records revisions and publish metadata", () => {
  assert.match(schema, /articleRevisions/);
  assert.match(schema, /eventRevisions/);
  assert.match(schema, /publishedAt/);
  assert.match(schema, /reviewedAt/);
  assert.match(migration, /CREATE TABLE `article_revisions`/);
  assert.match(migration, /CREATE TABLE `event_revisions`/);
  assert.match(actions, /revision: \(latest\?\.revision \?\? 0\) \+ 1/);
  assert.match(actions, /db\.update\(events\)/);
});

test("public reads only consume published or currently active records", () => {
  assert.match(repository, /eq\(articles\.status, "published"\)/);
  assert.match(repository, /eq\(events\.status, "published"\)/);
  assert.match(repository, /isNull\(alerts\.startTime\)/);
  assert.match(repository, /isNull\(alerts\.endTime\)/);
  assert.match(repository, /arrivalArticle/);
  assert.match(repository, /mondaySchedule/);
});

test("guide publishing stays public while schedule publication remains archived", () => {
  assert.match(articlePage, /getPublishedArticle/);
  assert.match(articlePage, /Last reviewed/);
  assert.match(schedulePage, /ProgramPlanningPaused/);
  assert.match(features, /PROGRAM_PLANNING_PUBLISHED = false/);
  assert.match(repository, /overrides\.get\(fallback\.id\)/);
  assert.match(homepage, /fetch\("\/api\/notices"\)/);
  assert.match(homepage, /arrival-and-check-in/);
});

test("editor actions validate unsafe Markdown and revalidate public routes", () => {
  assert.match(actions, /script\|iframe\|object\|embed\|style/);
  assert.match(actions, /javascript:/);
  assert.match(actions, /revalidatePath\(`\/guide\/\$\{slug\}`\)/);
  assert.match(actions, /revalidatePath\("\/schedule"\)/);
  assert.match(actions, /Schedule editing is archived/);
  assert.match(actions, /existing\.status !== "published"/);
  assert.doesNotMatch(markdown, /dangerouslySetInnerHTML/);
});
