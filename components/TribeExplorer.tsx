"use client";

import { useMemo, useState } from "react";
import { tribeGuideRanks } from "../lib/tribe-of-papago";

export default function TribeExplorer() {
  const [selectedId, setSelectedId] = useState(tribeGuideRanks[0].id);
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState<Record<string, string[]>>({});
  const normalizedQuery = query.trim().toLowerCase();
  const visibleRanks = useMemo(() => tribeGuideRanks.filter((rank) => {
    if (!normalizedQuery) return true;
    return `${rank.title} ${rank.audience} ${rank.requirements.join(" ")}`.toLowerCase().includes(normalizedQuery);
  }), [normalizedQuery]);
  const selectedRank = visibleRanks.find((rank) => rank.id === selectedId) ?? visibleRanks[0];
  const selectedChecks = selectedRank ? completed[selectedRank.id] ?? [] : [];

  function toggleRequirement(rankId: string, requirement: string) {
    setCompleted((current) => {
      const checked = current[rankId] ?? [];
      return {
        ...current,
        [rankId]: checked.includes(requirement)
          ? checked.filter((item) => item !== requirement)
          : [...checked, requirement],
      };
    });
  }

  return <section className="top-program" id="recognition-paths" aria-labelledby="top-program-title">
    <header className="top-section-heading">
      <div>
        <p className="section-kicker">Leader field guide · Recognition paths</p>
        <h2 id="top-program-title">Match each camper to the right path.</h2>
      </div>
      <p>The program recognizes the number of years a Scout has returned to Camp Lawton, then adds service, advancement, trail experience, leadership, reflection, and Scout spirit.</p>
    </header>

    <div className="top-leader-playbook" aria-label="How unit leaders use the recognition program">
      <article><span>Before camp</span><strong>Identify return years</strong><p>Confirm how many Camp Lawton seasons each Scout has attended and review the matching path before building the unit schedule.</p></article>
      <article><span>Early in the week</span><strong>Make room for the work</strong><p>Coordinate service, trails, advancement, program-area help, and a spiritual gathering before the schedule fills.</p></article>
      <article><span>Before Friday</span><strong>Confirm completion</strong><p>Review progress with Scouts and ask camp staff how the season’s recognition is recorded and presented.</p></article>
    </div>

    <div className="top-path-finder">
      <div className="top-path-tools">
        <label className="top-path-search">
          <span>Search requirements</span>
          <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try service, trails, chapel, leadership…" />
        </label>
        <p aria-live="polite">{visibleRanks.length} of {tribeGuideRanks.length} paths shown</p>
      </div>

      <div className="top-rank-tabs" role="tablist" aria-label="Choose a Tribe of Papago recognition path">
        {visibleRanks.map((rank) => <button
          type="button"
          role="tab"
          aria-selected={selectedRank?.id === rank.id}
          aria-controls="top-rank-detail"
          key={rank.id}
          onClick={() => setSelectedId(rank.id)}
        >
          <span>{rank.stage}</span>
          <strong>{rank.shortTitle}</strong>
        </button>)}
      </div>

      {selectedRank ? <article className={`top-rank-detail top-rank-${selectedRank.color}`} id="top-rank-detail" role="tabpanel">
        <div className="top-rank-identity">
          <p>{selectedRank.stage}</p>
          <h3>{selectedRank.shortTitle}</h3>
          <span>{selectedRank.audience}</span>
          <img src={selectedRank.image} width={640} height={427} alt={`${selectedRank.shortTitle} recognition rocker artwork`} />
        </div>
        <div className="top-rank-checklist">
          <header>
            <div><span>Camp-week checklist</span><strong>{selectedChecks.length} of {selectedRank.requirements.length} marked</strong></div>
            {selectedChecks.length > 0 && <button type="button" onClick={() => setCompleted((current) => ({ ...current, [selectedRank.id]: [] }))}>Clear marks</button>}
          </header>
          <div className="top-rank-progress" aria-hidden="true"><span style={{ width: `${(selectedChecks.length / selectedRank.requirements.length) * 100}%` }} /></div>
          <ol>
            {selectedRank.requirements.map((requirement, index) => {
              const checked = selectedChecks.includes(requirement);
              const inputId = `${selectedRank.id}-${index}`;
              return <li className={checked ? "is-complete" : ""} key={requirement}>
                <input id={inputId} type="checkbox" checked={checked} onChange={() => toggleRequirement(selectedRank.id, requirement)} />
                <label htmlFor={inputId}><span aria-hidden="true">{checked ? "✓" : index + 1}</span><span>{requirement}</span></label>
              </li>;
            })}
          </ol>
          <p>Planning aid only. Marks stay in this browser session and are not submitted to Camp Lawton.</p>
        </div>
      </article> : <p className="top-path-empty">No recognition path matches that search. Try a broader term.</p>}
    </div>

  </section>;
}
