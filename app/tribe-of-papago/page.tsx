import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import TraditionGallery from "../../components/TraditionGallery";
import TribeExplorer from "../../components/TribeExplorer";

export const metadata: Metadata = {
  title: "Tribe of Papago Leader Guide",
  description: "Camp Lawton leader information for the Tribe of Papago recognition program, its full history, the Barker Standard, and Roy J. Barker’s Scouting legacy.",
  alternates: { canonical: "/tribe-of-papago" },
};

export default function TribeOfPapagoPage() {
  return <main className="tribe-page top-guide-page">
    <SiteHeader current="/tribe-of-papago" />

    <section className="top-hero" aria-labelledby="top-page-title">
      <div className="top-hero-copy">
        <p className="top-hero-kicker">Camp Lawton leader’s guide · Established 1923</p>
        <h1 id="top-page-title">Tribe of<br /><em>Papago</em></h1>
        <p>A Camp Lawton recognition tradition for returning campers—built on service, leadership, trails, advancement, reflection, and Scout spirit.</p>
        <div className="top-hero-actions"><a href="#recognition-paths">Plan recognition paths</a><a href="#history">Read the full history</a></div>
      </div>
      <figure className="top-hero-patch"><img src="/images/traditions/tribe-patch.webp" width={720} height={720} alt="Current circular Tribe of Papago Camp Lawton program artwork" /><figcaption>Current program artwork supplied with the Camp Lawton recognition guide</figcaption></figure>
      <dl className="top-hero-facts"><div><dt>Founded</dt><dd>1923</dd></div><div><dt>Recognition paths</dt><dd>6</dd></div><div><dt>Unit standard</dt><dd>9 steps</dd></div><div><dt>Core idea</dt><dd>Return · Serve · Lead</dd></div></dl>
    </section>

    <nav className="top-section-nav" aria-label="On this page">
      <span>On this page</span><a href="#leader-brief">Leader brief</a><a href="#recognition-paths">Recognition paths</a><a href="#barker-standard">Barker Standard</a><a href="#history">Detailed history</a><a href="#roy-barker">Roy Barker</a>
    </nav>

    <section className="page-content tribe-page-content">
      <section className="top-leader-brief" id="leader-brief" aria-labelledby="top-brief-title">
        <div><p className="section-kicker">What unit leaders should know</p><h2 id="top-brief-title">This is Camp Lawton’s return-camper program.</h2></div>
        <div><p>Harry B. Ogle created the Tribe in 1923, before the Order of the Arrow became Scouting’s national honor society. When Papago Lodge 494 was later chartered, the Tribe remained at Camp Lawton as a separate conservation and recognition program.</p><p>It is not an Order of the Arrow membership level and it is not the Tohono O’odham Nation. For camp planning, its purpose is straightforward: recognize the Scouts who come back, invite them to shoulder more responsibility, and connect achievement to service for the place they share.</p><blockquote>“Return, serve, and lead” is the useful shorthand: find each camper’s year, make room for the requirements, and let staff know who is working toward recognition.</blockquote></div>
      </section>

      <TribeExplorer />
      <TraditionGallery />
    </section>

    <SiteFooter />
  </main>;
}
