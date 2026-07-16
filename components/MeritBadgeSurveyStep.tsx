"use client";

import { useMemo, useState } from "react";
import { meritBadgeSurveyCatalog } from "../lib/merit-badge-survey.generated";

export type SurveyInterestState = { count: number; priority: string; note: string };

type Props = {
  interests: Record<string, SurveyInterestState>;
  youthTotal: number;
  onChange: (id: string, patch: Partial<SurveyInterestState>) => void;
};

export default function MeritBadgeSurveyStep({ interests, youthTotal, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
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
        && (!selectedOnly || (interest?.count ?? 0) > 0);
    });
  }, [area, interests, query, selectedOnly]);

  return (
    <section className="form-step interest-step">
      <header><span>Step 3</span><h2>Merit badge interest</h2><p>Estimate your unit&apos;s interest across 84 broad survey candidates. This is not the final 2027 merit badge list or class schedule. Responses help staff shape the eventual program; they do not create a class, reserve a seat, or promise completion.</p></header>
      <div className="interest-tools">
        <label className="survey-search"><span>Search badges</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Badge, area, or requirement" /></label>
        <label><span>Program area</span><select value={area} onChange={(event) => setArea(event.target.value)}><option value="all">All areas</option>{areas.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="selected-filter"><input type="checkbox" checked={selectedOnly} onChange={(event) => setSelectedOnly(event.target.checked)} /><span>Selected only</span></label>
      </div>
      <div className="interest-results"><span>{visible.length} badge{visible.length === 1 ? "" : "s"} shown</span><strong>{selectedCount} selected</strong></div>
      <div className="interest-table">
        <div className="interest-head"><span>Survey candidate</span><span>Interested</span><span>Priority</span></div>
        {visible.map((badge) => {
          const interest = interests[badge.id] ?? { count: 0, priority: "nice-to-have", note: "" };
          return <div key={badge.id} className={`interest-row ${interest.count > 0 ? "selected" : ""}`}>
            <div className="interest-badge"><span>{badge.area} · interest topic</span><strong>{badge.title}</strong><small>Candidate only—not a published offering</small></div>
            <label className="interest-count"><span className="sr-only">{badge.title} interested Scouts</span><input aria-label={`${badge.title} interested Scouts`} type="number" min="0" max={youthTotal} value={interest.count} onChange={(event) => onChange(badge.id, { count: Math.max(0, Math.min(youthTotal, Math.floor(Number(event.target.value) || 0))) })} /></label>
            <label className="interest-priority"><span className="sr-only">{badge.title} priority</span><select aria-label={`${badge.title} priority`} disabled={interest.count === 0} value={interest.priority} onChange={(event) => onChange(badge.id, { priority: event.target.value })}><option value="must-have">Must-have</option><option value="strong">Strong interest</option><option value="nice-to-have">Nice-to-have</option></select></label>
            {interest.count > 0 && <label className="interest-note"><span>Optional unit planning note</span><textarea value={interest.note} maxLength={250} onChange={(event) => onChange(badge.id, { note: event.target.value })} placeholder="No Scout names, health details, or other personal information" /></label>}
          </div>;
        })}
        {visible.length === 0 && <p className="interest-empty">No badges match these filters.</p>}
      </div>
    </section>
  );
}
