import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import MeritBadgeDirectory, { type MeritBadgeDirectoryItem } from "../../components/MeritBadgeDirectory";
import { meritBadgeReferenceCatalog } from "../../lib/merit-badge-reference.generated";
import { getMeritBadgeResource, OFFICIAL_MERIT_BADGE_INDEX_URL } from "../../lib/merit-badge-resources";

export const metadata: Metadata = {
  title: "2027 Merit Badges · Camp Lawton",
  description: "Explore merit badge subjects for Camp Lawton Summer Camp 2027. Official registration is open, and merit badge class registration opens February 1, 2027.",
};

import { OFFICIAL_REGISTRATION_URL, MERIT_BADGE_CATALOG_URL } from "../../lib/registration";

export default function MeritBadgesPage() {
  const directoryItems = meritBadgeReferenceCatalog.flatMap((badge): MeritBadgeDirectoryItem[] => {
    const resource = getMeritBadgeResource(badge.id);
    return resource ? [{ ...badge, overview: resource.overview, eagleRequired: resource.eagleRequired }] : [];
  });

  return (
    <main>
      <SiteHeader current="/merit-badges" />
      <section className="page-intro programs-intro">
        <div>
          <p className="section-kicker">Scouts BSA Summer Camp 2027</p>
          <h1>2027 Merit Badge Program</h1>
          <p>
            Scouts will have the opportunity to earn a wide variety of merit badges while enjoying the great outdoors in the Santa Catalina Mountains. Official camp registration is now open, and merit badge class registration opens February 1, 2027.
          </p>
        </div>
      </section>

      <section className="page-content">
        <aside className="badge-source-banner">
          <div>
            <span>Registration Update · Summer Camp 2027</span>
            <strong>Merit Badge Registration Opens February 1, 2027</strong>
            <p>
              Merit badge class sizes are limited. Register your unit early on Black Pug to secure your session spot. On February 1, 2027, merit badge class selection will open for registered participants. Some badges have additional fees for materials/supplies, charged at badge registration.
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

        <MeritBadgeDirectory items={directoryItems} />
      </section>
      <SiteFooter />
    </main>
  );
}
