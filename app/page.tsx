"use client";

import { FormEvent, useMemo, useState, useEffect } from "react";

type DayKey = "Monday" | "Tuesday" | "Wednesday" | "Thursday";

type ScheduleEvent = {
  time: string;
  title: string;
  detail: string;
  kind: "routine" | "program" | "leader" | "meal";
};

type Offering = {
  id: string;
  title: string;
  area: string;
  time: string;
  start: number;
  end: number;
  note: string;
};

const days: DayKey[] = ["Monday", "Tuesday", "Wednesday", "Thursday"];

const scheduleByDay: Record<DayKey, ScheduleEvent[]> = {
  Monday: [
    { time: "6:40 AM", title: "Morning flags", detail: "20 minutes · all camp", kind: "routine" },
    { time: "7:10 AM", title: "Breakfast", detail: "35 minutes · cleanup follows", kind: "meal" },
    { time: "8:15 AM", title: "Merit badge sessions 1–3", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "11:40 AM", title: "Lunch", detail: "45 minutes · cleanup follows", kind: "meal" },
    { time: "12:55 PM", title: "SPL & leaders meeting", detail: "30 minutes · location posted at check-in", kind: "leader" },
    { time: "1:35 PM", title: "Merit badge sessions 4–6", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "4:35 PM", title: "Campsite competition", detail: "Orienteering and scavenger challenge", kind: "program" },
    { time: "6:05 PM", title: "Dinner", detail: "50 minutes · cleanup follows", kind: "meal" },
    { time: "7:25 PM", title: "Evening program", detail: "All-camp program; details announced with the final schedule", kind: "program" },
  ],
  Tuesday: [
    { time: "6:40 AM", title: "Morning flags", detail: "20 minutes · all camp", kind: "routine" },
    { time: "7:10 AM", title: "Breakfast", detail: "35 minutes · cleanup follows", kind: "meal" },
    { time: "8:15 AM", title: "Merit badge sessions 1–3", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "11:40 AM", title: "Lunch", detail: "45 minutes · cleanup follows", kind: "meal" },
    { time: "12:55 PM", title: "SPL & leaders meeting", detail: "30 minutes · leaders and SPLs expected", kind: "leader" },
    { time: "1:35 PM", title: "Merit badge sessions 4–6", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "4:35 PM", title: "Campsite competition", detail: "Knot-tying challenge", kind: "program" },
    { time: "6:05 PM", title: "Dinner", detail: "50 minutes · cleanup follows", kind: "meal" },
    { time: "7:25 PM", title: "Karaoke night", detail: "Optional all-camp evening program", kind: "program" },
  ],
  Wednesday: [
    { time: "6:40 AM", title: "Morning flags", detail: "20 minutes · all camp", kind: "routine" },
    { time: "7:10 AM", title: "Breakfast", detail: "35 minutes · cleanup follows", kind: "meal" },
    { time: "8:15 AM", title: "Merit badge sessions 1–3", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "11:40 AM", title: "Lunch", detail: "45 minutes · cleanup follows", kind: "meal" },
    { time: "12:55 PM", title: "SPL & leaders meeting", detail: "30 minutes · leaders and SPLs expected", kind: "leader" },
    { time: "1:35 PM", title: "Merit badge sessions 4–6", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "4:35 PM", title: "Campfire preparation", detail: "Campsite creative time for Friday campfire", kind: "program" },
    { time: "6:05 PM", title: "Dinner", detail: "50 minutes · cleanup follows", kind: "meal" },
    { time: "7:25 PM", title: "Stargazing program", detail: "Astronomy and celestial navigation", kind: "program" },
  ],
  Thursday: [
    { time: "6:40 AM", title: "Morning flags", detail: "20 minutes · all camp", kind: "routine" },
    { time: "7:10 AM", title: "Breakfast", detail: "35 minutes · cleanup follows", kind: "meal" },
    { time: "8:15 AM", title: "Merit badge sessions 1–3", detail: "Three 50-minute blocks with 10-minute transitions", kind: "program" },
    { time: "11:40 AM", title: "Lunch", detail: "45 minutes · cleanup follows", kind: "meal" },
    { time: "12:55 PM", title: "SPL & leaders meeting", detail: "30 minutes · leaders and SPLs expected", kind: "leader" },
    { time: "1:35 PM", title: "Merit badge sessions 4–6", detail: "Final regular afternoon blocks", kind: "program" },
    { time: "4:35 PM", title: "Gaga ball tournament", detail: "Campsite competition", kind: "program" },
    { time: "6:05 PM", title: "Dinner", detail: "50 minutes · cleanup follows", kind: "meal" },
    { time: "7:25 PM", title: "Campfire kit approval", detail: "All Friday skits, songs, and stories require staff review", kind: "leader" },
  ],
};

const offerings: Offering[] = [
  { id: "archery", title: "Archery", area: "Range", time: "8:15–9:05 AM", start: 815, end: 905, note: "Certified range supervision" },
  { id: "basketry", title: "Basketry", area: "Handicraft", time: "8:15–9:05 AM", start: 815, end: 905, note: "Material fee may apply" },
  { id: "first-aid", title: "First Aid", area: "Scoutcraft", time: "9:15–10:05 AM", start: 915, end: 1005, note: "Bring current handbook" },
  { id: "nature", title: "Nature", area: "Nature Lodge", time: "10:15–11:05 AM", start: 1015, end: 1105, note: "Outdoor fieldwork" },
  { id: "astronomy", title: "Astronomy", area: "Nature Lodge", time: "1:35–2:25 PM", start: 1335, end: 1425, note: "Evening observation component" },
  { id: "navigation", title: "Navigation Skills", area: "Scoutcraft", time: "2:35–3:25 PM", start: 1435, end: 1525, note: "Compass recommended" },
];

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
      "Bring BSA Annual Health & Medical Record Parts A, B, and C completed within 12 months.",
      "Bring a signed roster with emergency contacts and proof of current adult leader training.",
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
    title: "Program overview",
    summary: "Six daily merit badge blocks, campwide activities, evening programs, and transitions.",
    tags: "program merit badges schedule activities",
    body: [
      "Monday through Thursday includes six 50-minute merit badge blocks.",
      "Ten-minute transitions occur between activities; 30-minute cleanup buffers follow meals.",
      "Campwide competitions begin at 4:35 PM and evening programs begin at 7:25 PM.",
      "All campfire content must be reviewed and approved by staff before presentation.",
    ],
  },
];

type WeatherData = { temp: number | null; text: string; time: string };

function HeaderHUD({ weather, error }: { weather: WeatherData | null; error: boolean }) {
  return (
    <div className="hud-bar" role="status">
      <div className="hud-item">
        <span className="hud-icon" aria-hidden="true">°</span>
        <span>Weather: {error ? "Unavailable" : weather ? `${weather.temp !== null ? weather.temp + "°F" : "N/A"} · ${weather.text}` : "Loading..."}</span>
      </div>
      <div className="hud-item">
        <span className="hud-icon" aria-hidden="true">▲</span>
        <span>Fire Danger: Verify locally</span>
      </div>
    </div>
  );
}

function WeatherAlert({ weather, error }: { weather: WeatherData | null; error: boolean }) {
  if (error) {
    return (
      <article>
        <span className="alert-icon sky">°</span>
        <div><small>Weather</small><h3>Feed unavailable</h3><p>Could not connect to NWS station QSLA3 at this time.</p></div>
      </article>
    );
  }

  return (
    <article>
      <span className="alert-icon sky">°</span>
      <div>
        <small>Weather (Mt. Lemmon)</small>
        {weather ? (
          <>
            <h3>{weather.temp !== null ? `${weather.temp}°F` : "N/A"} · {weather.text}</h3>
            <p>Observations from NWS station QSLA3. Updated at {weather.time}.</p>
          </>
        ) : (
          <>
            <h3>Loading...</h3>
            <p>Fetching latest conditions from NWS...</p>
          </>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const [guideQuery, setGuideQuery] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    fetch("https://api.weather.gov/stations/QSLA3/observations/latest")
      .then(res => {
        if (!res.ok) throw new Error("Weather API failed");
        return res.json();
      })
      .then(data => {
        const props = data.properties;
        const tempC = props.temperature.value;
        const tempF = tempC !== null ? Math.round((tempC * 9) / 5 + 32) : null;
        const text = props.textDescription || "Unknown";
        const time = new Date(props.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setWeather({ temp: tempF, text, time });
      })
      .catch(() => {
        setWeatherError(true);
      });
  }, []);

  const filteredGuide = useMemo(() => {
    const query = guideQuery.toLowerCase().trim();
    if (!query) return guideSections;
    return guideSections.filter((item) => `${item.title} ${item.summary} ${item.tags}`.toLowerCase().includes(query));
  }, [guideQuery]);



  function submitInterest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <main>
      <HeaderHUD weather={weather} error={weatherError} />
      
      <div className="notice-bar" role="status">
        <span className="notice-dot" aria-hidden="true" />
        <strong>Planning notice</strong>
        <span>2027 schedules are preliminary. Final program details will be posted before registration opens.</span>
        <a href="#alerts">View notices</a>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Camp Lawton home">
          <img src="/images/CLlogo.png" alt="CL Logo" className="brand-mark" />
          <span><strong>Camp Lawton</strong><small>Leader Hub · 2027</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#guide">Guide</a>
          <a href="/schedule">Schedule</a>
          <a href="/merit-badges">Programs</a>
          <a href="#alerts">Alerts</a>
        </nav>
        <a className="button button-small" href="#preregister">Pre-register</a>
      </header>

      <section className="hero" id="top">
        <img src="/images/PXL_20260612_151123910~2.jpg" alt="The wooden Camp Lawton entrance sign among ponderosa pines" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Catalina Council · Scouting America</p>
          <h1>Prepare for a week<br />that stays with them. <img src="/images/cllogospin.gif" alt="" className="spinning-badge" /></h1>
          <p className="hero-copy">Everything leaders need to plan a safe, memorable 2027 summer camp in the Catalina Mountains.</p>
          <div className="hero-actions">
            <a className="button" href="#guide">Open the leader’s guide</a>
            <a className="text-link" href="/schedule">Explore the week <span aria-hidden="true">→</span></a>
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
        <a href="#guide"><span>01</span><strong>Before you leave</strong><small>Packing, forms & policies</small></a>
        <a href="/schedule"><span>02</span><strong>Plan the week</strong><small>Schedules & transitions</small></a>
        <a href="/merit-badges"><span>03</span><strong>Build a Scout plan</strong><small>Programs & conflicts</small></a>
        <a href="#preregister"><span>04</span><strong>Tell us you’re interested</strong><small>Non-binding pre-registration</small></a>
      </section>

      <section className="section intro-section">
        <div className="section-kicker">Camp at a glance</div>
        <div className="intro-grid">
          <div>
            <h2>A small camp with room for a big experience.</h2>
            <p>Camp Lawton combines six daily merit badge blocks with outdoor skills, campwide challenges, evening programs, and the close-knit character of a century-old mountain camp.</p>
          </div>
          <div className="fact-grid">
            <div><strong>1921</strong><span>Camp established</span></div>
            <div><strong>6</strong><span>Daily badge blocks</span></div>
            <div><strong>10 min</strong><span>Built-in transitions</span></div>
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
              </details>
            ))}
            {filteredGuide.length === 0 && <p className="empty-state">No guide sections match “{guideQuery}”. Try a broader term.</p>}
          </div>
          <aside className="photo-card">
            <img src="/images/Image_5.jpg" alt="Historic log cabin camp office beneath tall pine trees" loading="lazy" />
            <div><span>On the mountain since 1921</span><p>Historic buildings, shaded campsites, and a program designed around personal attention.</p></div>
          </aside>
        </div>
      </section>

      

      <section className="story-band">
        <img src="/images/PXL_20260605_172059179.PANO.jpg" alt="Camp Lawton cabins arranged around a campsite fire ring" loading="lazy" />
        <div className="story-copy">
          <div className="section-kicker">Life at Lawton</div>
          <h2>Cabins under the pines.<br />A whole camp within reach.</h2>
          <p>Each campsite is a home base for the week. Adirondack-style structures include wooden sleeping platforms; leaders should plan buddy assignments and bring sleeping pads and bags for comfort.</p>
          <a href="#guide" className="text-link">Read campsite guidance <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="section alerts-section" id="alerts">
        <div className="section-heading">
          <div><div className="section-kicker">Conditions & notices</div><h2>Know before you go.</h2></div>
          <span className="prototype-pill">Prototype data</span>
        </div>
        <div className="alert-grid">
          <WeatherAlert weather={weather} error={weatherError} />
          <article><span className="alert-icon amber">▲</span><div><small>Fire restrictions</small><h3>Verify daily with camp staff</h3><p>Restrictions can change without warning. Missing online data never means fires are permitted.</p></div></article>
          <article><span className="alert-icon green">i</span><div><small>Camp notice</small><h3>2027 schedules are preliminary</h3><p>Final program details, capacities, and fees will be published before official registration.</p></div></article>
        </div>
      </section>

      <section className="preregister" id="preregister">
        <div className="preregister-image"><img src="/images/PXL_20260607_155608710.jpg" alt="Scouts and leaders taking part in an outdoor camp activity" loading="lazy" /></div>
        <div className="preregister-copy">
          <div className="section-kicker">Plan with us</div>
          <h2>Help shape the 2027 program.</h2>
          <p>Share your unit’s estimated attendance and program interests. This early signal helps camp staff plan staffing and program capacity.</p>
          <div className="disclaimer"><strong>Planning only</strong><span>This is not official registration, does not reserve a campsite or badge seat, and does not collect payment. Official registration will be available through Black Pug in spring.</span></div>
          {formSubmitted ? (
            <div className="form-success" role="status"><strong>Prototype submission complete.</strong><span>No information was sent or stored. This demonstrates the confirmation experience.</span><button onClick={() => setFormSubmitted(false)}>Start over</button></div>
          ) : (
            <form onSubmit={submitInterest}>
              <label><span>Unit type & number</span><input required placeholder="Troop 123" /></label>
              <label><span>Primary leader email</span><input required type="email" placeholder="leader@example.org" /></label>
              <label><span>Preferred session</span><select required defaultValue=""><option value="" disabled>Select a week</option><option>Week 1 · Jun 1–5</option><option>Week 2 · Jun 6–12</option><option>Week 3 · Jun 13–19</option></select></label>
              <label><span>Estimated Scouts</span><input required type="number" min="1" placeholder="12" /></label>
              <button className="button" type="submit">Preview pre-registration</button>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-brand"><img src="/images/CLlogo.png" alt="CL Logo" className="brand-mark" /><div><strong>Camp Lawton</strong><small>Catalina Mountains · Arizona</small></div></div>
        <div><strong>Leader resources</strong><a href="#guide">Leader’s guide</a><a href="/schedule">Schedule</a><a href="/merit-badges">Program planner</a></div>
        <div><strong>Prepare</strong><a href="#guide">Packing & paperwork</a><a href="#alerts">Conditions & notices</a><a href="#preregister">Pre-register</a></div>
        <p>Prototype based on the 2027 leader’s guide. Dates and program details remain subject to final approval.</p>
      </footer>
    </main>
  );
}
