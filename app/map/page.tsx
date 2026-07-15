import type { Metadata } from "next";
import InteractiveCampMap from "../../components/InteractiveCampMap";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

export const metadata: Metadata = {
  title: "Interactive Camp Map · Camp Lawton",
  description: "Explore Camp Lawton campsites, program areas, and key facilities on an interactive map.",
};

export default function MapPage() {
  return <main className="map-page">
    <SiteHeader current="/map" />

    <section className="map-hero" aria-labelledby="map-page-title">
      <div className="map-hero-contours" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <div className="map-hero-inner">
        <div>
          <p className="section-kicker"><span /> Camp Lawton field guide</p>
          <h1 id="map-page-title">The whole camp,<br /><em>at a glance.</em></h1>
          <p>Explore campsites, program areas, and essential facilities before your unit arrives on the mountain.</p>
        </div>
        <div className="map-hero-compass" aria-hidden="true">
          <svg viewBox="0 0 190 190">
            <circle cx="95" cy="95" r="83" />
            <circle cx="95" cy="95" r="69" />
            <path d="m95 28 18 49 49 18-49 18-18 49-18-49-49-18 49-18 18-49Z" />
            <path d="m95 50 9 36-9 9-9-9 9-36Z" />
          </svg>
          <span><strong>30</strong> places to explore</span>
        </div>
      </div>
      <div className="map-hero-meta" aria-label="Map features">
        <div><span>01</span><strong>11 campsites</strong><small>See each site in camp context</small></div>
        <div><span>02</span><strong>10 program areas</strong><small>Plan realistic transitions</small></div>
        <div><span>03</span><strong>Key facilities</strong><small>Find assembly and support points</small></div>
      </div>
    </section>

    <InteractiveCampMap />

    <section className="map-planning-note" aria-labelledby="map-planning-note-title">
      <div>
        <p className="section-kicker">Before you set out</p>
        <h2 id="map-planning-note-title">Use the map to orient. Use staff direction to move safely.</h2>
      </div>
      <p>Paths, assignments, program availability, fire conditions, and emergency procedures can change. Review the current leader guidance and listen for the arrival-day safety briefing before moving through camp.</p>
    </section>

    <SiteFooter />
  </main>;
}
