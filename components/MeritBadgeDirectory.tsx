"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PrerequisiteDetail } from "../lib/camp-lawton-merit-badges";

export type MeritBadgeDirectoryItem = {
  id: string;
  title: string;
  area: string;
  reqYear?: string;
  prereqs?: string;
  hasCampResearchPrereq?: boolean;
  prereqDetails?: PrerequisiteDetail[];
  periods?: string[];
  periodNumbers?: number[];
  isDoublePeriod?: boolean;
  cost?: string | null;
  costDetails?: string | null;
  maxScouts?: number;
  counselor?: string;
  otherInfo?: string | null;
  overview: string;
  eagleRequired: boolean;
  officialUrl?: string;
};

export default function MeritBadgeDirectory({ items }: { items: MeritBadgeDirectoryItem[] }) {
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [period, setPeriod] = useState("all");
  const [prereqFilter, setPrereqFilter] = useState("all");
  const [eagleOnly, setEagleOnly] = useState(false);

  const areas = useMemo(() => [...new Set(items.map((item) => item.area))].sort(), [items]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      // Query filter
      if (normalizedQuery) {
        const prereqText = item.prereqDetails?.map((p) => `${p.reqNumber} ${p.summary}`).join(" ") ?? "";
        const searchable = `${item.title} ${item.area} ${item.counselor ?? ""} ${item.prereqs ?? ""} ${prereqText} ${item.overview} ${item.periods?.join(" ") ?? ""}`.toLowerCase();
        if (!searchable.includes(normalizedQuery)) return false;
      }
      // Area filter
      if (area !== "all" && item.area !== area) return false;
      // Eagle filter
      if (eagleOnly && !item.eagleRequired) return false;
      // Period filter
      if (period !== "all") {
        if (period === "double") {
          if (!item.isDoublePeriod) return false;
        } else {
          const pNum = Number.parseInt(period, 10);
          if (!item.periodNumbers?.includes(pNum)) return false;
        }
      }
      // Prerequisite filter
      if (prereqFilter === "none") {
        if (item.prereqDetails && item.prereqDetails.length > 0) return false;
      } else if (prereqFilter === "has-prereqs") {
        if (!item.prereqDetails || item.prereqDetails.length === 0) return false;
      }
      return true;
    });
  }, [area, eagleOnly, items, period, prereqFilter, query]);

  const isFiltering = Boolean(query.trim()) || area !== "all" || period !== "all" || prereqFilter !== "all" || eagleOnly;

  function resetFilters() {
    setQuery("");
    setArea("all");
    setPeriod("all");
    setPrereqFilter("all");
    setEagleOnly(false);
  }

  return (
    <section className="badge-directory" id="all-badge-guides" aria-labelledby="badge-directory-heading">
      <header>
        <div>
          <p className="section-kicker">Official 2027 Camp Lawton Schedule &amp; Prerequisites</p>
          <h2 id="badge-directory-heading">Summer Camp 2027 Merit Badge Program</h2>
        </div>
        <p>
          These 43 merit badge and advancement courses are officially scheduled for Summer 2027 at Camp Lawton,
          sourced directly from the 2027 Leader&apos;s Guide. Every badge card below includes the exact prerequisites
          and pre-camp homework requirements so leaders, parents, and Scouts are fully prepared.
        </p>
      </header>

      <div className="badge-directory-tools">
        <label>
          <span>Search 2027 Courses</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Badge, topic, counselor, or prereq..."
          />
        </label>

        <label>
          <span>Program Area</span>
          <select value={area} onChange={(event) => setArea(event.target.value)}>
            <option value="all">All Program Areas ({items.length})</option>
            {areas.map((name) => {
              const count = items.filter((i) => i.area === name).length;
              return (
                <option key={name} value={name}>
                  {name} ({count})
                </option>
              );
            })}
          </select>
        </label>

        <label>
          <span>Class Period</span>
          <select value={period} onChange={(event) => setPeriod(event.target.value)}>
            <option value="all">All Periods (1–6)</option>
            <option value="1">Period 1</option>
            <option value="2">Period 2</option>
            <option value="3">Period 3</option>
            <option value="4">Period 4</option>
            <option value="5">Period 5</option>
            <option value="6">Period 6</option>
            <option value="double">Double Periods (P1–2, P4–5)</option>
          </select>
        </label>

        <label>
          <span>Pre-Camp Requirements</span>
          <select value={prereqFilter} onChange={(event) => setPrereqFilter(event.target.value)}>
            <option value="all">All Requirements</option>
            <option value="none">No Prerequisites (24 courses)</option>
            <option value="has-prereqs">Has Pre-Work / Prereqs (19 courses)</option>
          </select>
        </label>

        <div className="badge-directory-toggle-box">
          <span>Advancement Tier</span>
          <button
            type="button"
            className={`badge-eagle-toggle-btn ${eagleOnly ? "is-active" : ""}`}
            onClick={() => setEagleOnly(!eagleOnly)}
            aria-pressed={eagleOnly}
          >
            ★ Eagle-Required Only
          </button>
        </div>
      </div>

      <div className="badge-directory-results" aria-live="polite">
        <div className="results-summary">
          <strong>{filtered.length}</strong> {filtered.length === 1 ? "course" : "courses"} scheduled
          {isFiltering && (
            <button type="button" onClick={resetFilters} className="badge-clear-filters-btn">
              Clear filters
            </button>
          )}
        </div>
        <small>Class registration opens February 1, 2027 on Black Pug</small>
      </div>

      <div className="badge-directory-grid">
        {filtered.map((item) => {
          const hasPrereqs = Boolean(item.prereqDetails && item.prereqDetails.length > 0);

          return (
            <Link href={`/merit-badges/${item.id}`} key={item.id} className="badge-card-link">
              <div className="badge-card-tags">
                <span className="badge-card-area">{item.area}</span>
                {item.eagleRequired && <span className="badge-card-eagle">★ Eagle Required</span>}
                {item.periods && item.periods.length > 0 && (
                  <span className="badge-card-period">{item.periods.join(", ")}</span>
                )}
              </div>

              <h3 className="badge-card-title">{item.title}</h3>
              <p className="badge-card-desc">{item.overview}</p>

              {/* DEDICATED PREREQUISITES SECTION ON EACH CARD */}
              <div className={`badge-card-prereq-box ${hasPrereqs ? "has-prereqs" : "no-prereqs"}`}>
                <div className="prereq-box-header">
                  <span className="prereq-icon" aria-hidden="true">
                    {hasPrereqs ? "📋" : "✓"}
                  </span>
                  <strong>{hasPrereqs ? "Prerequisites & Pre-Work" : "No Prerequisites"}</strong>
                </div>

                {hasPrereqs ? (
                  <ul className="prereq-list">
                    {item.prereqDetails!.map((req, idx) => (
                      <li key={idx} className="prereq-item">
                        <span className="prereq-badge">{req.reqNumber}</span>
                        <span className="prereq-desc">{req.summary}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="prereq-note">
                    100% completed at camp during regular scheduled class time.
                  </p>
                )}
              </div>

              <div className="badge-card-chips">
                <span className="badge-chip chip-cap">
                  Cap: {item.maxScouts ?? 8} Scouts
                </span>
                {item.cost && (
                  <span className="badge-chip chip-fee">
                    Fee: {item.cost.trim()}
                  </span>
                )}
                {item.counselor && (
                  <span className="badge-chip chip-counselor">
                    {item.counselor}
                  </span>
                )}
                {item.otherInfo && (
                  <span className="badge-chip chip-note">
                    {item.otherInfo}
                  </span>
                )}
              </div>

              <div className="badge-directory-card-footer">
                <span>2027 Camp Lawton Offering</span>
                <strong>Full requirements &amp; details →</strong>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="badge-directory-empty">
          <h3>No 2027 merit badges match your search.</h3>
          <p>Try clearing your filters or searching by a different topic, counselor, or period.</p>
          <button type="button" onClick={resetFilters} className="button button-secondary" style={{ marginTop: "16px" }}>
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
