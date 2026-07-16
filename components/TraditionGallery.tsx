import { barkerStandardRequirements } from "../lib/tribe-of-papago";

const historyMilestones = [
  { year: "1921", title: "Camp Lawton opens", text: "The first season welcomed 68 boys in two two-week sessions. With $400 in startup funds, surplus Army tents, the rough Control Road, and supplies moved by trucks and burros, camp depended on shared work." },
  { year: "1923", title: "Harry B. Ogle establishes the Tribe", text: "The Camp Director and Catalina Council Scout Executive created a local honor-camping society to reward returning campers for loyalty, leadership, conservation, and service." },
  { year: "1948", title: "The Order of the Arrow becomes national", text: "Scouting designated the Order of the Arrow as its official national honor society, ending or absorbing most independent camp societies." },
  { year: "1953", title: "Papago Lodge 494 is chartered", text: "The new Order of the Arrow lodge received its charter on May 29. Its first Ordeal brought in 84 Arrowmen; David Zinder became its first elected youth Lodge Chief." },
  { year: "Late 1960s", title: "The Sioux System interrupts the program", text: "A different camp structure displaced the Tribe for several years, but it did not build the same continuity among campers and alumni." },
  { year: "Early 1970s", title: "The Tribe returns", text: "Camp Lawton restored its local conservation and recognition tradition, separate from the Order of the Arrow and open through measurable camp participation." },
  { year: "Today", title: "Return, serve, and lead", text: "The current program carries the original idea forward through six paths for campers, adult leaders, and staff, plus a unit-wide standard." },
];

const barkerScoutRoles = [
  { unit: "Pack 100", role: "Cubmaster", detail: "Two years guiding the youngest Scouts and their families." },
  { unit: "Troop 208", role: "Scoutmaster", detail: "Three years of hands-on unit leadership in Tucson." },
  { unit: "Troop 007", role: "Scoutmaster", detail: "A second three-year Scoutmaster term with another Tucson troop." },
  { unit: "Troop 741", role: "Jamboree Scoutmaster", detail: "Led Catalina Council’s contingent troop at the 1993 National Scout Jamboree." },
];

const barkerFacts = [
  ["A Scout before a scientist", "Barker earned Eagle Scout in 1948 and later treated Scouting, conservation, and youth mentorship as parts of the same life’s work."],
  ["An early environmental warning", "His 1958 research traced DDT from sprayed elm leaves to earthworms and then robins—four years before Rachel Carson’s Silent Spring."],
  ["A honeybee detective", "At Tucson’s Carl Hayden Bee Research Center, he investigated why pesticide microcapsules behaved like pollen and were carried back into hives."],
  ["A proud “trouble maker”", "After challenging unsafe pesticide assumptions, he later named his consulting practice Pesticide Trouble Shooters."],
  ["A teacher of leaders", "He staffed six Wood Badge courses, twice serving as course Scoutmaster, after receiving his own beads on July 29, 1970."],
  ["Service beyond Scouting", "He flew with the Civil Air Patrol, volunteered as a U.S. Forest Service naturalist, and explored wild country across Arizona and Mexico."],
];

export default function TraditionGallery() {
  return <div className="top-story">
    <section className="top-barker-standard top-barker-standard-prominent" id="barker-standard" aria-labelledby="top-standard-title">
      <div className="top-standard-intro">
        <img src="/images/traditions/barker-standard.webp" width={720} height={480} alt="Barker Standard recognition rocker artwork" />
        <p className="section-kicker">For the whole unit</p><h2 id="top-standard-title">Meet the Barker Standard.</h2><p>Every troop that completes the standard receives a special Tribe of Papago rocker and a ribbon for its troop flag. On Friday night, staff select one troop for special recognition on the dining-hall plaque for the rest of the summer.</p><a href="#roy-barker">Why the award honors Roy Barker <span aria-hidden="true">↓</span></a>
      </div>
      <ol>{barkerStandardRequirements.map((requirement, index) => <li key={requirement}><span>{String(index + 1).padStart(2, "0")}</span><p>{requirement}</p></li>)}</ol>
    </section>

    <section className="top-history" id="history" aria-labelledby="top-history-title">
      <header className="top-section-heading top-history-heading">
        <div><p className="section-kicker">The detailed history · 1921 to today</p><h2 id="top-history-title">Why this tradition took root at Camp Lawton.</h2></div>
        <p>The Tribe grew from the practical realities of an isolated mountain camp: returning Scouts knew the trails, could lead younger campers, and supplied the service that kept an early camp working.</p>
      </header>

      <div className="top-history-chapters">
        <article className="top-history-chapter">
          <figure>
            <img src="/images/history/tribe-medal-1923.webp" width={750} height={1000} alt="Bronze 1932 Camp Lawton honor award displayed on red felt" loading="lazy" />
            <figcaption><strong>A 1932 Camp Lawton honor award</strong><span>Historic artifact photograph · Photo credit: Bill Topkis</span></figcaption>
          </figure>
          <div><span className="top-chapter-number">01</span><p className="section-kicker">A mountain camp built by shared effort</p><h3>From a $400 beginning to a return-camper tradition.</h3><p>Camp Lawton opened in 1921 as Southern Arizona’s high-country answer to summer heat. The modern Catalina Highway did not yet exist. Campers arrived by the Control Road, slept in surplus Army tents, drank powdered milk, and relied on old trucks and burro trains from San Xavier Mission for supplies.</p><p>In that setting, trail work, maintenance, and improvements were part of camp life. Harry B. Ogle—Camp Director and Catalina Council Scout Executive—needed experienced Scouts to return, help younger campers, and take pride in the place. In 1923 he organized those goals into the Tribe of Papago.</p></div>
        </article>

        <article className="top-history-chapter top-history-chapter-reverse">
          <figure>
            <img src="/images/history/tribe-artifacts.webp" width={1400} height={1050} alt="Historic display of Tribe of Papago neckerchiefs for Hunter, Warrior, Medicine Man, and Elder recognition" loading="lazy" />
            <figcaption><strong>The progressive recognition system preserved together</strong><span>Historic artifact photograph · Photo credit: Doug Walker</span></figcaption>
          </figure>
          <div><span className="top-chapter-number">02</span><p className="section-kicker">Ogle’s program design</p><h3>Each return to camp asked more of a Scout.</h3><p>The original structure made service desirable by tying it to belonging, visible recognition, and increasing responsibility. Hunter, Warrior, Medicine Man, and Chief marked a four-year youth progression. Adult leaders and fifth-year campers carried institutional memory as Elders; today, staff may follow the Guide path.</p><p>Successful campers were invited to a Friday-night ceremony after the closing campfire. Unlike many fraternal organizations of the era, the ceremony was open to family and friends. The ranks connected camp service with advancement, hiking, leadership, spiritual reflection, and Scout spirit—the same strands visible in the present program.</p></div>
        </article>

        <article className="top-history-chapter">
          <figure>
            <img src="/images/history/tribe-regalia.webp" width={1400} height={494} alt="Museum display case containing historic Camp Lawton Tribe of Papago neckerchiefs, caps, patches, and sash" loading="lazy" />
            <figcaption><strong>Decades of Camp Lawton recognition material</strong><span>Historic artifact photograph · Photo credit: Edwin DeLuna</span></figcaption>
          </figure>
          <div><span className="top-chapter-number">03</span><p className="section-kicker">A rare institutional survival</p><h3>The Order of the Arrow arrived—and the local program continued.</h3><p>When the Order of the Arrow became Scouting’s official national honor society in 1948, most local camp societies disappeared. Catalina Council chose a two-part path. Papago Lodge 494 was chartered as the council’s Order of the Arrow lodge on May 29, 1953, while the original Camp Lawton program continued as a conservation and returning-camper activity based on completed work rather than election.</p><p>The Tribe was displaced for several years by the late-1960s “Sioux System,” then restored in the early 1970s. That return is why Camp Lawton can still carry a local tradition that began before national Order of the Arrow standardization.</p></div>
        </article>

        <article className="top-history-chapter top-history-chapter-reverse top-name-chapter">
          <figure>
            <img src="/images/history/tribe-cap.webp" width={1000} height={939} alt="Red and white Camp Lawton cap bearing the historic Tribe of Papago name" loading="lazy" />
            <figcaption><strong>An undated Camp Lawton recognition cap</strong><span>Historic artifact photograph · Photo credit: Bill Topkis</span></figcaption>
          </figure>
          <div><span className="top-chapter-number">04</span><p className="section-kicker">Understanding the historic name</p><h3>A Camp Lawton program—not the Tohono O’odham Nation.</h3><p>The name belongs here to a Scouting tradition created in 1923. It must not be confused with the Tohono O’odham people. “Papago” was a Spanish exonym once widely used for the Nation; in 1986 the Nation formally restored its own name, Tohono O’odham—“Desert People.”</p><p>The program history records that when Papago Lodge leaders discussed changing the lodge name, Tohono O’odham leadership asked that the historic name remain because of the respectful relationship and service associated with it. The name stayed, while the symbols and ceremonial practices changed repeatedly over time.</p></div>
        </article>
      </div>

      <div className="top-history-timeline" aria-label="Tribe of Papago historical timeline">
        {historyMilestones.map((milestone) => <article key={`${milestone.year}-${milestone.title}`}><time>{milestone.year}</time><div><h3>{milestone.title}</h3><p>{milestone.text}</p></div></article>)}
      </div>
    </section>

    <section className="top-barker" id="roy-barker" aria-labelledby="top-barker-title">
      <header className="top-barker-hero">
        <figure><img src="/images/traditions/roy-barker.webp" width={616} height={700} alt="Supplied portrait artwork of Dr. Roy J. Barker wearing a campaign hat" loading="lazy" /><figcaption>Roy J. Barker, 1924–2012 · Supplied portrait artwork</figcaption></figure>
        <div><p className="section-kicker">The leader behind the Barker Standard</p><h2 id="top-barker-title">Dr. Roy J. Barker</h2><p className="top-barker-deck">Scoutmaster. Entomologist. Conservationist. Teacher of leaders.</p><p>After moving to Tucson in 1966, Barker spent decades serving Southern Arizona Scouts at the unit, district, council, training, and camp levels. His troops were remembered as consistent examples of Scout spirit—the reason Camp Lawton’s unit honor bears his name.</p><dl><div><dt>33 years</dt><dd>Catalina Council Executive Board, 1969–2002</dd></div><div><dt>6 courses</dt><dd>Wood Badge staff, twice as Scoutmaster</dd></div><div><dt>1997</dt><dd>Camp Lawton physician</dd></div></dl></div>
      </header>

      <div className="top-barker-units">
        <header><p className="section-kicker">The units he served</p><h3>Roy Barker led Scouts from Cub age to the national stage.</h3></header>
        <div>{barkerScoutRoles.map((item) => <article key={item.unit}><span>{item.unit}</span><strong>{item.role}</strong><p>{item.detail}</p></article>)}</div>
      </div>

      <div className="top-barker-service">
        <article><span>1969–1970</span><h3>Old Pueblo District Chairman</h3><p>Coordinated district-wide leadership, membership, and resources across Tucson-area units.</p></article>
        <article><span>1972 · 1974 · 2009</span><h3>Recognized service</h3><p>District Award of Merit, Silver Beaver Award, and the Otis H. Chidester Memorial Award.</p></article>
        <article><span>July 29, 1970</span><h3>Wood Badge</h3><p>Earned his beads, then returned to train generations of adult Scout leaders.</p></article>
      </div>

      <section className="top-barker-facts" aria-labelledby="top-barker-facts-title">
        <header><p className="section-kicker">Beyond the campaign hat</p><h3 id="top-barker-facts-title">Six things that make Barker’s story remarkable.</h3></header>
        <div>{barkerFacts.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h4>{title}</h4><p>{text}</p></article>)}</div>
      </section>

    </section>

    <aside className="top-source-basis"><strong>Source basis</strong><p>This leader-guide chapter is written from the supplied Camp Lawton recognition document, the supplied Tribe of Papago history, the supplied Roy J. Barker biography, and the credited archive images in the TOP collection.</p></aside>
  </div>;
}
