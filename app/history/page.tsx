import type { Metadata } from "next";
import HistoryTimeline from "../../components/HistoryTimeline";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { historyEvents, historySourceDocuments } from "../../lib/camp-history";

export const metadata: Metadata = {
  title: "A Century on the Mountain · Camp Lawton History",
  description: "Explore an interactive timeline of Camp Lawton from its 1921 founding through a century of service, resilience, and renewal.",
};

export default function HistoryPage() {
  return <main className="history-page">
    <SiteHeader current="/history" />

    <section className="history-hero" aria-labelledby="history-title">
      <img className="history-hero-image" src="/images/Image_2.jpg" alt="The entrance to Camp Lawton among tall ponderosa pines" />
      <div className="history-hero-wash" aria-hidden="true" />
      <div className="history-contours" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="history-hero-inner">
        <div className="history-hero-copy">
          <p className="history-hero-kicker"><span /> Camp Lawton · Established 1921</p>
          <h1 id="history-title">A century<br />on the<br /><em>mountain.</em></h1>
          <p>Follow the people, places, and acts of service that shaped a summer refuge at 7,900 feet—and kept rebuilding it for the next generation.</p>
          <div className="history-hero-actions">
            <a className="button" href="#timeline">Walk the timeline <span aria-hidden="true">↓</span></a>
            <a href="#history-sources">About the history <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="history-hero-mark" aria-hidden="true">
          <svg viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="101" />
            <circle cx="110" cy="110" r="88" />
            <path d="M39 137 85 75l27 35 20-27 49 54" />
            <path d="M52 140h116" />
            <path d="M73 155c23-13 52-13 75 0M82 170c17-9 38-9 56 0" />
          </svg>
          <span><strong>1921</strong>Organization Ridge<br />Santa Catalina Mountains</span>
        </div>
      </div>

      <div className="history-hero-stats" aria-label="Camp Lawton history at a glance">
        <div><strong>105</strong><span>years in the story</span></div>
        <div><strong>{historyEvents.length}</strong><span>milestones to explore</span></div>
        <div><strong>~7,900′</strong><span>above the desert</span></div>
        <div><strong>3</strong><span>springs linked in 1947</span></div>
      </div>
    </section>

    <div id="timeline"><HistoryTimeline /></div>

    <section className="history-continuity" aria-labelledby="history-continuity-title">
      <figure>
        <img src="/images/PXL_20260530_022137497~2.jpg" alt="The stone wishing well at Camp Lawton beneath pine trees" loading="lazy" />
        <figcaption>Al’s Well today <span>Present-day photo · 2026</span></figcaption>
      </figure>
      <div>
        <p className="section-kicker">The thread beneath the story</p>
        <h2 id="history-continuity-title">The camp moved for water. Then it learned to build around it.</h2>
        <p>In 1926, access to springs determined Camp Lawton’s permanent home. In 1947, Al Christensen joined three springs into a working system. After the Aspen Fire, crews laid more than 3,000 feet of new waterline. The same resource has shaped where the camp stands, how it grows, and what it must protect.</p>
        <a href="#year-als-well">Return to 1947 <span aria-hidden="true">↑</span></a>
      </div>
    </section>

    <section className="history-sources" id="history-sources" aria-labelledby="history-sources-title">
      <div>
        <p className="section-kicker">Notes from the archive</p>
        <h2 id="history-sources-title">How this timeline was made</h2>
      </div>
      <div className="history-source-copy">
        <p>This page is a curated narrative synthesis of the four working documents in the project’s <code>history</code> folder. It is not presented as a formal archival exhibit. Dates and claims should receive authorized historical and cultural review before external publication.</p>
        <ul>{historySourceDocuments.map((document) => <li key={document}>{document}</li>)}</ul>
        <p className="history-editorial-note"><strong>Editorial note</strong> The drafts differ on the outcome of 2026 merger discussions. This timeline follows the later March 6 update recorded in the master chronology: near-term independence for Catalina Council.</p>
      </div>
    </section>

    <SiteFooter />
  </main>;
}
