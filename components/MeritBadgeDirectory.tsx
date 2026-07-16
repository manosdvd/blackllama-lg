"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CampCompletion, SurveyTier } from "../lib/merit-badge-survey.generated";

export type MeritBadgeDirectoryItem = {
  id: string;
  title: string;
  area: string;
  tier: SurveyTier;
  completion: CampCompletion;
  overview: string;
  eagleRequired: boolean;
};

const initialResultLimit = 18;

export default function MeritBadgeDirectory({ items }: { items: MeritBadgeDirectoryItem[] }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const areas = useMemo(() => [...new Set(items.map((item) => item.area))].sort(), [items]);
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const searchable = `${item.title} ${item.area} ${item.overview}`.toLowerCase();
      return (!normalizedQuery || searchable.includes(normalizedQuery))
        && (area === "all" || item.area === area);
    });
  }, [area, items, query]);
  const filtering = Boolean(query.trim()) || area !== "all";
  const visible = showAll || filtering ? filtered : filtered.slice(0, initialResultLimit);

  return (
    <section className="badge-directory" id="all-badge-guides" aria-labelledby="badge-directory-heading">
      <header>
        <div>
          <p className="section-kicker">Survey reference library</p>
          <h2 id="badge-directory-heading">Explore all {items.length} interest topics.</h2>
        </div>
        <p>Use these neutral subject guides to discuss unit interest. This library is intentionally broader than the eventual Camp Lawton offering list.</p>
      </header>

      <div className="badge-directory-tools">
        <label>
          <span>Search field guides</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Badge, skill, or topic" />
        </label>
        <label>
          <span>Program area</span>
          <select value={area} onChange={(event) => setArea(event.target.value)}>
            <option value="all">All areas</option>
            {areas.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="badge-directory-results" aria-live="polite">
        <span>{filtered.length} guide{filtered.length === 1 ? "" : "s"} match</span>
        {!filtering && !showAll && filtered.length > initialResultLimit && <small>Showing the first {initialResultLimit}</small>}
      </div>

      <div className="badge-directory-grid">
        {visible.map((item) => (
          <Link href={`/merit-badges/${item.id}`} key={item.id}>
            <div>
              <span>{item.area} · Survey candidate</span>
              {item.eagleRequired && <i>Eagle</i>}
            </div>
            <h3>{item.title}</h3>
            <p>{item.overview}</p>
            <div className="badge-directory-card-footer">
              <span>Not a published offering</span>
              <strong>Open reference →</strong>
            </div>
          </Link>
        ))}
      </div>

      {visible.length === 0 && <div className="badge-directory-empty"><h3>No survey topics match.</h3><p>Try a broader search or reset the program-area filter.</p></div>}
      {!filtering && !showAll && filtered.length > initialResultLimit && <button className="badge-directory-more" type="button" onClick={() => setShowAll(true)}>Show all {filtered.length} field guides</button>}
    </section>
  );
}
