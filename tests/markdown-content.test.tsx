import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import MarkdownContent from "../components/MarkdownContent";

test("guide Markdown renders headings, ordered lists, emphasis, links, and tables", () => {
  const html = renderToStaticMarkup(<MarkdownContent source={`### Check-in

1. Bring **forms**.
2. Review *directions*.

| Item | Status |
| --- | --- |
| [Guide](/guide) | Ready |`} />);
  assert.match(html, /<h3>Check-in<\/h3>/);
  assert.match(html, /<ol>/);
  assert.match(html, /<strong>forms<\/strong>/);
  assert.match(html, /<em>directions<\/em>/);
  assert.match(html, /<table>/);
  assert.match(html, /href="\/guide"/);
});
