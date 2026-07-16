const ranks = [
  { name: "Hunter", note: "First year", image: "/images/traditions/hunter.webp" },
  { name: "Warrior", note: "Second year", image: "/images/traditions/warrior.webp" },
  { name: "Medicine Man", note: "Third year", image: "/images/traditions/medicine-man.webp" },
  { name: "Chief", note: "Fourth year", image: "/images/traditions/chief.webp" },
  { name: "Elder", note: "Adult leader or fifth year", image: "/images/traditions/elder.webp" },
  { name: "Guide", note: "Staff recognition", image: "/images/traditions/guide.webp" },
];

const artifacts = [
  {
    image: "/images/history/tribe-cap.webp",
    alt: "A red-and-white cap embroidered Tribe of Papago Camp Lawton",
    caption: "An undated Camp Lawton cap bearing the program’s historic name",
    credit: "Artifact photograph · date unknown · Photo credit: Bill Topkis",
    className: "tradition-artifact-portrait",
  },
  {
    image: "/images/history/tribe-artifacts.webp",
    alt: "A display of historic Tribe of Papago recognition cloths, patches, and explanatory material",
    caption: "Recognition colors and preserved program material",
    credit: "Artifact photograph · date unknown · Photo credit: Doug Walker",
    className: "tradition-artifact-wide",
  },
  {
    image: "/images/history/tribe-regalia.webp",
    alt: "A display case containing historic Tribe of Papago neckerchiefs, patches, and other recognition pieces",
    caption: "Historic recognition pieces preserved together",
    credit: "Artifact photograph · date unknown · Photo credit: Edwin DeLuna",
    className: "tradition-artifact-wide",
  },
];

export default function TraditionGallery() {
  return <div className="tradition-gallery">
    <section className="tradition-ranks" aria-labelledby="tradition-ranks-title">
      <figure className="tradition-patch">
        <img src="/images/traditions/tribe-patch.webp" width={720} height={720} alt="Circular Tribe of Papago Camp Lawton recognition patch artwork featuring the Catalina Mountains" loading="lazy" />
        <figcaption>Current program artwork supplied with the working recognition guide</figcaption>
      </figure>
      <div>
        <p className="section-kicker">Return · serve · lead</p>
        <h2 id="tradition-ranks-title">Recognition that grows with a camper.</h2>
        <p>The working Camp Lawton program recognizes return visits, service, leadership, trail experience, reflection, and Scout spirit. Final staff-issued requirements control each season.</p>
        <div className="tradition-rank-grid">
          {ranks.map((rank) => <figure key={rank.name}>
            <img src={rank.image} width={640} height={427} alt={`${rank.name} recognition rocker artwork`} loading="lazy" />
            <figcaption><strong>{rank.name}</strong><span>{rank.note}</span></figcaption>
          </figure>)}
        </div>
        <p className="tradition-context-note">Rank names are transcribed from the supplied working program document. Camp Lawton’s historical terminology and artwork should receive authorized cultural and program review before final publication.</p>
      </div>
    </section>

    <section className="tradition-artifacts" aria-labelledby="tradition-artifacts-title">
      <header>
        <div><p className="section-kicker">From the local collection</p><h2 id="tradition-artifacts-title">A tradition preserved in objects.</h2></div>
        <p>These contributed photographs document earlier Camp Lawton recognition pieces. Their captions identify what is visible; contributor names are preserved from the original filenames as photo credits.</p>
      </header>
      <div>{artifacts.map((artifact) => <figure className={artifact.className} key={`${artifact.image}-${artifact.caption}`}>
        <img src={artifact.image} alt={artifact.alt} loading="lazy" />
        <figcaption><strong>{artifact.caption}</strong><span>{artifact.credit}</span></figcaption>
      </figure>)}</div>
    </section>

    <section className="tradition-barker" aria-labelledby="tradition-barker-title">
      <div><p className="section-kicker">The Barker Standard</p><h2 id="tradition-barker-title">A unit award rooted in service and Scout spirit.</h2><p>The supplied biography records Roy J. Barker’s decades as a Scoutmaster, council-board member, Wood Badge instructor, entomologist, and Camp Lawton physician. Units pursue the Standard together through participation, service, leadership, and care for camp; the working biography remains subject to source and family review.</p></div>
      <img className="tradition-barker-rocker" src="/images/traditions/barker-standard.webp" width={720} height={480} alt="Barker Standard recognition rocker artwork" loading="lazy" />
    </section>
  </div>;
}
