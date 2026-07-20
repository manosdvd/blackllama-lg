import type { ReactNode } from "react";
import Link from "next/link";

const inlineToken = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|_[^_\n]+_|\[[^\]]+\]\((?:\/|https:\/\/)[^)]+\))/;

export type MarkdownHeading = { level: 1 | 2 | 3; text: string; id: string };

export function markdownHeadingId(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractMarkdownHeadings(source: string): MarkdownHeading[] {
  return source.split(/\r?\n/).flatMap((line) => {
    const match = /^(#{1,3})\s+(.+)$/.exec(line.trim());
    if (!match) return [];
    const level = match[1].length as 1 | 2 | 3;
    const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[*_]/g, "");
    return [{ level, text, id: markdownHeadingId(text) }];
  });
}

function inlineContent(text: string): ReactNode[] {
  return text.split(inlineToken).filter(Boolean).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_"))) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    const link = /^\[([^\]]+)\]\((\/[^)]+|https:\/\/[^)]+)\)$/.exec(part);
    if (!link) return part;
    const [, label, href] = link;
    return href.startsWith("/")
      ? <Link href={href} key={index}>{label}</Link>
      : <a href={href} key={index} target="_blank" rel="noreferrer">{label}<span className="sr-only"> (opens in a new tab)</span></a>;
  });
}

function tableCells(line: string): string[] {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function isTableDivider(line: string): boolean {
  const cells = tableCells(line);
  return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function startsBlock(lines: string[], index: number): boolean {
  const line = lines[index] ?? "";
  return /^#{1,3}\s/.test(line)
    || line.startsWith(":::placeholder ")
    || /^-\s+/.test(line)
    || /^\d+\.\s+/.test(line)
    || /^!\[[^\]]*\]\(.+\)$/.test(line)
    || (line.includes("|") && isTableDivider(lines[index + 1] ?? ""));
}

export default function MarkdownContent({ source }: { source: string }) {
  const lines = source.trim().split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) {
      index += 1;
      continue;
    }

    const key = blocks.length;
    if (line.startsWith(":::placeholder ")) {
      const title = line.slice(":::placeholder ".length).trim();
      const body: string[] = [];
      index += 1;
      while (index < lines.length && lines[index].trim() !== ":::") {
        if (lines[index].trim()) body.push(lines[index].trim());
        index += 1;
      }
      if (lines[index]?.trim() === ":::") index += 1;
      blocks.push(
        <aside className="guide-placeholder" role="note" key={key}>
          <span>Placeholder · awaiting approved 2027 information</span>
          <h3>{title}</h3>
          <strong>Approved 2027 information has not yet been published. Do not rely on this section for planning.</strong>
          {body.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{inlineContent(paragraph)}</p>)}
        </aside>,
      );
      continue;
    }
    if (/^!\[[^\]]*\]\(.+\)$/.test(line)) {
      const match = /^!\[([^\]]*)\]\((.+)\)$/.exec(line);
      if (match) {
        const [, alt, src] = match;
        blocks.push(<img key={key} src={src} alt={alt} className="article-block-image" />);
        index += 1;
        continue;
      }
    }
    if (line.startsWith("### ")) {
      const text = line.slice(4);
      blocks.push(<h3 id={markdownHeadingId(text)} key={key}>{inlineContent(text)}</h3>);
      index += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      const text = line.slice(3);
      blocks.push(<h2 id={markdownHeadingId(text)} key={key}>{inlineContent(text)}</h2>);
      index += 1;
      continue;
    }
    if (line.startsWith("# ")) {
      const text = line.slice(2);
      blocks.push(<h1 id={markdownHeadingId(text)} key={key}>{inlineContent(text)}</h1>);
      index += 1;
      continue;
    }
    if (line.includes("|") && isTableDivider(lines[index + 1] ?? "")) {
      const headings = tableCells(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim() && lines[index].includes("|")) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      blocks.push(<div className="article-table-wrap" key={key}><table><thead><tr>{headings.map((cell, cellIndex) => <th key={cellIndex}>{inlineContent(cell)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{headings.map((_, cellIndex) => <td key={cellIndex}>{inlineContent(row[cellIndex] ?? "")}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^-\s+/, ""));
        index += 1;
      }
      blocks.push(<ul key={key}>{items.map((item, itemIndex) => <li key={itemIndex}>{inlineContent(item)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push(<ol key={key}>{items.map((item, itemIndex) => <li key={itemIndex}>{inlineContent(item)}</li>)}</ol>);
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && (paragraph.length === 0 || !startsBlock(lines, index))) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(<p key={key}>{inlineContent(paragraph.join(" "))}</p>);
  }

  return <div className="article-body">{blocks}</div>;
}
