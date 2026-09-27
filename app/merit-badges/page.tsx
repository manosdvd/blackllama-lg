import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import MeritBadgeDirectory from "../../components/MeritBadgeDirectory";
import { campLawtonOfferedBadges } from "../../lib/camp-lawton-merit-badges";
import { OFFICIAL_REGISTRATION_URL, MERIT_BADGE_CATALOG_URL } from "../../lib/registration";
import { OFFICIAL_MERIT_BADGE_INDEX_URL } from "../../lib/merit-badge-resources";

export const metadata: Metadata = {
  title: "2027 Merit Badge Program · Camp Lawton",
  description: "Official 2027 Scouts BSA Merit Badge and Advancement schedule for Camp Lawton Summer Camp. Explore 43 scheduled courses, periods, class caps, and prerequisites.",
};

export default function MeritBadgesPage() {
  return (
    <main>
      <SiteHeader current="/merit-badges" />
      <section className="page-intro programs-intro">
        <div>
          <p className="section-kicker">Scouts BSA Summer Camp 2027</p>
          <h1>2027 Merit Badge Program</h1>
          <p>
            Official 2027 advancement schedule for Camp Lawton in the Santa Catalina Mountains.
            Every course below is scheduled with its designated period, counselor of record, and class cap.
            Official camp registration is open on Black Pug, and merit badge class registration opens February 1, 2027.
          </p>
        </div>
      </section>

      <section className="page-content">
        <aside className="badge-source-banner">
          <div>
            <span>Registration Update · Summer Camp 2027</span>
            <strong>Merit Badge Registration Opens February 1, 2027</strong>
            <p>
              Merit badge class sizes are strictly limited (5–8 Scouts) to ensure high-quality instruction. Register your unit early on Black Pug to secure your session spot. On February 1, 2027, merit badge class selection will open for registered participants. Some badges have additional fees for materials/supplies, charged at badge registration.
            </p>
          </div>
          <div className="badge-source-actions">
            <a className="button" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
              Register on Black Pug ↗
            </a>
            <a className="button button-secondary" href={MERIT_BADGE_CATALOG_URL} target="_blank" rel="noreferrer">
              SBSA 2027 Badge Catalog ↗
            </a>
            <Link href="/guide/program-requirements-and-materials">Requirements guide →</Link>
            <Link href="/register">Camp Fees &amp; Details →</Link>
            <a href={OFFICIAL_MERIT_BADGE_INDEX_URL} target="_blank" rel="noreferrer">
              Official A–Z <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </aside>

        <MeritBadgeDirectory items={campLawtonOfferedBadges} />
      </section>
      <SiteFooter />
    </main>
  );
}
