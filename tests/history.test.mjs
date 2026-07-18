import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { historyEvents } from "../lib/camp-history.ts";

const root = new URL("../", import.meta.url);
const [page, timeline, data, header, css, traditionGallery, catalog] = await Promise.all([
  readFile(new URL("app/history/page.tsx", root), "utf8"),
  readFile(new URL("components/HistoryTimeline.tsx", root), "utf8"),
  readFile(new URL("lib/camp-history.ts", root), "utf8"),
  readFile(new URL("components/SiteHeader.tsx", root), "utf8"),
  readFile(new URL("app/globals.css", root), "utf8"),
  readFile(new URL("components/TraditionGallery.tsx", root), "utf8"),
  readFile(new URL("lib/camp-catalog.ts", root), "utf8"),
]);

test("history route turns the working documents into an accessible chronology", () => {
  assert.match(page, /A century/);
  assert.match(page, /historySourceDocuments/);
  assert.match(data, /1921/);
  assert.match(data, /Al’s Well/);
  assert.match(data, /A turning point for bear safety/);
  assert.match(data, /Anna Knochel/);
  assert.match(data, /July 25, 1996/);
  assert.match(data, /Pima County’s 1997 ordinance/);
  assert.match(data, /physically accessible to them/);
  assert.match(data, /wafwa\.org\/wp-content\/uploads\/2020\/09\/7th-WesternBlack-Bear-Workshop\.pdf/);
  assert.match(data, /Feeding or attracting bears prohibited/);
  assert.match(data, /Aspen Fire/);
  assert.match(data, /Vespers site/);
  assert.match(data, /333 structures/);
  assert.match(data, /azmemory\.azlibrary\.gov\/nodes\/view\/211618/);
  assert.match(data, /Bullock Fire moves summer camp to the desert/);
  assert.match(data, /Double V Scout Ranch in the Sonoran Desert/);
  assert.match(data, /double-v-scout-ranch\.jpg/);
  assert.match(data, /Bighorn Fire closes the mountain/);
  assert.match(data, /119,978 acres/);
  assert.match(data, /Camp Lawton Wildfire History/);
  assert.match(data, /March 6/);
  assert.match(data, /camp-lawton-staff-1960/);
  assert.match(data, /Archival photograph/);
  assert.match(data, /sources\?:/);
  assert.match(data, /May 29, 1953/);
  assert.match(data, /Harry B\. Ogle/);
  assert.match(data, /conservation program open to all campers/);
  assert.match(data, /tribe-cap\.webp/);
  assert.match(data, /Photo credit: Bill Topkis/);
  assert.match(data, /oa-scouting\.org\/history\/non-oa-camp-fraternities/);
  assert.match(data, /local historical-context draft/);
  assert.match(data, /Area 12-F Conference/);
  assert.match(data, /Victorio Lodge 177/);
  assert.match(data, /Nation’s own history confirms/);
  assert.match(data, /papagolodge\.org\/history/);
  assert.match(data, /g13w\.oa-scouting\.org\/about\/section-history/);
  assert.match(data, /g13w\.oa-scouting\.org\/lodges/);
  assert.match(data, /tonation-nsn\.gov\/about-tohono-oodham-nation/);
  assert.match(data, /scoutingmagazine\.org\/issues\/0301\/d-news/);
  assert.match(data, /air\.arizona\.edu\/fire-on-the-mountain/);
  assert.match(data, /fseprd1178610\.pdf/);
  assert.match(header, /History/);
});

test("fact-checked timeline corrections remain in place", () => {
  const recovery = historyEvents.find((event) => event.id === "fire-hardening");
  const current = historyEvents.find((event) => event.id === "independence-pivot");
  const scoutsBsa = historyEvents.find((event) => event.id === "coed-program");
  const accreditation = historyEvents.find((event) => event.id === "accreditation");

  assert.ok(recovery);
  assert.equal(recovery.image, undefined);
  assert.ok(current);
  assert.doesNotMatch(current.detail, /Model Camp|Eagle Quest|Order of the Arrow/);
  assert.ok(scoutsBsa);
  assert.doesNotMatch(`${scoutsBsa.summary} ${scoutsBsa.detail}`, /co-ed/i);
  assert.ok(accreditation);
  assert.doesNotMatch(accreditation.summary, /National Camping School accreditation/);
});

test("Tribe of Papago source material is presented as a credited leader-guide history", () => {
  assert.match(traditionGallery, /Photo credit: Bill Topkis/);
  assert.match(traditionGallery, /Photo credit: Doug Walker/);
  assert.match(traditionGallery, /Photo credit: Edwin DeLuna/);
  assert.match(traditionGallery, /tribe-medal-1923/);
  assert.match(traditionGallery, /Troop 208/);
  assert.match(traditionGallery, /Troop 007/);
  assert.match(traditionGallery, /Troop 741/);
  assert.match(traditionGallery, /Tohono O’odham/);
  assert.match(catalog, /Use the current camp-issued form/);
  assert.match(catalog, /Complete four hours of service projects/);
  assert.match(catalog, /Roy J\. Barker \(1924–2012\)/);
  assert.match(catalog, /Leave No Trace principles/);
});

test("history explorer supports filtering, searching, expansion, and era navigation", () => {
  assert.match(timeline, /setCategory/);
  assert.match(timeline, /setQuery/);
  assert.match(timeline, /aria-expanded/);
  assert.match(timeline, /IntersectionObserver/);
  assert.match(timeline, /aria-live/);
  assert.match(timeline, /event\.image\.label/);
  assert.match(timeline, /event\.sources/);
  assert.match(timeline, /opens in a new tab/);
});

test("history experience includes mobile, print, and reduced-motion treatment", () => {
  assert.match(css, /\.history-hero/);
  assert.match(css, /\.history-timeline-shell/);
  assert.match(css, /\.history-event-detail\[aria-hidden="true"\]/);
  assert.match(css, /@media print/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});
