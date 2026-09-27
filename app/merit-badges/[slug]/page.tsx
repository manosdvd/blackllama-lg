import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { meritBadgeReferenceCatalog } from "../../../lib/merit-badge-reference.generated";
import { getMeritBadgeResource, OFFICIAL_MERIT_BADGE_INDEX_URL } from "../../../lib/merit-badge-resources";

type PageProps = { params: Promise<{ slug: string }> };

import { OFFICIAL_REGISTRATION_URL, MERIT_BADGE_CATALOG_URL } from "../../../lib/registration";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const badge = meritBadgeReferenceCatalog.find((item) => item.id === slug);
  const resource = getMeritBadgeResource(slug);
  if (!badge || !resource) return { title: "Merit badge not found" };
  return {
    title: `${badge.title} Merit Badge · Camp Lawton 2027`,
    description: `${resource.overview} Scouts BSA merit badge guidance for Camp Lawton Summer Camp 2027.`,
    robots: { index: false, follow: true },
  };
}

export default async function MeritBadgeReferencePage({ params }: PageProps) {
  const { slug } = await params;
  const badge = meritBadgeReferenceCatalog.find((item) => item.id === slug);
  const resource = getMeritBadgeResource(slug);
  if (!badge || !resource) notFound();

  const reviewedOn = new Date(`${resource.reviewedOn}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <main className="badge-detail-page">
      <SiteHeader current="/merit-badges" />
      <article>
        <header className="badge-detail-hero">
          <div className="badge-detail-hero-inner">
            <Link href="/merit-badges" className="badge-detail-back">← All merit badges</Link>
            <div className="badge-detail-heading">
              <div>
                <p className="section-kicker">Scouts BSA Merit Badge</p>
                <h1>{badge.title}</h1>
                <p>{resource.overview}</p>
                <div className="badge-detail-tags">
                  <span>{badge.area}</span>
                  <span>Merit Badge</span>
                  {resource.eagleRequired && <span>Eagle-required</span>}
                </div>
              </div>
              <aside className="badge-official-card">
                <span>Verified official source</span>
                <strong>Scouting America</strong>
                <p>Use the official page for current requirements, updates, and pamphlet resources.</p>
                <a href={resource.officialUrl} target="_blank" rel="noreferrer">
                  View official badge guide <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <small>Official link reviewed {reviewedOn}</small>
              </aside>
            </div>
          </div>
        </header>

        <div className="badge-detail-content">
          <section className="badge-registration-panel">
            <p className="section-kicker">Summer Camp 2027 Registration</p>
            <h2>Merit badge registration opens February 1, 2027.</h2>
            <p>
              Official camp registration is open on Black Pug. This general reference guide is not confirmation that {badge.title} is offered at camp. Check the council catalog for offerings and requirements, and use Black Pug for class registration beginning February 1, 2027. Class sizes are limited and some badges have materials fees.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "16px" }}>
              <a className="button" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
                Register on Black Pug ↗
              </a>
              <a className="button button-secondary" href={MERIT_BADGE_CATALOG_URL} target="_blank" rel="noreferrer">
                SBSA 2027 Badge Catalog ↗
              </a>
            </div>
          </section>

          <aside className="badge-source-note">
            <div>
              <span>Official requirements govern advancement</span>
              <p>
                Scouts working toward {badge.title} must complete the requirements in effect and receive registered counselor approval. Check the official SBSA Summer 2027 Merit Badge Catalog document for any badge-specific fees or materials.
              </p>
            </div>
            <div>
              <a href={resource.officialUrl} target="_blank" rel="noreferrer">
                Current {badge.title} requirements <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={OFFICIAL_MERIT_BADGE_INDEX_URL} target="_blank" rel="noreferrer">
                Scouting America A–Z index <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </aside>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
