import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { programOfferings } from "../../../lib/camp-catalog";
import { meritBadgeSurveyCatalog, type CampCompletion, type MeritBadgeSurveyItem } from "../../../lib/merit-badge-survey.generated";
import { getMeritBadgeResource, OFFICIAL_MERIT_BADGE_INDEX_URL } from "../../../lib/merit-badge-resources";

type PageProps = { params: Promise<{ slug: string }> };

const completionCopy: Record<CampCompletion, { label: string; detail: string }> = {
  complete: {
    label: "Complete at camp",
    detail: "Current planning analysis indicates the badge can be completed in camp when the published class, staffing, and equipment are available.",
  },
  conditional: {
    label: "Conditional completion",
    detail: "Completion depends on staffing, equipment, conditions, or experiences that Camp Lawton cannot guarantee in advance.",
  },
  partial: {
    label: "Partial at camp",
    detail: "Some official requirements involve work or experiences beyond the camp session.",
  },
};

function individualEffort(effort: MeritBadgeSurveyItem["individualEffort"]) {
  if (effort.minimumHours === null) return "Not estimated";
  return `${effort.minimumHours}${effort.openEnded ? "+" : ""} hour${effort.minimumHours === 1 ? "" : "s"}${effort.context ? ` · ${effort.context}` : ""}`;
}

function prerequisiteContent(badgeId: string, fallback: string | null) {
  if (badgeId === "emergency-preparedness") return <><Link href="/merit-badges/first-aid">First Aid merit badge</Link> is required.</>;
  return fallback ?? "None listed in the current Camp Lawton analysis";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const badge = meritBadgeSurveyCatalog.find((item) => item.id === slug);
  const resource = getMeritBadgeResource(slug);
  if (!badge || !resource) return { title: "Merit badge guide | Camp Lawton" };
  return {
    title: `${badge.title} merit badge | Camp Lawton`,
    description: `${resource.overview} Review Camp Lawton planning guidance and the current official Scouting America badge page.`,
  };
}

export default async function MeritBadgeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const badge = meritBadgeSurveyCatalog.find((item) => item.id === slug);
  const resource = getMeritBadgeResource(slug);
  if (!badge || !resource) notFound();

  const offering = programOfferings.find((item) => item.id === badge.id);
  const completion = completionCopy[badge.completion];
  const related = meritBadgeSurveyCatalog
    .filter((item) => item.area === badge.area && item.id !== badge.id)
    .slice(0, 6);
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
            <Link href="/merit-badges" className="badge-detail-back">← Program explorer</Link>
            <div className="badge-detail-heading">
              <div>
                <p className="section-kicker">Merit badge field guide</p>
                <h1>{badge.title}</h1>
                <p>{resource.overview}</p>
                <div className="badge-detail-tags">
                  <span>{badge.area}</span>
                  <span className={`completion-${badge.completion}`}>{completion.label}</span>
                  {resource.eagleRequired && <span>Eagle-required</span>}
                </div>
              </div>
              <aside className="badge-official-card">
                <span>Verified official source</span>
                <strong>Scouting America</strong>
                <p>Read the current requirements, updates, and available pamphlet resources on the official badge page.</p>
                <a href={resource.officialUrl} target="_blank" rel="noreferrer">
                  View official badge guide <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
                </a>
                <small>Official link reviewed {reviewedOn}</small>
              </aside>
            </div>
          </div>
        </header>

        <div className="badge-detail-content">
          <section className="badge-planning-summary" aria-labelledby="planning-summary-heading">
            <header>
              <p className="section-kicker">Camp planning snapshot</p>
              <h2 id="planning-summary-heading">Know what can happen at camp—and what may need more time.</h2>
              <p>{completion.detail}</p>
            </header>
            <dl>
              <div><dt>Program area</dt><dd>{badge.area}</dd></div>
              <div><dt>Source tier</dt><dd>Tier {badge.tier}</dd></div>
              <div><dt>Estimated class time</dt><dd>{badge.classHours} hour{badge.classHours === 1 ? "" : "s"}</dd></div>
              <div><dt>Estimated individual time</dt><dd>{individualEffort(badge.individualEffort)}</dd></div>
              <div><dt>Camp prerequisite</dt><dd>{prerequisiteContent(badge.id, badge.prerequisites)}</dd></div>
              <div><dt>Outside-camp work</dt><dd>{badge.unavailableAtCamp ?? "No unavailable requirement identified in the current analysis"}</dd></div>
            </dl>
          </section>

          {offering ? (
            <section className="badge-offering-panel" aria-labelledby="offering-heading">
              <div className="badge-offering-copy">
                <p className="section-kicker">Potential 2027 offering</p>
                <h2 id="offering-heading">How Camp Lawton is planning for this badge.</h2>
                <p>{offering.description}</p>
                <dl>
                  <div><dt>Viability</dt><dd>{offering.viability}</dd></div>
                  <div><dt>Difficulty</dt><dd>{offering.difficulty}</dd></div>
                  <div><dt>Age guidance</dt><dd>{offering.ageGuidance}</dd></div>
                  <div><dt>Preparation</dt><dd>{prerequisiteContent(badge.id, offering.prerequisites)}</dd></div>
                  <div><dt>Expected outside work</dt><dd>{offering.outsideWork}</dd></div>
                  <div><dt>Capacity / fee</dt><dd>{offering.capacity} Scouts · {offering.fee ? `$${offering.fee} materials` : "No fee listed"}</dd></div>
                </dl>
              </div>
              <div className="badge-offering-slots">
                <span>Potential class times</span>
                {offering.slots.map((slot) => (
                  <Link href={`/my-plan?add=${slot.id}`} key={slot.id}>
                    <strong>{slot.label}</strong>
                    <small>{slot.location}</small>
                    <span>Add to plan →</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : (
            <section className="badge-interest-panel">
              <p className="section-kicker">Interest candidate</p>
              <h2>No 2027 class is scheduled yet.</h2>
              <p>This badge appears in the planning survey so units can help Camp Lawton understand demand. Selecting it does not create a class, reserve a seat, or guarantee completion.</p>
              <Link href="/pre-register">Share unit interest →</Link>
            </section>
          )}

          <aside className="badge-source-note">
            <div>
              <span>Official requirements govern advancement</span>
              <p>Camp estimates are planning guidance only. Scouts must complete the current requirements exactly as written and receive counselor approval.</p>
            </div>
            <div>
              <a href={resource.officialUrl} target="_blank" rel="noreferrer">Current {badge.title} requirements <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
              <a href={OFFICIAL_MERIT_BADGE_INDEX_URL} target="_blank" rel="noreferrer">Scouting America A–Z index <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </aside>

          {related.length > 0 && (
            <section className="related-badges" aria-labelledby="related-badges-heading">
              <header>
                <p className="section-kicker">Keep exploring</p>
                <h2 id="related-badges-heading">More from {badge.area}</h2>
              </header>
              <div>
                {related.map((item) => {
                  const relatedResource = getMeritBadgeResource(item.id);
                  return <Link href={`/merit-badges/${item.id}`} key={item.id}>
                    <span>Tier {item.tier} · {completionCopy[item.completion].label}</span>
                    <strong>{item.title}</strong>
                    <p>{relatedResource?.overview}</p>
                    <small>Open field guide →</small>
                  </Link>;
                })}
              </div>
            </section>
          )}
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
