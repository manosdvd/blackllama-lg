"use client";

import { useEffect, useMemo, useState } from "react";
import {
  historyCategories,
  historyEras,
  historyEvents,
  type HistoryCategory,
  type HistoryEraId,
} from "../lib/camp-history";

type CategoryFilter = "all" | HistoryCategory;

const categoryNames: Record<HistoryCategory, string> = {
  origins: "Origins",
  infrastructure: "Built by hand",
  tradition: "Tradition",
  resilience: "Resilience",
  renewal: "Renewal",
};

export default function HistoryTimeline() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [openEvent, setOpenEvent] = useState<string | null>("camp-founded");
  const [activeEra, setActiveEra] = useState<HistoryEraId>("finding");

  const normalizedQuery = query.trim().toLowerCase();
  const visibleEvents = useMemo(() => historyEvents.filter((event) => {
    const matchesCategory = category === "all" || event.category === category;
    const haystack = `${event.year} ${event.title} ${event.summary} ${event.detail} ${event.significance}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  }), [category, normalizedQuery]);

  const visibleEras = historyEras.map((era) => ({
    ...era,
    events: visibleEvents.filter((event) => event.era === era.id),
  })).filter((era) => era.events.length > 0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-history-era]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      const nearest = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      const era = nearest?.target.getAttribute("data-history-era") as HistoryEraId | null;
      if (era) setActiveEra(era);
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.1] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [category, normalizedQuery]);

  const activeIndex = Math.max(0, visibleEras.findIndex((era) => era.id === activeEra));
  const progress = visibleEras.length > 1 ? (activeIndex / (visibleEras.length - 1)) * 100 : 0;

  return <>
    <section className="history-introduction" aria-labelledby="history-intro-title">
      <div className="history-intro-lead">
        <p className="section-kicker">A living inheritance</p>
        <h2 id="history-intro-title">The camp has never been a finished place.</h2>
        <p>Every spring, road, cabin, and custom records a choice: adapt to the mountain, care for the place, and leave it stronger for whoever climbs the ridge next.</p>
      </div>
      <div className="history-threads" aria-label="Themes across Camp Lawton history">
        <article>
          <span aria-hidden="true">01</span>
          <div><strong>Water</strong><p>The camp moved for it. Volunteers engineered it. Every generation has learned to conserve it.</p></div>
        </article>
        <article>
          <span aria-hidden="true">02</span>
          <div><strong>Service</strong><p>From road crews to roof repairs, the physical camp is a record of many hands at work.</p></div>
        </article>
        <article>
          <span aria-hidden="true">03</span>
          <div><strong>Belonging</strong><p>Local traditions, staff stories, and a widening program keep handing the camp forward.</p></div>
        </article>
      </div>
    </section>

    <section className="history-explorer" aria-labelledby="history-explorer-title">
      <header className="history-explorer-heading">
        <div>
          <p className="section-kicker">1910–2026</p>
          <h2 id="history-explorer-title">Follow the trail through time.</h2>
        </div>
        <p>Filter by a recurring theme, search for a person or place, then open any milestone for the deeper story.</p>
      </header>

      <div className="history-controls">
        <div className="history-filters" aria-label="Filter timeline by theme">
          {historyCategories.map((item) => <button
            type="button"
            key={item.id}
            className={category === item.id ? "active" : ""}
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
          >{item.label}</button>)}
        </div>
        <label className="history-search">
          <span className="sr-only">Search Camp Lawton history</span>
          <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.2 4.2" /></svg>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names, places, years…" />
          {query && <button type="button" aria-label="Clear history search" onClick={() => setQuery("")}>×</button>}
        </label>
      </div>

      <div className="history-results-note" role="status" aria-live="polite">
        <span>{visibleEvents.length} {visibleEvents.length === 1 ? "milestone" : "milestones"}</span>
        {(category !== "all" || normalizedQuery) && <button type="button" onClick={() => { setCategory("all"); setQuery(""); }}>Reset view</button>}
      </div>

      {visibleEvents.length > 0 ? <div className="history-timeline-shell">
        <aside className="history-era-index" aria-label="Timeline eras">
          <p>On this trail</p>
          <div className="history-era-track" aria-hidden="true"><span style={{ height: `${progress}%` }} /></div>
          <nav>
            {visibleEras.map((era) => <a
              key={era.id}
              href={`#era-${era.id}`}
              className={activeEra === era.id ? "active" : ""}
              aria-current={activeEra === era.id ? "location" : undefined}
              onClick={() => setActiveEra(era.id)}
            ><i aria-hidden="true" /><span><small>{era.range}</small><strong>{era.shortTitle}</strong></span></a>)}
          </nav>
          <div className="history-index-seal" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" />
              <path d="M17 68 38 38l12 16 10-13 24 27M28 70h46" />
              <path d="M38 77c7-4 17-4 24 0M42 84c5-3 11-3 16 0" />
            </svg>
            <span>105 years<br />on the mountain</span>
          </div>
        </aside>

        <div className="history-era-list">
          {visibleEras.map((era, eraIndex) => <section
            className="history-era"
            id={`era-${era.id}`}
            data-history-era={era.id}
            key={era.id}
          >
            <header className="history-era-heading">
              <span aria-hidden="true">0{eraIndex + 1}</span>
              <div><p>{era.range}</p><h3>{era.title}</h3><div>{era.copy}</div></div>
            </header>
            <ol className="history-event-list">
              {era.events.map((event) => {
                const isOpen = openEvent === event.id;
                const detailId = `history-detail-${event.id}`;
                return <li id={`year-${event.id}`} key={event.id} data-category={event.category}>
                  <div className="history-spine" aria-hidden="true"><span /></div>
                  <article className={`history-event ${isOpen ? "open" : ""}`}>
                    <button
                      className="history-event-summary"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={detailId}
                      onClick={() => setOpenEvent(isOpen ? null : event.id)}
                    >
                      <time dateTime={String(Math.floor(event.sortYear))}>{event.year}</time>
                      <div>
                        <span className="history-category"><i aria-hidden="true" />{categoryNames[event.category]}</span>
                        <h4>{event.title}</h4>
                        <p>{event.summary}</p>
                      </div>
                      <span className="history-toggle" aria-hidden="true"><i /><i /></span>
                    </button>
                    <div className={`history-event-detail${event.image ? " has-image" : ""}`} id={detailId} aria-hidden={!isOpen}>
                      <div className="history-detail-copy">
                        <p>{event.detail}</p>
                        <div className="history-significance">
                          <span>Why it matters</span>
                          <p>{event.significance}</p>
                        </div>
                        <small className="history-detail-sources">
                          <span><i aria-hidden="true" /> Camp Lawton history collection synthesis</span>
                          {event.sources?.map((source) => <a
                            key={source.href}
                            href={source.href}
                            target="_blank"
                            rel="noreferrer"
                          >{source.label} <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>)}
                        </small>
                      </div>
                      {event.image && <figure>
                        <img
                          src={event.image.src}
                          alt={event.image.alt}
                          loading="lazy"
                          style={{ objectFit: event.image.objectFit, objectPosition: event.image.objectPosition }}
                        />
                        <figcaption>{event.image.caption} <span>{event.image.label ?? "Present-day photo · 2026"}</span></figcaption>
                      </figure>}
                    </div>
                  </article>
                </li>;
              })}
            </ol>
          </section>)}
        </div>
      </div> : <div className="history-empty">
        <svg aria-hidden="true" viewBox="0 0 100 60"><path d="M4 52 29 17l16 21L57 23l38 29" /><path d="M17 55h65" /></svg>
        <h3>No milestones found on that trail.</h3>
        <p>Try a broader search or return to the complete history.</p>
        <button type="button" className="button" onClick={() => { setCategory("all"); setQuery(""); }}>Show the full timeline</button>
      </div>}
    </section>
  </>;
}
