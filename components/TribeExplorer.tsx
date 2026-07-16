"use client";

import { useMemo, useState } from "react";
import { parseTribeProgram } from "../lib/tribe-of-papago";

export default function TribeExplorer({ source }: { source: string }) {
  const program = useMemo(() => parseTribeProgram(source), [source]);
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleRanks = program.ranks.filter((rank) => {
    if (selected !== "all" && rank.id !== selected) return false;
    if (!normalizedQuery) return true;
    return `${rank.title} ${rank.stage} ${rank.requirements.join(" ")}`.toLowerCase().includes(normalizedQuery);
  });
  const totalRequirements = program.ranks.reduce((total, rank) => total + rank.requirements.length, 0);

  return <section className="tribe-explorer" aria-labelledby="tribe-explorer-title">
    <header className="tribe-explorer-header">
      <div><p className="section-kicker">Working program explorer</p><h2 id="tribe-explorer-title">Choose a path. See what it asks.</h2><p>{program.introduction || "The current working guide describes a Camp Lawton recognition tradition built around returning, service, leadership, trail experience, reflection, and Scout spirit."}</p></div>
      <dl><div><dt>Paths</dt><dd>{program.ranks.length}</dd></div><div><dt>Requirements</dt><dd>{totalRequirements}</dd></div><div><dt>Status</dt><dd>Working</dd></div></dl>
    </header>
    <div className="tribe-tools">
      <label className="tribe-search"><span>Search requirements</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try service, chapel, trail..." /></label>
      <div className="tribe-tabs" role="tablist" aria-label="Filter recognition paths">
        <button type="button" role="tab" aria-selected={selected === "all"} onClick={() => setSelected("all")}>All paths</button>
        {program.ranks.map((rank) => <button type="button" role="tab" key={rank.id} aria-selected={selected === rank.id} onClick={() => setSelected(rank.id)}>{rank.title.split("—")[0].trim()}</button>)}
      </div>
    </div>
    <p className="tribe-results" aria-live="polite">Showing {visibleRanks.length} of {program.ranks.length} recognition paths</p>
    <div className="tribe-rank-panels">
      {visibleRanks.map((rank, index) => <details className="tribe-rank-panel" key={rank.id} open={selected === rank.id || (!query && selected === "all" && index === 0)}>
        <summary><span className="tribe-rank-index">{String(index + 1).padStart(2, "0")}</span><span><strong>{rank.title}</strong><small>{rank.stage} · {rank.requirements.length} working requirements</small></span><i aria-hidden="true">+</i></summary>
        <ul>{rank.requirements.map((requirement) => <li key={requirement}><span aria-hidden="true">✓</span>{requirement}</li>)}</ul>
      </details>)}
      {!visibleRanks.length && <p className="tribe-empty">No rank requirements match that search.</p>}
    </div>
    {program.barkerRequirements.length > 0 && <aside className="tribe-barker-summary"><div><p className="section-kicker">For the whole unit</p><h3>The Barker Standard</h3><p>Units pursue a separate standard through visible service, camp participation, leadership, and Scout spirit.</p></div><details><summary>View the working unit requirements <span aria-hidden="true">+</span></summary><ol>{program.barkerRequirements.map((requirement) => <li key={requirement}>{requirement}</li>)}</ol></details></aside>}
    <p className="tribe-source-note"><strong>Working-source note:</strong> Requirements are transcribed from the current Camp Lawton working document. Final staff-issued requirements, forms, and authorized cultural review control each season.</p>
  </section>;
}
