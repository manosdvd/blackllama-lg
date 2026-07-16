"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ConditionsHud, FireSummaryCard, WeatherSummaryCard, useLiveConditions } from "../components/ConditionsPanel";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const guideSections = [
  {
    id: "arrival",
    title: "Arrival & check-in",
    summary: "Arrival windows, parking, forms, medication handoff, and the required safety briefing.",
    tags: "arrival paperwork vehicles medication",
    body: [
      "Week 1 arrives Tuesday; Weeks 2 and 3 arrive Sunday. Check-in is 1:00–3:00 PM.",
      "Back vehicles into marked spaces. Vehicles are not permitted beyond the designated parking area.",
      "Bring a signed unit roster, current health forms, accommodation information, and medications in original labeled containers.",
      "All Scouts and leaders attend the 3:00 PM safety briefing.",
    ],
  },
  {
    id: "policies",
    title: "Camp policies",
    summary: "National Forest requirements, Leave No Trace, vehicles, wildlife, and prohibited items.",
    tags: "policies usfs leave no trace fire wildlife",
    body: [
      "Camp Lawton operates on National Forest land under a USFS Special Use Permit; permit conditions prevail.",
      "Stay on established trails, pack out waste, never feed wildlife, and store food and scented items as directed.",
      "No digging, trenching, or staking without Camp Ranger approval.",
      "Personal firearms, fireworks, bows, arrows, and range equipment are prohibited unless written approval is provided.",
    ],
  },
  {
    id: "health",
    title: "Health, safety & youth protection",
    summary: "Medical forms, buddy system, two-deep leadership, emergency procedures, and reporting.",
    tags: "health safety youth protection buddy medical emergency",
    body: [
      "All adults must be registered Scouting America members with current Youth Protection Training.",
      "Two-deep leadership and the buddy system are required. One-on-one adult/youth contact is prohibited.",
      "The Camp Health Officer is on duty throughout each session; first aid kits are available at program areas.",
      "Report serious incidents immediately to the Camp Director.",
    ],
  },
  {
    id: "packing",
    title: "Packing & paperwork",
    summary: "The high-priority documents and practical items leaders should verify before departure.",
    tags: "packing paperwork forms roster checklist",
    body: [
      "Organize the roster, current health records, emergency contacts, accommodation information, and medication materials required by final registration and check-in guidance.",
      "Confirm the current adult registration and training documentation required for the session.",
      "Plan to carry all gear from the parking area to the assigned campsite.",
      "A sleeping pad and sleeping bag are recommended for the wooden sleeping platforms.",
    ],
  },
  {
    id: "leaders",
    title: "Leader logistics",
    summary: "Daily meetings, camp communications, equipment returns, and departure clearance.",
    tags: "leader spl meeting communication departure radio",
    body: [
      "SPL and leader meetings are held daily at 12:55 PM for 30 minutes.",
      "Cell service may be limited. Camp communications are the primary channel while on site.",
      "Return issued radios, first aid kits, and site keys before departure.",
      "Complete campsite inspection, retrieve medications, and receive departure clearance before leaving.",
    ],
  },
  {
    id: "program",
    title: "2027 program input",
    summary: "How unit interest can help Camp Lawton shape a strong 2027 program.",
    tags: "program merit badges interest survey activities",
    body: [
      "The merit badge list and class schedule are still in development.",
      "Unit interest helps staff prioritize instructors, equipment, and appropriate capacity.",
      "Survey selections do not create a class, reserve a seat, or guarantee completion.",
      "Final authorized program information will replace draft planning material when it is ready.",
    ],
  },
];

type CampNotice = { id: string; title: string; summary: string; urgency: string; source: string; updatedAt: string };

export default function Home() {
  const [guideQuery, setGuideQuery] = useState("");
  const [campNotice, setCampNotice] = useState<CampNotice | null>(null);
  const conditionsState = useLiveConditions();

  useEffect(() => {
    fetch("/api/notices")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((notices: CampNotice[]) => setCampNotice(notices[0] ?? null))
      .catch(() => setCampNotice(null));
  }, []);

  const filteredGuide = useMemo(() => {
    const query = guideQuery.toLowerCase().trim();
    if (!query) return guideSections;
    return guideSections.filter((item) => `${item.title} ${item.summary} ${item.tags} ${item.body.join(" ")}`.toLowerCase().includes(query));
  }, [guideQuery]);
  return (
    <main>
      <ConditionsHud state={conditionsState} />
      
      <div className="notice-bar" role="status">
        <span className="notice-dot" aria-hidden="true" />
        <strong>{campNotice?.title ?? "Planning notice"}</strong>
        <span>{campNotice?.summary ?? "2027 program planning is underway. Share your unit’s interests while the final badge list and schedule are developed."}</span>
        <a href="#alerts">View notices</a>
      </div>

      <SiteHeader current="/" />

      <section className="hero" id="top">
        <img src="/images/camp-hero.webp" width={2560} height={485} alt="The wooden Camp Lawton entrance sign among ponderosa pines" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Catalina Council · Scouting America</p>
          <h1>Prepare for a week<br />that stays with them.</h1>
          <p className="hero-copy">Everything leaders need to plan a safe, memorable 2027 summer camp in the Catalina Mountains.</p>
          <div className="hero-actions">
            <Link className="button" href="/guide/packing-list">Open the packing checklist</Link>
            <Link className="text-link" href="/pre-register">Help shape the program <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="session-strip" aria-label="2027 session dates">
          <div><span>Week 1</span><strong>Jun 1–5</strong><small>Tue–Sat · condensed</small></div>
          <div><span>Week 2</span><strong>Jun 6–12</strong><small>Sun–Sat</small></div>
          <div><span>Week 3</span><strong>Jun 13–19</strong><small>Sun–Sat</small></div>
          <div className="session-meta"><span>Check-in</span><strong>1–3 PM</strong><small>Arrival day</small></div>
        </div>
      </section>

      <section className="quick-links" aria-label="Leader shortcuts">
        <Link href="/guide/packing-list"><span>01</span><strong>Interactive packing list</strong><small>Check off, save & print</small></Link>
        <Link href="/guide"><span>02</span><strong>Read the full guide</strong><small>Search reviewed camp information</small></Link>
        <Link href="/merit-badges"><span>03</span><strong>Shape the badge program</strong><small>About the unit-interest survey</small></Link>
        <a href="#preregister"><span>04</span><strong>Tell us you’re interested</strong><small>Non-binding pre-registration</small></a>
      </section>

      <section className="section intro-section">
        <div className="section-kicker">Camp at a glance</div>
        <div className="intro-grid">
          <div>
            <h2>A small camp with room for a big experience.</h2>
            <p>Camp Lawton combines hands-on outdoor learning, mountain adventure, camp traditions, and the close-knit character of a century-old Scout camp.</p>
          </div>
          <div className="fact-grid">
            <div><strong>1921</strong><span>Camp established</span></div>
            <div><strong>2027</strong><span>Program taking shape</span></div>
            <div><strong>Your input</strong><span>Guides staff planning</span></div>
            <div><strong>USFS</strong><span>National Forest land</span></div>
          </div>
        </div>
        <div className="critical-card">
          <div className="critical-label">Read before arrival</div>
          <div className="critical-content">
            <h3>Four details that change how you pack and plan</h3>
            <ul>
              <li><strong>No aquatics:</strong> Camp Lawton has no pool or waterfront.</li>
              <li><strong>Carry-in gear:</strong> Vehicles remain in the designated parking area.</li>
              <li><strong>Fire restrictions:</strong> Conditions can change without warning; always plan a no-flame alternative.</li>
              <li><strong>Medications:</strong> Prescription medications go to the Camp Health Officer at check-in.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section guide-section" id="guide">
        <div className="section-heading">
          <div><div className="section-kicker">Leader’s guide</div><h2>Find the answer. Keep planning.</h2></div>
          <label className="search-box">
            <span className="sr-only">Search the leader’s guide</span>
            <span aria-hidden="true">⌕</span>
            <input value={guideQuery} onChange={(event) => setGuideQuery(event.target.value)} placeholder="Search forms, fire, arrival…" />
          </label>
        </div>
        <div className="guide-layout">
          <div className="guide-list">
            {filteredGuide.map((item) => (
              <details key={item.id} className="guide-card">
                <summary>
                  <span><strong>{item.title}</strong><small>{item.summary}</small></span>
                  <span className="round-arrow" aria-hidden="true">+</span>
                </summary>
                <ul>{item.body.map((line) => <li key={line}>{line}</li>)}</ul>
                {item.id === "arrival" && <Link className="guide-article-link" href="/guide/arrival-and-check-in">Read the reviewed article →</Link>}
                {item.id === "packing" && <Link className="guide-article-link" href="/guide/packing-list">Build your packing checklist →</Link>}
              </details>
            ))}
            {filteredGuide.length === 0 && <p className="empty-state">No guide sections match “{guideQuery}”. Try a broader term.</p>}
          </div>
          <aside className="photo-card">
            <img src="/images/camp-office.webp" width={1600} height={900} alt="Historic log cabin camp office beneath tall pine trees" loading="lazy" />
            <div><span>On the mountain since 1921</span><p>Historic buildings, shaded campsites, and a program designed around personal attention.</p></div>
          </aside>
        </div>
      </section>

      

      <section className="story-band">
        <img src="/images/camp-story.webp" width={2000} height={1505} alt="Camp Lawton cabins arranged around a campsite fire ring" loading="lazy" />
        <div className="story-copy">
          <div className="section-kicker">A century on the mountain</div>
          <h2>Built by many hands.<br />Carried by generations.</h2>
          <p>From a $400 civic project in 1921 to a camp repeatedly renewed by fire, snow, and service, Camp Lawton’s story is written into every spring, cabin, and trail.</p>
          <Link href="/history" className="text-link">Walk the interactive timeline <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="section alerts-section" id="alerts">
        <div className="section-heading">
          <div><div className="section-kicker">Conditions & notices</div><h2>Know before you go.</h2></div>
          <span className="prototype-pill">Source status shown</span>
        </div>
        <div className="alert-grid">
          <WeatherSummaryCard state={conditionsState} />
          <FireSummaryCard state={conditionsState} />
          <article><span className="alert-icon green">i</span><div><small>{campNotice?.source ?? "Camp Lawton staff"}</small><h3>{campNotice?.title ?? "2027 program planning is underway"}</h3><p>{campNotice?.summary ?? "The badge list and class schedule are not yet final. Share unit interest now and use only later authorized program details for individual planning."}</p></div></article>
        </div>
      </section>

      <section className="preregister" id="preregister">
        <div className="preregister-image"><img src="/images/camp-program.webp" width={1594} height={1200} alt="Scouts and leaders taking part in an outdoor camp activity" loading="lazy" /></div>
        <div className="preregister-copy">
          <div className="section-kicker">Plan with us</div>
          <h2>Help shape the 2027 program.</h2>
          <p>Share your unit’s estimated attendance and program interests. This early signal helps camp staff plan staffing and program capacity.</p>
          <div className="disclaimer"><strong>Planning only</strong><span>This is not official registration, does not reserve a campsite or badge seat, and does not collect payment. Official registration will be available through Black Pug in spring.</span></div>
          <div className="preregister-features"><span>Compare all four 2027 sessions.</span><span>Share aggregate youth and adult estimates.</span><span>Rank merit badge demand without claiming seats.</span><span>Save progress privately in this browser.</span></div>
          <Link className="button" href="/pre-register">Start the planning survey</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
