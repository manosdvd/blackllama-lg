import type { ReactNode } from "react";

function inlineContent(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part,
  );
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
