import type { ReactNode } from "react";
import Link from "next/link";

function inlineContent(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    const link = /^\[([^\]]+)\]\((\/[^)]+|https:\/\/[^)]+)\)$/.exec(part);
    if (!link) return part;
    const [, label, href] = link;
    return href.startsWith("/")
      ? <Link href={href} key={index}>{label}</Link>
      : <a href={href} key={index} target="_blank" rel="noreferrer">{label}<span className="sr-only"> (opens in a new tab)</span></a>;
  });
}

export default function MarkdownContent({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) return <h2 key={index}>{inlineContent(block.slice(3))}</h2>;
        if (block.startsWith("# ")) return <h1 key={index}>{inlineContent(block.slice(2))}</h1>;
        if (block.split("\n").every((line) => line.startsWith("- "))) {
          return <ul key={index}>{block.split("\n").map((line) => <li key={line}>{inlineContent(line.slice(2))}</li>)}</ul>;
        }
        return <p key={index}>{inlineContent(block.replaceAll("\n", " "))}</p>;
      })}
    </div>
  );
}
