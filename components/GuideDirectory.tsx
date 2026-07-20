"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GuideArticle } from "../lib/camp-catalog";
import { guidePathStatus, requirementsForPath } from "../lib/leader-guide-requirements";

const categoryOrder = ["Start here", "Register & pay", "Plan the unit program", "Prepare", "Health & safety", "Arrival", "Daily camp life", "Departure", "About Lawton", "Help"];

function statusLabel(status: ReturnType<typeof guidePathStatus>) {
  if (status === "placeholder") return "Details pending";
  if (status === "mixed") return "Includes pending details";
  if (status === "source-backed") return "Current planning guidance";
  return undefined;
}

export default function GuideDirectory({ articles }: { articles: GuideArticle[] }) {
  const [query, setQuery] = useState("");
  const [audience, setAudience] = useState("all");
  const visible = useMemo(() => articles.filter((article) => {
    const matchesAudience = audience === "all" || article.audience === "all" || article.audience === audience;
    const path = `/guide/${article.slug}`;
    const requirementTerms = requirementsForPath(path).flatMap((requirement) => [requirement.label, requirement.standard, ...requirement.searchTerms]);
    const text = `${article.title} ${article.summary} ${article.category} ${article.tags.join(" ")} ${requirementTerms.join(" ")} ${article.body}`.toLowerCase();
    return matchesAudience && text.includes(query.trim().toLowerCase());
  }), [articles, audience, query]);
  const categories = [...new Set(visible.map((article) => article.category))].sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    return (aIndex < 0 ? categoryOrder.length : aIndex) - (bIndex < 0 ? categoryOrder.length : bIndex);
  });

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
      <label className="search-box"><span aria-hidden="true">⌕</span><span className="sr-only">Search guide</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search fees, forms, prerequisites..." /></label>
      <div className="segmented" aria-label="Filter by audience">{[["all", "All"], ["bsa", "BSA"], ["cub", "Cub"], ["leaders", "Leaders"]].map(([value, label]) => <button key={value} type="button" aria-pressed={audience === value} onClick={() => setAudience(value)}>{label}</button>)}</div>
    </div>
    <div className="guide-directory">
      {categories.map((category) => <section key={category} className="guide-category"><h2>{category}</h2><div>{visible.filter((article) => article.category === category).map((article) => {
        const status = guidePathStatus(`/guide/${article.slug}`);
        return <Link href={`/guide/${article.slug}`} key={article.slug} className={`directory-article priority-${article.priority}`}><span>{article.audience === "all" ? "All sessions" : article.audience === "bsa" ? "BSA weeks" : article.audience === "cub" ? "Cub weekend" : "Leaders"}</span><h3>{article.title}</h3><p>{article.summary}</p>{status && <em className={`guide-status guide-status-${status}`}>{statusLabel(status)}</em>}<small>Reviewed {article.updatedAt ? new Date(article.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }) : "Review pending"}</small></Link>;
      })}</div></section>)}
      {visible.length === 0 && <div className="directory-empty"><h2>No matching guide articles</h2><p>Try a broader search or change the audience filter.</p></div>}
    </div>
  </>;
}
