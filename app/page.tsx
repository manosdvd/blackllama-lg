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
        <div className="hero-media">
          <img src="/images/home-amphitheater.webp" width={1920} height={1446} alt="Scouts and leaders gathered in the Camp Lawton amphitheater beneath ponderosa pines" fetchPriority="high" />
          <p className="hero-photo-note"><span>Camp today</span> Friendship, skills, and a week lived outdoors.</p>
          <figure className="hero-archive-card">
            <img src="/images/history/camp-lawton-early-gate.jpeg" width={570} height={420} alt="The early stone entrance gate to Camp Lawton" />
            <figcaption><span>From the camp archive</span> The early Boy Scouts gate</figcaption>
          </figure>
        </div>
        <div className="hero-shade" />
        <div className="hero-contours" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="hero-content">
          <p className="eyebrow"><span aria-hidden="true" /> Camp Lawton · Est. 1921</p>
          <h1>A century of camp.<br /><em>One unforgettable week.</em></h1>
          <p className="hero-copy">Bring your unit to the Santa Catalina Mountains for the kind of summer camp Scouts talk about for years. Everything leaders need to prepare for 2027 starts here.</p>
          <div className="hero-actions">
            <Link className="button" href="/guide/packing-list">Pack for the mountain</Link>
            <Link className="text-link" href="/history">Explore 100+ years <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-estamp" aria-hidden="true"><span>Santa Catalina Mountains</span><strong>1921</strong><small>Camp Lawton · Arizona</small></div>
        </div>
        <div className="session-strip" aria-label="2027 session dates">
          <div><span>2027 · Week 1</span><strong>Jun 1–5</strong><small>Tue–Sat · condensed</small></div>
          <div><span>2027 · Week 2</span><strong>Jun 6–12</strong><small>Sun–Sat</small></div>
          <div><span>2027 · Week 3</span><strong>Jun 13–19</strong><small>Sun–Sat</small></div>
          <div className="session-meta"><span>Leader field note</span><strong>Check-in 1–3 PM</strong><small>On your unit&apos;s arrival day</small></div>
        </div>
      </section>

      <section className="quick-links" aria-label="Leader shortcuts">
        <Link href="/guide/packing-list"><span>01</span><strong>Interactive packing list</strong><small>Check off, save & print</small></Link>
        <Link href="/guide"><span>02</span><strong>Read the full guide</strong><small>Search reviewed camp information</small></Link>
        <Link href="/merit-badges"><span>03</span><strong>Shape the badge program</strong><small>About the unit-interest survey</small></Link>
        <a href="#preregister"><span>04</span><strong>Tell us you’re interested</strong><small>Non-binding pre-registration</small></a>
      </section>

      <section className="home-tradition" aria-labelledby="camp-character-title">
        <div className="home-tradition-copy">
          <p className="section-kicker">This is Camp Lawton</p>
          <h2 id="camp-character-title">Pine needles underfoot. Camp songs after dark. Skills passed hand to hand.</h2>
          <p>Camp Lawton is not a resort and it is not a convention center. It is a working Scout camp: weathered cabins, patrol spirit, mountain air, and a staff ready to help young people try something real.</p>
          <div className="home-tradition-links">
            <Link className="text-link" href="/map">Walk the camp map <span aria-hidden="true">→</span></Link>
            <Link className="text-link" href="/history">Meet the generations before you <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="home-tradition-gallery" aria-label="Camp Lawton across generations">
          <figure className="tradition-photo tradition-photo-main">
            <img src="/images/home-disc-golf.webp" width={1400} height={1054} alt="Camp staff coaching a Scout at the disc golf basket" loading="lazy" />
            <figcaption><span>Learn by doing</span> Staff coach, Scouts take the shot.</figcaption>
          </figure>
          <figure className="tradition-photo tradition-photo-detail">
            <img src="/images/home-craft.webp" width={1200} height={903} alt="Scouts working together on colorful cord crafts at a camp table" loading="lazy" />
            <figcaption><span>Handicraft</span> Made at camp.</figcaption>
          </figure>
          <figure className="tradition-photo tradition-photo-archive">
            <img src="/images/history/camp-lawton-staff-1960.jpg" width={744} height={1024} alt="Camp Lawton staff standing together in the summer of 1960" loading="lazy" />
            <figcaption><span>Summer 1960</span> A staff tradition carried forward.</figcaption>
          </figure>
        </div>
      </section>

      <section className="section intro-section">
        <div className="section-kicker">Camp at a glance</div>
        <div className="intro-grid">
          <div>
            <h2>Small enough to know every Scout. Old enough to have traditions worth carrying.</h2>
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
        <img src="/images/home-night.webp" width={1800} height={1355} alt="Scouts gathered outside Camp Lawton’s historic dining hall after dark" loading="lazy" />
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
