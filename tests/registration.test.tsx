import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import RegisterPage from "../app/register/page";
import PlanPage from "../app/plan/page";
import MeritBadgesPage from "../app/merit-badges/page";
import MeritBadgePage from "../app/merit-badges/[slug]/page";
import LegacyRegistrationPage from "../app/pre-register/page";
import { POST } from "../app/api/pre-register/route";
import { OFFICIAL_REGISTRATION_URL, WEEK1_REGISTRATION_URL, WEEK2_REGISTRATION_URL, MERIT_BADGE_CATALOG_URL, registrationSessions } from "../lib/registration";
import { meritBadgeReferenceCatalog } from "../lib/merit-badge-reference.generated";
import { getMeritBadgeResource, meritBadgeResources } from "../lib/merit-badge-resources";
import { findGuideArticle } from "../lib/camp-catalog";

test("public registration surfaces link to the council event without local collection forms", async () => {
  const pages = [createElement(RegisterPage), createElement(PlanPage), createElement(MeritBadgesPage), await MeritBadgePage({ params: Promise.resolve({ slug: "first-aid" }) })];
  for (const page of pages) {
    const html = renderToStaticMarkup(page);
    assert.ok(html.includes(`href="${OFFICIAL_REGISTRATION_URL}"`));
    assert.doesNotMatch(html, /pre.?registration|pre-register|interest survey|badge survey|<form/i);
  }
});

test("registration details show the live event fees, deadlines, and class opening date", () => {
  const html = renderToStaticMarkup(createElement(RegisterPage));
  for (const value of ["400", "450", "$100", "$40", "$200", "$300", "$50", "$25", "$360", "12/31/26", "3/31/27", "May 23, 2027", "May 30, 2027", "February 1, 2027", "150 youth", WEEK1_REGISTRATION_URL, WEEK2_REGISTRATION_URL, MERIT_BADGE_CATALOG_URL]) {
    assert.ok(html.includes(value), `Missing official detail: ${value}`);
  }
  assert.match(html, /provisional registration/);
});

test("session selection advertises only the two published weeks", () => {
  const html = renderToStaticMarkup(createElement(PlanPage));
  assert.equal(registrationSessions.length, 2);
  for (const session of registrationSessions) {
    assert.ok(html.includes(session.dates));
    assert.ok(html.includes(session.url));
  }
  assert.doesNotMatch(html, /Week 3|Cub Scout Weekend|Planning Draft/);
});

test("legacy bookmarks redirect and old API clients cannot submit data", async () => {
  assert.throws(() => LegacyRegistrationPage(), (error: unknown) => {
    assert.equal((error as { digest: string }).digest, "NEXT_REDIRECT;replace;/register;308;");
    return true;
  });
  const response = await POST();
  assert.equal(response.status, 410);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal((await response.json()).registrationUrl, OFFICIAL_REGISTRATION_URL);
});

test("registration guide and FAQ carry official links and no retired calls to action", () => {
  for (const slug of ["dates-fees-and-registration", "frequently-asked-questions"]) {
    const article = findGuideArticle(slug);
    assert.ok(article);
    assert.ok(article.body.includes(OFFICIAL_REGISTRATION_URL));
    assert.match(article.body, /February 1, 2027/);
    assert.doesNotMatch(article.body, /pre.?registration|pre-register|interest survey|badge survey|Black Pug in spring/i);
  }
});

test("general badge references retain stable links without feasibility or demand fields", () => {
  assert.equal(meritBadgeReferenceCatalog.length, 84);
  assert.equal(new Set(meritBadgeReferenceCatalog.map((badge) => badge.id)).size, 84);
  assert.equal(Object.keys(meritBadgeResources).length, 84);
  for (const badge of meritBadgeReferenceCatalog) {
    assert.deepEqual(Object.keys(badge).sort(), ["area", "id", "title"]);
    assert.match(getMeritBadgeResource(badge.id)?.officialUrl ?? "", /^https:\/\/www\.scouting\.org\/merit-badges\//);
  }
});
