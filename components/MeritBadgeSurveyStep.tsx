"use client";

import { useMemo, useState } from "react";
import { CONDITIONAL_COMPLETION_NOTE, meritBadgeSurveyCatalog, type CampCompletion } from "../lib/merit-badge-survey.generated";

export type SurveyInterestState = { count: number; priority: string; note: string };

type Props = {
  interests: Record<string, SurveyInterestState>;
  youthTotal: number;
  onChange: (id: string, patch: Partial<SurveyInterestState>) => void;
};

const completionLabels: Record<CampCompletion, string> = {
  complete: "Complete at camp",
  conditional: "Conditional completion",
  partial: "Partial at camp",
};

export default function MeritBadgeSurveyStep({ interests, youthTotal, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [completion, setCompletion] = useState("all");
  const [tier, setTier] = useState("all");
  const [selectedOnly, setSelectedOnly] = useState(false);
  const areas = useMemo(() => [...new Set(meritBadgeSurveyCatalog.map((badge) => badge.area))].sort(), []);
  const selectedCount = Object.values(interests).filter((interest) => interest.count > 0).length;
  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return meritBadgeSurveyCatalog.filter((badge) => {
      const interest = interests[badge.id];
      const searchable = `${badge.title} ${badge.sourceTitle} ${badge.area} ${badge.prerequisites ?? ""} ${badge.unavailableAtCamp ?? ""}`.toLowerCase();
      return (!normalizedQuery || searchable.includes(normalizedQuery))
        && (area === "all" || badge.area === area)
        && (completion === "all" || badge.completion === completion)
        && (tier === "all" || badge.tier === tier)
        && (!selectedOnly || (interest?.count ?? 0) > 0);
    });
  }, [area, completion, interests, query, selectedOnly, tier]);

  return (
    <section className="form-step interest-step">
      <header><span>Step 4</span><h2>Merit badge interest</h2><p>Estimate interest across all 84 candidates. These responses help staff choose what to offer; they do not create a class, reserve a seat, or promise completion.</p></header>
      <div className="survey-status-key" aria-label="Completion feasibility key">
        <p><strong>Complete at camp</strong><span>Current analysis indicates the requirements can be completed at camp.</span></p>
        <p><strong>Conditional</strong><span>{CONDITIONAL_COMPLETION_NOTE.replace(/^Complete\* = /, "")}</span></p>
        <p><strong>Partial at camp</strong><span>Some requirements must be completed away from camp.</span></p>
      </div>
      <div className="interest-tools">
        <label className="survey-search"><span>Search badges</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Badge, area, or requirement" /></label>
        <label><span>Program area</span><select value={area} onChange={(event) => setArea(event.target.value)}><option value="all">All areas</option>{areas.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Feasibility</span><select value={completion} onChange={(event) => setCompletion(event.target.value)}><option value="all">All statuses</option><option value="complete">Complete at camp</option><option value="conditional">Conditional</option><option value="partial">Partial at camp</option></select></label>
        <label><span>Source tier</span><select value={tier} onChange={(event) => setTier(event.target.value)}><option value="all">All tiers</option>{["S", "A", "B", "C", "D"].map((item) => <option key={item} value={item}>Tier {item}</option>)}</select></label>
        <label className="selected-filter"><input type="checkbox" checked={selectedOnly} onChange={(event) => setSelectedOnly(event.target.checked)} /><span>Selected only</span></label>
      </div>
      <div className="interest-results"><span>{visible.length} badge{visible.length === 1 ? "" : "s"} shown</span><strong>{selectedCount} selected</strong></div>
      <div className="interest-table">
        <div className="interest-head"><span>Badge and feasibility</span><span>Interested</span><span>Priority</span></div>
        {visible.map((badge) => {
          const interest = interests[badge.id] ?? { count: 0, priority: "nice-to-have", note: "" };
          return <div key={badge.id} className={`interest-row ${interest.count > 0 ? "selected" : ""}`}>
            <div className="interest-badge"><span>{badge.area} · Tier {badge.tier}</span><strong>{badge.title}</strong><small className={`completion-${badge.completion}`}>{completionLabels[badge.completion]}</small></div>
            <label className="interest-count"><span className="sr-only">{badge.title} interested Scouts</span><input aria-label={`${badge.title} interested Scouts`} type="number" min="0" max={youthTotal} value={interest.count} onChange={(event) => onChange(badge.id, { count: Math.max(0, Math.min(youthTotal, Math.floor(Number(event.target.value) || 0))) })} /></label>
            <label className="interest-priority"><span className="sr-only">{badge.title} priority</span><select aria-label={`${badge.title} priority`} disabled={interest.count === 0} value={interest.priority} onChange={(event) => onChange(badge.id, { priority: event.target.value })}><option value="must-have">Must-have</option><option value="strong">Strong interest</option><option value="nice-to-have">Nice-to-have</option></select></label>
            <details className="survey-badge-details"><summary>Requirements and workload</summary><dl><div><dt>Prerequisites</dt><dd>{badge.prerequisites ?? "None listed"}</dd></div><div><dt>Outside camp</dt><dd>{badge.unavailableAtCamp ?? "No unavailable requirement listed"}</dd></div><div><dt>Estimated class time</dt><dd>{badge.classHours} hour{badge.classHours === 1 ? "" : "s"}</dd></div><div><dt>Estimated individual time</dt><dd>{badge.individualEffort.raw === "N/A" ? "Not available" : `${badge.individualEffort.raw} hour${badge.individualEffort.minimumHours === 1 ? "" : "s"}`}</dd></div></dl></details>
            {interest.count > 0 && <label className="interest-note"><span>Optional unit planning note</span><textarea value={interest.note} maxLength={250} onChange={(event) => onChange(badge.id, { note: event.target.value })} placeholder="No Scout names, health details, or other personal information" /></label>}
          </div>;
        })}
        {visible.length === 0 && <p className="interest-empty">No badges match these filters.</p>}
      </div>
    </section>
  );
}
