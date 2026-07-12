"use client";

import Link from "next/link";
import { useState } from "react";

type Offering = {
  id: string;
  title: string;
  area: string;
  time: string;
  start: number;
  end: number;
  note: string;
};

const offerings: Offering[] = [
  { id: "archery", title: "Archery", area: "Range", time: "8:15–9:05 AM", start: 815, end: 905, note: "Certified range supervision" },
  { id: "basketry", title: "Basketry", area: "Handicraft", time: "8:15–9:05 AM", start: 815, end: 905, note: "Material fee may apply" },
  { id: "first-aid", title: "First Aid", area: "Scoutcraft", time: "9:15–10:05 AM", start: 915, end: 1005, note: "Bring current handbook" },
  { id: "nature", title: "Nature", area: "Nature Lodge", time: "10:15–11:05 AM", start: 1015, end: 1105, note: "Outdoor fieldwork" },
  { id: "astronomy", title: "Astronomy", area: "Nature Lodge", time: "1:35–2:25 PM", start: 1335, end: 1425, note: "Evening observation component" },
  { id: "navigation", title: "Navigation Skills", area: "Scoutcraft", time: "2:35–3:25 PM", start: 1435, end: 1525, note: "Compass recommended" },
];

const travelTimes: Record<string, Record<string, number>> = {
  "Range": { "Handicraft": 15, "Scoutcraft": 10, "Nature Lodge": 10 },
  "Handicraft": { "Range": 15, "Scoutcraft": 5, "Nature Lodge": 10 },
  "Scoutcraft": { "Range": 10, "Handicraft": 5, "Nature Lodge": 5 },
  "Nature Lodge": { "Range": 10, "Handicraft": 10, "Scoutcraft": 5 },
};

function getTravelTime(area1: string, area2: string): number {
  if (area1 === area2) return 0;
  return travelTimes[area1]?.[area2] || 10;
}

export default function MeritBadgesPage() {
  const [area, setArea] = useState("All areas");
  const [plan, setPlan] = useState<string[]>(["first-aid", "astronomy"]);

  const filteredOfferings = area === "All areas" ? offerings : offerings.filter((item) => item.area === area);
  
  const selectedOfferings = offerings
    .filter((item) => plan.includes(item.id))
    .sort((a, b) => a.start - b.start);
    
  const conflicts = selectedOfferings.filter((item, index) => {
    const next = selectedOfferings[index + 1];
    if (!next) return false;
    
    if (item.end > next.start) return true; // Strict overlap
    
    const toMins = (time: number) => Math.floor(time / 100) * 60 + (time % 100);
    const timeBetween = toMins(next.start) - toMins(item.end);
    const requiredTravel = getTravelTime(item.area, next.area);
    
    return timeBetween < requiredTravel; // Travel constraint
  });

  function togglePlan(id: string) {
    setPlan((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Camp Lawton home">
          <img src="/images/CLlogo.png" alt="CL Logo" className="brand-mark" />
          <span><strong>Camp Lawton</strong><small>Leader Hub · 2027</small></span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/">Guide</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/merit-badges" aria-current="page">Programs</Link>
          <Link href="/#alerts">Alerts</Link>
        </nav>
      </header>

      <section className="section program-section">
        <div className="section-heading">
          <div><div className="section-kicker">Program explorer</div><h2>Build a better day for every Scout.</h2></div>
          <p className="heading-note">Prototype offerings show how the planner will work. The final badge catalog and capacities will be published separately.</p>
        </div>
        <div className="planner-grid">
          <div className="catalog">
            <div className="catalog-tools">
              <strong>Program preview</strong>
              <select value={area} onChange={(event) => setArea(event.target.value)} aria-label="Filter by program area">
                {["All areas", ...Array.from(new Set(offerings.map((item) => item.area)))].map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <div className="offering-list">
              {filteredOfferings.map((item) => {
                const selected = plan.includes(item.id);
                return (
                  <article className={`offering ${selected ? "selected" : ""}`} key={item.id}>
                    <div><span>{item.area}</span><h3>{item.title}</h3><p>{item.time} · {item.note}</p></div>
                    <button onClick={() => togglePlan(item.id)} aria-pressed={selected}>{selected ? "Added" : "Add"}</button>
                  </article>
                );
              })}
            </div>
          </div>
          <aside className="my-plan">
            <div className="plan-title"><span>My sample plan</span><strong>{selectedOfferings.length} selections</strong></div>
            {conflicts.length > 0 && <div className="conflict" role="alert"><strong>Schedule conflict</strong><span>{conflicts[0].title} overlaps another selection. Remove one or choose another session.</span></div>}
            <div className="plan-list">
              {selectedOfferings.length === 0 && <p className="empty-state">Add programs to begin a sample plan.</p>}
              {selectedOfferings.map((item) => (
                <div key={item.id}>
                  <time>{item.time}</time>
                  <span><strong>{item.title}</strong><small>{item.area}</small></span>
                  <button aria-label={`Remove ${item.title}`} onClick={() => togglePlan(item.id)}>×</button>
                </div>
              ))}
            </div>
            <button className="button plan-button" disabled={selectedOfferings.length === 0 || conflicts.length > 0}>Review conflict-free plan</button>
          </aside>
        </div>
      </section>
    </main>
  );
}
