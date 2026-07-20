import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import MarkdownContent, { extractMarkdownHeadings } from "../components/MarkdownContent";

test("guide Markdown renders headings, ordered lists, emphasis, links, and tables", () => {
  const html = renderToStaticMarkup(<MarkdownContent source={`### Check-in

1. Bring **forms**.
2. Review *directions*.

| Item | Status |
| --- | --- |
| [Guide](/guide) | Ready |`} />);
  assert.match(html, /<h3 id="check-in">Check-in<\/h3>/);
  assert.match(html, /<ol>/);
  assert.match(html, /<strong>forms<\/strong>/);
  assert.match(html, /<em>directions<\/em>/);
  assert.match(html, /<table>/);
  assert.match(html, /href="\/guide"/);
});

test("guide Markdown renders labeled placeholders without treating them as approved guidance", () => {
  const html = renderToStaticMarkup(<MarkdownContent source={`## Final fees

:::placeholder Participant fees
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
:::`} />);
  assert.match(html, /class="guide-placeholder"/);
  assert.match(html, /Placeholder · awaiting approved 2027 information/);
  assert.match(html, /Approved 2027 information has not yet been published\. Do not rely on this section for planning\./);
  assert.match(html, /Lorem ipsum dolor sit amet, consectetur adipiscing elit\./);
  assert.deepEqual(extractMarkdownHeadings("## Final fees\n### Payment schedule"), [
    { level: 2, text: "Final fees", id: "final-fees" },
    { level: 3, text: "Payment schedule", id: "payment-schedule" },
  ]);
});
