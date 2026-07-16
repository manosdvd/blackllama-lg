"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GuideArticle } from "../lib/camp-catalog";

export default function GuideDirectory({ articles }: { articles: GuideArticle[] }) {
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState("all");
  const visible = useMemo(() => articles.filter((article) => {
    const matchesAudience = audience === "all" || article.audience === "all" || article.audience === audience;
    const text = `${article.title} ${article.summary} ${article.category} ${article.tags.join(" ")} ${article.body}`.toLowerCase();
    return matchesAudience && text.includes(query.trim().toLowerCase());
  }), [articles, audience, query]);
  const categories = [...new Set(visible.map((article) => article.category))];

  return <>
    <Link className="packing-feature-card" href="/guide/packing-list">
      <span className="packing-feature-number" aria-hidden="true">01</span>
      <div>
        <span>Featured preparation tool</span>
        <h2>Pack with confidence.</h2>
        <p>Use the interactive Camp Lawton checklist, save progress on this device, add personal extras, and print a clean copy for the unit meeting.</p>
      </div>
      <strong>Open packing checklist <span aria-hidden="true">→</span></strong>
    </Link>
    <div className="directory-tools">
      <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Search guide</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search forms, arrival, fire..." /></label>
      <div className="segmented" aria-label="Filter by audience">{[["all", "All"], ["bsa", "BSA"], ["cub", "Cub"], ["leaders", "Leaders"]].map(([value, label]) => <button key={value} type="button" aria-pressed={audience === value} onClick={() => setAudience(value)}>{label}</button>)}</div>
    </div>
    <div className="guide-directory">
      {categories.map((category) => <section key={category} className="guide-category"><h2>{category}</h2><div>{visible.filter((article) => article.category === category).map((article) => <Link href={`/guide/${article.slug}`} key={article.slug} className={`directory-article priority-${article.priority}`}><span>{article.audience === "all" ? "All sessions" : article.audience === "bsa" ? "BSA weeks" : article.audience === "cub" ? "Cub weekend" : "Leaders"}</span><h3>{article.title}</h3><p>{article.summary}</p><small>Reviewed {article.updatedAt ? new Date(article.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Review pending"}</small></Link>)}</div></section>)}
      {visible.length === 0 && <div className="directory-empty"><h2>No matching guide articles</h2><p>Try a broader search or change the audience filter.</p></div>}
    </div>
  </>;
}
