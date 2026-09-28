"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ConditionsHud, FireSummaryCard, WeatherSummaryCard, useLiveConditions } from "../components/ConditionsPanel";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

import { OFFICIAL_REGISTRATION_URL, WEEK1_REGISTRATION_URL, WEEK2_REGISTRATION_URL, MEDICAL_FORM_URL, STAFF_APPLICATION_URL } from "../lib/registration";
import { PREPARATION_TIMELINE } from "../data/timeline-data";

const guideSections = [
  {
    id: "purpose",
    title: "Camp purpose & outcomes",
    summary: "The big picture, core values, and behavioral outcomes the camp experience is designed to strengthen.",
    tags: "welcome purpose mission goals outcomes values youth development PD-101",
    href: "/guide/camp-purpose-and-outcomes",
    body: [
      "Camp combines advancement, outdoor adventure, service, fellowship, and unit growth.",
      "Participants practice leadership, responsible safety habits, confidence, service, and care for shared spaces.",
      "Staff supplement the unit program while unit leaders continue to know and guide their Scouts.",
    ],
  },
  {
    id: "arrival",
    title: "Arrival & check-in",
    summary: "Arrival windows, parking, forms, medication handoff, and the required safety briefing.",
    tags: "arrival paperwork vehicles medication check-in Sunday",
    href: "/guide/arrival-and-check-in",
    body: [
      "Week 1 starts Sunday, June 6; Week 2 starts Sunday, June 13. Both sessions start at 2:00 PM MST.",
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
    href: "/guide/camp-policies",
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
    href: "/guide/health-safety-and-youth-protection",
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
    href: "/guide/packing-list",
    body: [
      "Organize the roster, current health records (Parts A, B, C), emergency contacts, and medications in original labeled containers.",
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
    href: "/guide/daily-camp-life",
    body: [
      "SPL and leader meetings are held daily at 12:55 PM for 30 minutes.",
      "Cell service may be limited. Camp communications are the primary channel while on site.",
      "Return issued radios, first aid kits, and site keys before departure.",
      "Complete campsite inspection, retrieve medications, and receive departure clearance before leaving.",
    ],
  },
  {
    id: "registration",
    title: "2027 Registration & fees",
    summary: "Official session dates, in-council and out-of-council fees, and early bird discounts.",
    tags: "registration fees black pug early bird camperships dates",
    href: "/guide/dates-fees-and-registration",
    body: [
      "Week 1 is June 6–12, 2027; Week 2 is June 13–19, 2027 (150 youth limit per session).",
      "In-council fee is $400/Scout ($200 before 12/31/26; $300 before 3/31/27 with Early Bird credits).",
      "Out-of-council fee is $450/Scout ($50 discount before 12/31/26; $25 discount before 3/31/27).",
      "Adult leader fee is $100. Merit badge registration opens February 1, 2027.",
    ],
  },
];

type CampNotice = { id: string; title: string; summary: string; urgency: string; source: string; updatedAt: string };

export default function Home() {
  const [guideQuery, setGuideQuery] = useState("");
  const [campNotice, setCampNotice] = useState<CampNotice | null>(null);
  const [activeTrack, setActiveTrack] = useState<"considering" | "preparing">("considering");
  const [timelineFilter, setTimelineFilter] = useState<"all" | "leader" | "parent" | "scout">("all");
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

  const filteredMilestones = useMemo(() => {
    if (timelineFilter === "all") return PREPARATION_TIMELINE;
    return PREPARATION_TIMELINE.filter((m) => m.responsible.includes(timelineFilter));
  }, [timelineFilter]);

  return (
    <main>
      <ConditionsHud state={conditionsState} />

      <div className="notice-bar" role="status">
        <span className="notice-dot" aria-hidden="true" />
        <strong>2027 Registration Open</strong>
        <span>Official registration for Summer Camp 2027 at Camp Lawton is now open on Black Pug.</span>
        <a href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">Register now ↗</a>
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
            <a className="button" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">Register for 2027 ↗</a>
            <Link className="button button-secondary" href="/guide/packing-list">Pack for the mountain</Link>
            <Link className="text-link" href="/history">Explore 100+ years <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-estamp" aria-hidden="true"><span>Santa Catalina Mountains</span><strong>1921</strong><small>Camp Lawton · Arizona</small></div>
        </div>
        <div className="session-strip" aria-label="2027 session dates">
          <div>
            <span>2027 · Week 1</span>
            <strong>Jun 6–12</strong>
            <small>Sun–Sat · 150 youth limit</small>
            <a href={WEEK1_REGISTRATION_URL} target="_blank" rel="noreferrer" className="session-strip-link">Save a Spot ↗</a>
          </div>
          <div>
            <span>2027 · Week 2</span>
            <strong>Jun 13–19</strong>
            <small>Sun–Sat · 150 youth limit</small>
            <a href={WEEK2_REGISTRATION_URL} target="_blank" rel="noreferrer" className="session-strip-link">Save a Spot ↗</a>
          </div>
          <div>
            <span>Early Bird</span>
            <strong>Dec 31, 2026</strong>
            <small>Save up to $200 (In-Council $200 Paid In Full)</small>
            <Link href="/register" className="session-strip-link">View Fees →</Link>
          </div>
          <div className="session-meta">
            <span>Leader field note</span>
            <strong>Check-in 2:00 PM</strong>
            <small>Sunday arrival · checkout Sat 10 AM · Limit 1 per unit</small>
            <Link href="/guide/arrival-and-check-in" className="session-strip-link">Arrival Guide →</Link>
          </div>
        </div>
      </section>

      <section className="quick-links" aria-label="Leader shortcuts">
        <a href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer"><span>01</span><strong>Register for 2027</strong><small>Official council registration site ↗</small></a>
        <Link href="/register"><span>02</span><strong>Fees &amp; early bird credits</strong><small>In-council &amp; out-of-council rates</small></Link>
        <Link href="/merit-badges"><span>03</span><strong>Merit badge program</strong><small>Catalog &amp; Feb 1 open date</small></Link>
        <Link href="/guide/packing-list"><span>04</span><strong>Interactive packing list</strong><small>Check off, save &amp; print</small></Link>
      </section>

      <section className="two-track-funnel" id="camp-pathways" aria-label="Camp Lawton pathways">
        <div className="track-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === "considering"}
            onClick={() => setActiveTrack("considering")}
            className={`track-tab ${activeTrack === "considering" ? "active" : ""}`}
          >
            <span className="track-badge">Track A · Prospective Units</span>
            <strong>Considering Camp Lawton</strong>
            <small>Why bring your troop to 7,900 feet this summer</small>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTrack === "preparing"}
            onClick={() => setActiveTrack("preparing")}
            className={`track-tab ${activeTrack === "preparing" ? "active" : ""}`}
          >
            <span className="track-badge">Track B · Registered Units</span>
            <strong>Already Registered · Getting Ready</strong>
            <small>Prep timeline, medical forms, parent guide &amp; packing</small>
          </button>
        </div>

        {activeTrack === "considering" ? (
          <div className="track-content considering-track" role="tabpanel">
            <div className="track-intro">
              <p className="section-kicker">High-Altitude Mountain Camp · 7,900 Feet</p>
              <h2>Cool pine breezes. Zero desert heat. Real mountain scoutcraft.</h2>
              <p className="track-lead">
                High in the Santa Catalina Mountains on Mt. Lemmon, Camp Lawton is an escape from 105°F desert heat into 75°F pine-shaded days and crisp 50°F campfire evenings. With strictly 150-youth capped sessions, your Scouts won&apos;t get lost in mega-camp crowds. Experience natural rock climbing, marksmanship, dark-sky astronomy, and patrol traditions that build genuine leadership.
              </p>
            </div>

            <div className="considering-features-grid">
              <div className="feature-highlight-card">
                <span className="feature-num">01</span>
                <h4>Intimate 150-Youth Capped Sessions</h4>
                <p>No 50-person classes. Small merit badge cohorts guarantee personal attention from enthusiastic staff and tight patrol camaraderie.</p>
              </div>
              <div className="feature-highlight-card">
                <span className="feature-num">02</span>
                <h4>Early Bird: In-Council $200 Paid In Full</h4>
                <p>Register before 12/31/26: pay $200 (including deposit) and receive a $200 credit ($400 value). Out-of-council youth save $50.</p>
              </div>
              <div className="feature-highlight-card">
                <span className="feature-num">03</span>
                <h4>Real Badges &amp; 2027 Pirate Crew Adventures</h4>
                <p>Natural granite rock climbing, dark-sky astronomy, pioneering, and our 2027 Pirate theme: Campsites are Ships, Dining Hall is the Galley!</p>
              </div>
            </div>

            <div className="day-in-the-life-box">
              <div className="day-heading">
                <span className="section-kicker">A Day on the Mountain</span>
                <h3>A Day in the Life at Camp Lawton</h3>
                <p>A typical summer day lived outdoors at 7,900 feet:</p>
              </div>
              <div className="day-schedule-grid">
                <div className="day-time-block">
                  <span className="time">7:00 AM</span>
                  <strong>Reveille &amp; Mountain Air</strong>
                  <p>Wake up to crisp 55°F pine breezes, birdsong, and campsite patrol prep.</p>
                </div>
                <div className="day-time-block">
                  <span className="time">7:45 AM</span>
                  <strong>Morning Flag &amp; Breakfast</strong>
                  <p>Troop assembly at the parade field, flag ceremony, and hot breakfast in the Galley.</p>
                </div>
                <div className="day-time-block">
                  <span className="time">9:00 AM – 12:00 PM</span>
                  <strong>Morning Merit Badge Blocks</strong>
                  <p>Hands-on instruction across Scoutcraft, Climbing, Shooting Sports, and Ecology.</p>
                </div>
                <div className="day-time-block">
                  <span className="time">12:30 PM</span>
                  <strong>Lunch &amp; 12:55 PM Leader Huddle</strong>
                  <p>Dining hall meal, followed by the daily 30-minute SPL and leader coordination meeting.</p>
                </div>
                <div className="day-time-block">
                  <span className="time">1:30 PM – 4:30 PM</span>
                  <strong>Afternoon Badges &amp; Open Program</strong>
                  <p>Afternoon class blocks, open archery/rifle practice, handicraft tooling, and patrol hikes.</p>
                </div>
                <div className="day-time-block">
                  <span className="time">5:45 PM</span>
                  <strong>Evening Retreat &amp; Dinner</strong>
                  <p>Lowering the colors, camp announcements, evening meal, and clean-up rotation.</p>
                </div>
                <div className="day-time-block">
                  <span className="time">7:00 PM – 8:15 PM</span>
                  <strong>Twilight Games &amp; Tribe Service</strong>
                  <p>Campwide patrol games, disc golf, and Tribe of Papago return-camper service projects.</p>
                </div>
                <div className="day-time-block highlight">
                  <span className="time">8:30 PM</span>
                  <strong>Campfire Bowl &amp; Stargazing</strong>
                  <p>Historic amphitheater campfires with troop skits and songs, followed by dark-sky astronomy.</p>
                </div>
                <div className="day-time-block">
                  <span className="time">10:00 PM</span>
                  <strong>Taps &amp; Mountain Quiet</strong>
                  <p>Quiet hours and restful sleep on wooden tent platforms beneath tall ponderosa pines.</p>
                </div>
              </div>
            </div>

            <div className="track-actions">
              <a className="button button-large" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
                Claim Your Campsite on Black Pug ↗
              </a>
              <a className="button button-secondary" href={WEEK1_REGISTRATION_URL} target="_blank" rel="noreferrer">
                Save a Spot — Week 1 ↗
              </a>
              <a className="button button-secondary" href={WEEK2_REGISTRATION_URL} target="_blank" rel="noreferrer">
                Save a Spot — Week 2 ↗
              </a>
              <Link className="button button-secondary" href="/register">
                View All Fees &amp; Discounts →
              </Link>
            </div>
          </div>
        ) : (
          <div className="track-content preparing-track" role="tabpanel">
            <div className="track-intro">
              <p className="section-kicker">Departure-Ready Roadmap</p>
              <h2>Step-by-Step Camp Preparation Timeline</h2>
              <p className="track-lead">
                Follow key deadlines from early bird registration to Sunday arrival. Filter by role to view exact tasks for Unit Leaders, Parents, or Scouts.
              </p>
            </div>

            <div className="timeline-filter-bar">
              <span>Filter By:</span>
              {[
                ["all", "All Milestones"],
                ["leader", "Unit Leaders"],
                ["parent", "Parents & Families"],
                ["scout", "Scouts"],
              ].map(([filterKey, filterLabel]) => (
                <button
                  key={filterKey}
                  type="button"
                  className={`filter-chip ${timelineFilter === filterKey ? "active" : ""}`}
                  onClick={() => setTimelineFilter(filterKey as typeof timelineFilter)}
                >
                  {filterLabel}
                </button>
              ))}
            </div>

            <div className="milestones-timeline-grid">
              {filteredMilestones.map((milestone) => (
                <article key={milestone.id} className="milestone-card">
                  <div className="milestone-header">
                    <span className="milestone-timeframe">{milestone.timeframe}</span>
                    <div className="milestone-roles">
                      {milestone.responsible.map((r) => (
                        <span key={r} className={`role-tag ${r}`}>
                          {r === "leader" ? "Leader" : r === "parent" ? "Parent" : "Scout"}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3>{milestone.title}</h3>
                  <p className="milestone-summary">{milestone.summary}</p>
                  <ul className="milestone-bullets">
                    {milestone.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                  <div className="milestone-action">
                    {milestone.actionUrl.startsWith("http") ? (
                      <a href={milestone.actionUrl} target="_blank" rel="noreferrer" className="text-link">
                        {milestone.actionText}
                      </a>
                    ) : (
                      <Link href={milestone.actionUrl} className="text-link">
                        {milestone.actionText}
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="departure-cards-grid">
              <div className="prep-quick-card">
                <h4>Medical Forms (Parts A, B &amp; C)</h4>
                <p>Annual physical signed by a licensed healthcare provider within 12 months is mandatory for all youth and adults.</p>
                <a className="button button-small" href={MEDICAL_FORM_URL} target="_blank" rel="noreferrer">
                  Download Form ABC (PDF) ↗
                </a>
              </div>
              <div className="prep-quick-card">
                <h4>Interactive Packing List</h4>
                <p>Track mountain gear on this device with checked progress saved locally, gear warnings, and printable format.</p>
                <Link className="button button-small button-secondary" href="/guide/packing-list">
                  Open Packing Checklist →
                </Link>
              </div>
              <div className="prep-quick-card">
                <h4>Parent Portal &amp; Roster Lookup</h4>
                <p>Manage your unit reservation, submit individual Scout information, and pay in installments on Black Pug.</p>
                <a className="button button-small button-secondary" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
                  Open Parent Portal ↗
                </a>
              </div>
            </div>
          </div>
        )}
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

      <section className="section why-camp-section" id="why-camp-lawton">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Experience the Mountain</p>
            <h2>Why Camp Lawton? Four Mountain Reasons to Bring Your Troop in 2027</h2>
          </div>
          <p className="heading-note">
            High in the Santa Catalina Mountains on Mt. Lemmon, Camp Lawton delivers an authentic, close-knit Scouting experience that youth remember for a lifetime.
          </p>
        </div>

        <div className="why-camp-grid">
          <div className="why-camp-card">
            <span className="card-num">01</span>
            <h3>Beat the Desert Heat at 7,900 Feet</h3>
            <p>
              When summer temperatures in Tucson and Phoenix top 100°F+, Camp Lawton rests high in the Coronado National Forest. Enjoy 75°F daytime breezes under towering Ponderosa pines and crisp 50°F nights around the campfire.
            </p>
          </div>
          <div className="why-camp-card">
            <span className="card-num">02</span>
            <h3>The Small-Camp Advantage (150 Youth Capped)</h3>
            <p>
              No mega-camp crowds or 50-person classes. Each week is strictly limited to 150 youth participants, ensuring small merit badge classes, personal mentorship from enthusiastic staff, and tight patrol camaraderie.
            </p>
          </div>
          <div className="why-camp-card">
            <span className="card-num">03</span>
            <h3>Real Mountain Scoutcraft &amp; Badges</h3>
            <p>
              From natural rock climbing and archery/rifle shooting to outdoor pioneering, handicraft, ecology, and dark-sky astronomy under some of the clearest skies in North America—experience hands-on Scouting every day.
            </p>
          </div>
          <div className="why-camp-card">
            <span className="card-num">04</span>
            <h3>Campfire Spirit &amp; 2027 Pirate Crew Adventures</h3>
            <p>
              Traditions live here: troop skits, yells, and songs echoing off canyon walls in the historic campfire bowl. In 2027, join our Pirate Crew Adventures (Campsites are Ships, Dining Hall is the Galley!), and strive for the prestigious Barker Standard!
            </p>
          </div>
        </div>

        <div className="why-camp-actions">
          <a className="button" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
            Register on Black Pug ↗
          </a>
          <Link className="button button-secondary" href="/register">
            View All Fees &amp; Discounts →
          </Link>
          <Link className="text-link" href="/merit-badges">
            Browse 2027 Merit Badges <span aria-hidden="true">→</span>
          </Link>
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
            <div><strong>2027</strong><span>Registration open</span></div>
            <div><strong>$200</strong><span>Early Bird in-council</span></div>
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

      <section className="prep-audience-section" id="prepare">
        <div className="prep-audience-inner">
          <div className="prep-audience-header">
            <p className="section-kicker">Get Departure-Ready</p>
            <h2>Prepared for the Mountain: Scouts · Leaders · Parents</h2>
            <p>
              Everything each part of your Scouting family needs to know, pack, and prepare for an exceptional week at 7,900 feet.
            </p>
          </div>

          <div className="prep-audience-grid">
            <article className="prep-audience-card scouts">
              <span className="prep-badge">For Scouts</span>
              <h3>Be Prepared &amp; Have Fun</h3>
              <ul>
                <li><strong>High-Altitude Hydration:</strong> Drink plenty of water before and during camp; mountain elevation dehydrates faster. Bring a reusable water bottle and sunscreen.</li>
                <li><strong>Pack for Mountain Nights:</strong> Days are warm and sunny, but nights drop into the 50s. Bring warm sleeping layers and a sleeping pad for wooden platforms.</li>
                <li><strong>Merit Badge Readiness:</strong> Browse the 2027 catalog early and check prerequisites before badge registration opens February 1, 2027.</li>
                <li><strong>Camp Life &amp; Patrol Spirit:</strong> Enjoy flag ceremonies, dining hall meals, patrol competitions, campfires, and brotherhood.</li>
              </ul>
              <Link className="text-link" href="/guide/packing-list">
                Interactive packing list <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="prep-audience-card leaders">
              <span className="prep-badge">For Unit Leaders</span>
              <h3>Command Your Unit</h3>
              <ul>
                <li><strong>Save Your Spot on Black Pug:</strong> Sessions are capped at 150 youth. Units (2+ adults) and Provisional Scouts/Adults are welcome. Limit one registration per unit.</li>
                <li><strong>Required Paperwork:</strong> Signed unit roster, Annual Health and Medical Record (Parts A, B, and C) completed within 12 months for all participants.</li>
                <li><strong>Two-Deep Leadership:</strong> At least two registered adult leaders with current Youth Protection Training (YPT) are required.</li>
                <li><strong>Arrival Day Logistics:</strong> Arrive Sunday at 2:00 PM MST sharp, back into parking spaces, gear carried into campsites, and attend the 3:00 PM safety briefing.</li>
                <li><strong>USFS Regulations:</strong> Follow Leave No Trace and fire restrictions; always bring a no-flame alternative!</li>
                <li><strong>Unit Excellence:</strong> Daily SPL &amp; leader meetings at 12:55 PM; checkout Saturday by 10:00 AM MST. Strive for the Barker Standard!</li>
              </ul>
              <Link className="text-link" href="/guide">
                Explore leader&apos;s guide <span aria-hidden="true">→</span>
              </Link>
            </article>

            <article className="prep-audience-card parents">
              <span className="prep-badge">For Parents &amp; Families</span>
              <h3>Peace of Mind &amp; Support</h3>
              <ul>
                <li><strong>Provisional Campers Welcome:</strong> If your unit isn&apos;t attending, individual Scouts can register as provisional campers with approved host leadership.</li>
                <li><strong>Black Pug Parent Portal:</strong> Look up existing registrations, submit individual Scout information, and make installment payments online.</li>
                <li><strong>Camperships Available:</strong> Catalina Council provides financial assistance up to $360 per Scout so every youth can attend.</li>
                <li><strong>Health &amp; Safety:</strong> A full-time Camp Health Officer is on duty 24/7 in the Health Lodge; all medications are securely turned in in original containers.</li>
                <li><strong>Camp Mail:</strong> Keep in touch! Send mail to: Scout Name &amp; Unit #, Camp Lawton, PO Box 786, Mt. Lemmon, AZ 85619.</li>
              </ul>
              <Link className="text-link" href="/register">
                Fees, discounts &amp; parent details <span aria-hidden="true">→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section guide-section" id="guide">
        <div className="section-heading">
          <div><div className="section-kicker">Leader’s guide</div><h2>Find the answer. Keep planning.</h2></div>
          <label className="search-box">
            <span className="sr-only">Search the leader’s guide</span>
            <span aria-hidden="true">⌕</span>
            <input value={guideQuery} onChange={(event) => setGuideQuery(event.target.value)} placeholder="Search fees, forms, prerequisites…" />
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
                <Link className="guide-article-link" href={item.href}>{item.id === "packing" ? "Build your packing checklist" : "Read the full guidance"} →</Link>
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
          <article>
            <span className="alert-icon green">i</span>
            <div>
              <small>{campNotice?.source ?? "Camp Lawton staff"}</small>
              <h3>{campNotice?.title ?? "2027 Summer Camp Registration is Open"}</h3>
              <p>{campNotice?.summary ?? "Official registration is live on Black Pug. Secure your unit or provisional spot for Week 1 (June 6–12) or Week 2 (June 13–19). Early Bird credits apply through December 31, 2026."}</p>
              <a href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">Register on Black Pug ↗</a>
            </div>
          </article>
        </div>
      </section>

      <section className="section staff-promo-section" id="join-staff" aria-labelledby="staff-promo-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Join the Team · Est. 1921</p>
            <h2 id="staff-promo-title">Join the Camp Lawton Staff. Shape the Future.</h2>
          </div>
          <p className="heading-note">
            Few experiences in life provide the leadership experience and personal development that being on camp staff provides. Spend your summer at 7,900 feet making a lasting difference.
          </p>
        </div>

        <div className="staff-promo-grid">
          <div className="staff-promo-story">
            <div className="staff-promo-badges">
              <span className="staff-badge-pill primary">Catalina Council, BSA</span>
              <span className="staff-badge-pill">Staff Hill · Mt. Lemmon</span>
            </div>

            <div className="staff-promo-narrative">
              <p className="staff-quote-lead">
                Since the first Scouts arrived in 1921, our purpose has remained consistent: to transform lives through the power of the outdoor experience. You are how we fulfill that promise to the youth of Catalina Council and beyond.
              </p>
              <p>
                As a staff member, your daily actions and personal conduct serve as the living embodiment of the Scouting brand. You are the role models who make a simple camping trip into a life-altering experience. Your role is so much more than teaching merit badges and singing silly songs &mdash; you are shaping the future.
              </p>
              <p>
                Just as important is the impact this experience will have on you. Few experiences in life provide the leadership experience and personal development that being on camp staff provides. If you embrace what is asked of you this summer, you will leave a different person. I can&apos;t say for certain who that person will be, but it will be more than you are now. That may sound like hyperbole now, but read this again in August and tell me I&apos;m wrong.
              </p>
            </div>

            <div className="staff-promo-cta-box">
              <div className="staff-promo-cta-text">
                <h3>Ready to make a difference?</h3>
                <p>Apply today or complete your onboarding files to secure your place in Camp Lawton&apos;s history.</p>
              </div>
              <div className="staff-promo-cta-buttons">
                <a
                  className="button button-large"
                  href={STAFF_APPLICATION_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Apply for Camp Staff ↗
                </a>
              </div>
            </div>
          </div>

          <aside className="staff-promo-sidebar">
            <figure className="staff-promo-photo">
              <img
                src="/images/map/staffHillCabins2004.jpg"
                width={800}
                height={600}
                alt="Rustic staff cabins among the tall ponderosa pines at Camp Lawton"
                loading="lazy"
              />
              <figcaption>
                <strong>Staff Hill Cabins</strong>
                <span>Living among the pines at 7,900 feet in the Santa Catalina Mountains.</span>
              </figcaption>
            </figure>

            <div className="staff-highlights">
              <article className="staff-highlight-item">
                <span className="highlight-index">01</span>
                <div>
                  <h4>Real Leadership Development</h4>
                  <p>Gain hands-on experience in public speaking, outdoor safety management, and mentoring that sets college applications and resumes apart.</p>
                </div>
              </article>

              <article className="staff-highlight-item">
                <span className="highlight-index">02</span>
                <div>
                  <h4>Room &amp; Board on Mt. Lemmon</h4>
                  <p>Escape 105°F desert heat for 75°F pine breezes. Seasonal staff receive weekly compensation, rustic cabin lodging, and hot meals in the Galley.</p>
                </div>
              </article>

              <article className="staff-highlight-item">
                <span className="highlight-index">03</span>
                <div>
                  <h4>Camp Spirit &amp; Brotherhood</h4>
                  <p>Join a multi-generational legacy of fellowship, twilight traditions, canyon campfire skits, and friendships that last a lifetime.</p>
                </div>
              </article>

              <article className="staff-highlight-item">
                <span className="highlight-index">04</span>
                <div>
                  <h4>Open Opportunities Across Camp</h4>
                  <p>Roles available in Scoutcraft, Climbing &amp; Rappelling, Shooting Sports, Nature &amp; Ecology, Handicraft, Galley Dining, and Health Lodge.</p>
                </div>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section className="registration-callout" id="register">
        <div className="registration-callout-image">
          <img src="/images/camp-program.webp" width={1594} height={1200} alt="Scouts and leaders taking part in an outdoor camp activity" loading="lazy" />
        </div>
        <div className="registration-callout-copy">
          <div className="section-kicker">Summer Camp 2027</div>
          <h2>Registration is now open.</h2>
          <p>Join us at Camp Lawton for Summer Camp 2027! Enjoy an unforgettable week of adventure, learning, and leadership development in the Santa Catalina Mountains. Open to units and provisional Scouts.</p>

          <div className="disclaimer">
            <strong>Official Registration · Black Pug</strong>
            <span>Sessions are limited to 150 youth participants each. Register early to secure your spot and take advantage of Early Bird discounts.</span>
          </div>

          <div className="registration-callout-features">
            <span>Week 1: June 6–12, 2027 (Sun–Sat)</span>
            <span>Week 2: June 13–19, 2027 (Sun–Sat)</span>
            <span>In-Council: $400/Scout ($200 before 12/31)</span>
            <span>Out-of-Council: $450/Scout ($50 off before 12/31)</span>
            <span>Adult fee: $100 &bull; $40 youth deposit</span>
            <span>Merit badge registration opens Feb 1, 2027</span>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "16px" }}>
            <a className="button" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
              Register on Black Pug ↗
            </a>
            <a className="button button-secondary" href={WEEK1_REGISTRATION_URL} target="_blank" rel="noreferrer">
              Save a Spot — Week 1 ↗
            </a>
            <a className="button button-secondary" href={WEEK2_REGISTRATION_URL} target="_blank" rel="noreferrer">
              Save a Spot — Week 2 ↗
            </a>
            <Link className="button button-secondary" href="/register">
              View all camp fees &amp; details
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
