import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { meritBadgeSurveyCatalog } from "../../../lib/merit-badge-survey.generated";
import { getMeritBadgeResource, OFFICIAL_MERIT_BADGE_INDEX_URL } from "../../../lib/merit-badge-resources";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const badge = meritBadgeSurveyCatalog.find((item) => item.id === slug);
  const resource = getMeritBadgeResource(slug);
  if (!badge || !resource) return { title: "Survey topic not found" };
  return {
    title: `${badge.title} survey reference`,
    description: `${resource.overview} This is a broad interest-survey candidate, not a published Camp Lawton offering.`,
    robots: { index: false, follow: true },
  };
}

export default async function MeritBadgeReferencePage({ params }: PageProps) {
  const { slug } = await params;
  const badge = meritBadgeSurveyCatalog.find((item) => item.id === slug);
  const resource = getMeritBadgeResource(slug);
  if (!badge || !resource) notFound();

  const reviewedOn = new Date(`${resource.reviewedOn}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return <main className="badge-detail-page">
    <SiteHeader current="/merit-badges" />
    <article>
      <header className="badge-detail-hero">
        <div className="badge-detail-hero-inner">
          <Link href="/merit-badges" className="badge-detail-back">← Merit badge interest survey</Link>
          <div className="badge-detail-heading">
            <div>
              <p className="section-kicker">Survey candidate reference</p>
              <h1>{badge.title}</h1>
              <p>{resource.overview}</p>
              <div className="badge-detail-tags">
                <span>{badge.area}</span>
                <span>Not a published 2027 offering</span>
                {resource.eagleRequired && <span>Eagle-required</span>}
              </div>
            </div>
            <aside className="badge-official-card">
              <span>Verified official source</span>
              <strong>Scouting America</strong>
              <p>Use the official page for current requirements, updates, and pamphlet resources.</p>
              <a href={resource.officialUrl} target="_blank" rel="noreferrer">View official badge guide <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              <small>Official link reviewed {reviewedOn}</small>
            </aside>
          </div>
        </div>
      </header>

      <div className="badge-detail-content">
        <section className="badge-interest-panel">
          <p className="section-kicker">Why this topic appears here</p>
          <h2>Camp Lawton is gathering broad unit interest.</h2>
          <p>{badge.title} is one of 84 subjects units can identify in the non-binding survey. The survey list is intentionally broad: it is not the final Camp Lawton catalog, class schedule, capacity list, or a promise that this badge will be offered.</p>
          <Link href="/pre-register">Share unit interest →</Link>
        </section>

        <aside className="badge-source-note">
          <div>
            <span>Official requirements govern advancement</span>
            <p>If this badge is offered later, Scouts must complete the requirements then in effect and receive counselor approval. Final Camp Lawton program details will be published only after authorization.</p>
          </div>
          <div>
            <a href={resource.officialUrl} target="_blank" rel="noreferrer">Current {badge.title} requirements <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            <a href={OFFICIAL_MERIT_BADGE_INDEX_URL} target="_blank" rel="noreferrer">Scouting America A–Z index <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
          </div>
        </aside>
      </div>
    </article>
    <SiteFooter />
  </main>;
}
