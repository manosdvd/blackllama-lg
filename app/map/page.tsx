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
