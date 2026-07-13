import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const [page, timeline, data, header, css] = await Promise.all([
  readFile(new URL("app/history/page.tsx", root), "utf8"),
  readFile(new URL("components/HistoryTimeline.tsx", root), "utf8"),
  readFile(new URL("lib/camp-history.ts", root), "utf8"),
  readFile(new URL("components/SiteHeader.tsx", root), "utf8"),
  readFile(new URL("app/globals.css", root), "utf8"),
]);

test("history route turns the working documents into an accessible chronology", () => {
  assert.match(page, /A century/);
  assert.match(page, /historySourceDocuments/);
  assert.match(data, /1921/);
  assert.match(data, /Al’s Well/);
  assert.match(data, /Aspen Fire/);
  assert.match(data, /March 6/);
  assert.match(header, /History/);
});

test("history explorer supports filtering, searching, expansion, and era navigation", () => {
  assert.match(timeline, /setCategory/);
  assert.match(timeline, /setQuery/);
  assert.match(timeline, /aria-expanded/);
  assert.match(timeline, /IntersectionObserver/);
  assert.match(timeline, /aria-live/);
});

test("history experience includes mobile, print, and reduced-motion treatment", () => {
  assert.match(css, /\.history-hero/);
  assert.match(css, /\.history-timeline-shell/);
  assert.match(css, /\.history-event-detail\[aria-hidden="true"\]/);
  assert.match(css, /@media print/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});
