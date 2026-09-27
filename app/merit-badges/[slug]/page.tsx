import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../../components/SiteFooter";
import SiteHeader from "../../../components/SiteHeader";
import { getCampLawtonOfferedBadge } from "../../../lib/camp-lawton-merit-badges";
import { meritBadgeReferenceCatalog } from "../../../lib/merit-badge-reference.generated";
import { getMeritBadgeResource, OFFICIAL_MERIT_BADGE_INDEX_URL } from "../../../lib/merit-badge-resources";
import { getOfficialBadgeData } from "../../../lib/official-merit-badge-requirements";
import { OFFICIAL_REGISTRATION_URL, MERIT_BADGE_CATALOG_URL } from "../../../lib/registration";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offered = getCampLawtonOfferedBadge(slug);
  const officialData = getOfficialBadgeData(slug);

  if (offered) {
    const summary = officialData?.overview || offered.overview;
    return {
      title: `${offered.title} Merit Badge · Camp Lawton 2027`,
      description: `${summary} Scheduled in ${offered.periods.join(", ")} at Camp Lawton Summer Camp 2027.`,
    };
  }

  const badge = meritBadgeReferenceCatalog.find((item) => item.id === slug);
  const resource = getMeritBadgeResource(slug);
  if (!badge || !resource) return { title: "Merit badge not found" };

  return {
    title: `${badge.title} Merit Badge · Camp Lawton 2027`,
    description: `${resource.overview} Scouts BSA merit badge guidance for Camp Lawton Summer Camp 2027.`,
    robots: { index: false, follow: true },
  };
}

export default async function MeritBadgeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const offered = getCampLawtonOfferedBadge(slug);
  const referenceBadge = meritBadgeReferenceCatalog.find((item) => item.id === slug);
  const resource = getMeritBadgeResource(slug);
  const officialData = getOfficialBadgeData(slug);

  // If not in offered and not in reference, return 404
  if (!offered && (!referenceBadge || !resource)) {
    notFound();
  }

  const title = offered?.title ?? referenceBadge?.title ?? "";
  const area = offered?.area ?? referenceBadge?.area ?? "";
  const badgeSummary = officialData?.overview || offered?.overview || resource?.overview || "";
  const eagleRequired = offered?.eagleRequired ?? resource?.eagleRequired ?? false;
  const officialUrl = offered?.officialUrl ?? resource?.officialUrl ?? OFFICIAL_MERIT_BADGE_INDEX_URL;

  const reviewedDate = resource?.reviewedOn
    ? new Date(`${resource.reviewedOn}T12:00:00Z`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : "Summer 2027";

  const hasPrereqs = Boolean(offered?.prereqDetails && offered.prereqDetails.length > 0);

  return (
    <main className="badge-detail-page">
      <SiteHeader current="/merit-badges" />
      <article>
        <header className="badge-detail-hero">
          <div className="badge-detail-hero-inner">
            <Link href="/merit-badges" className="badge-detail-back">
              ← Back to 2027 Merit Badge Program
            </Link>
            <div className="badge-detail-heading">
              <div>
                <p className="section-kicker">
                  {offered ? "Camp Lawton 2027 Scheduled Course" : "Scouts BSA Merit Badge Reference"}
                </p>
                <h1>{title}</h1>
                <p>{badgeSummary}</p>
                <div className="badge-detail-tags">
                  <span>{area}</span>
                  <span>{offered?.id.startsWith("tfc-") ? "Rank Advancement" : "Merit Badge"}</span>
                  {eagleRequired && <span className="eagle-badge-tag">★ Eagle-Required</span>}
                  {offered && <span className="scheduled-badge-tag">{offered.periods.join(", ")}</span>}
                </div>
              </div>

              <aside className="badge-official-card">
                <span>Verified Official Source</span>
                <strong>Scouting America</strong>
                <p>Use the official requirement guide for updates, workbooks, and pamphlet resources.</p>
                <a href={officialUrl} target="_blank" rel="noreferrer">
                  View Official Badge Guide <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <small>Requirements reviewed {reviewedDate}</small>
              </aside>
            </div>
          </div>
        </header>

        <div className="badge-detail-content">
          {offered ? (
            <>
              {/* =============================================================== */}
              {/* BADGE SUMMARY CARD */}
              {/* =============================================================== */}
              <section className="badge-summary-callout">
                <span className="summary-callout-kicker">Scouting America Badge Summary</span>
                <h2>About the {title} {offered.id.startsWith("tfc-") ? "Program" : "Merit Badge"}</h2>
                <p className="summary-callout-text">{badgeSummary}</p>
              </section>

              {/* =============================================================== */}
              {/* 2027 SCHEDULED COURSE LOGISTICS */}
              {/* =============================================================== */}
              <section className="badge-scheduled-spec-card">
                <div className="spec-card-header">
                  <span className="spec-status-pill">Official 2027 Schedule</span>
                  <h2>Course Logistics &amp; Class Details</h2>
                  <p>
                    Sourced directly from the official 2027 Camp Lawton Leader&apos;s Guide. Registration for this course opens
                    February 1, 2027 on Black Pug for registered summer camp units.
                  </p>
                </div>

                <div className="spec-grid">
                  <div className="spec-item">
                    <span className="spec-label">Class Schedule</span>
                    <strong className="spec-value">{offered.periods.join(", ")}</strong>
                    <small>{offered.isDoublePeriod ? "Double period course (2 consecutive hours)" : "1 period daily"}</small>
                  </div>

                  <div className="spec-item">
                    <span className="spec-label">Class Capacity</span>
                    <strong className="spec-value">Max {offered.maxScouts} Scouts</strong>
                    <small>Strict cap to ensure safety and individual instruction</small>
                  </div>

                  <div className="spec-item">
                    <span className="spec-label">Counselor of Record</span>
                    <strong className="spec-value">{offered.counselor}</strong>
                    <small>Qualified adult merit badge counselor</small>
                  </div>

                  <div className="spec-item">
                    <span className="spec-label">Prerequisites &amp; Pre-work</span>
                    <strong className="spec-value">{offered.prereqs}</strong>
                    <small>
                      {offered.hasCampResearchPrereq
                        ? "* Research requirements can be completed at camp outside class time"
                        : offered.prereqs === "None"
                        ? "No prior requirements before camp"
                        : "Complete prior to camp or bring required documentation"}
                    </small>
                  </div>

                  <div className="spec-item">
                    <span className="spec-label">Materials &amp; Fees</span>
                    <strong className="spec-value">
                      {offered.cost ? `${offered.cost.trim()} Supply Fee` : "No additional fee"}
                    </strong>
                    <small>{offered.costDetails ?? "All standard class materials included"}</small>
                  </div>

                  <div className="spec-item">
                    <span className="spec-label">Requirements Edition</span>
                    <strong className="spec-value">{offered.reqYear} Requirements</strong>
                    <small>{offered.otherInfo ?? "Standard outdoor camp curriculum"}</small>
                  </div>
                </div>

                {/* PREREQUISITES BREAKDOWN */}
                <div className={`badge-prereqs-detail-card ${hasPrereqs ? "has-prereqs" : "is-clean"}`}>
                  <div className="prereqs-detail-header">
                    <span className="prereqs-detail-kicker">
                      {hasPrereqs ? "Pre-Camp Homework & Requirements" : "Advancement Notice"}
                    </span>
                    <h3>{hasPrereqs ? `Prerequisites for ${title}` : "Zero Pre-Camp Homework"}</h3>
                    <p>
                      {hasPrereqs
                        ? "The following requirements are sourced directly from the Camp Lawton Leader's Guide Prerequisite schedule. Completing them in advance prevents post-camp partials."
                        : `All requirements for ${title} will be completed on-site during camp sessions. No advance preparation is required.`}
                    </p>
                  </div>

                  {hasPrereqs && (
                    <div className="prereqs-detail-list">
                      {offered.prereqDetails.map((req, idx) => (
                        <article key={idx} className="prereq-detail-entry">
                          <div className="prereq-detail-top">
                            <span className="prereq-detail-badge">{req.reqNumber}</span>
                            <strong>{req.summary}</strong>
                            {req.campNote && <span className="prereq-camp-pill">{req.campNote}</span>}
                          </div>
                          {req.fullText && (
                            <div className="prereq-full-text">
                              <p>{req.fullText}</p>
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  )}
                </div>

                {offered.hasCampResearchPrereq && (
                  <div className="spec-alert-box">
                    <strong>Camp Research Note (*)</strong>
                    <p>
                      Requirements marked with an asterisk (*) represent research items that Scouts may choose to complete
                      at camp during open program time or twilight hours, outside of regular class sessions.
                    </p>
                  </div>
                )}
              </section>

              {/* =============================================================== */}
              {/* COMPLETE OFFICIAL REQUIREMENTS SECTION */}
              {/* =============================================================== */}
              <section className="badge-official-requirements-section">
                <div className="requirements-section-header">
                  <span className="requirements-kicker">Official Scouting America Advancement</span>
                  <h2>Complete Requirements for {title}</h2>
                  <p>
                    These are the complete official requirements from Scouting America.
                    Scouts at Camp Lawton will work with their counselor of record ({offered.counselor}) to complete these requirements.
                  </p>
                </div>

                {officialData?.dualBadges ? (
                  // Dual badge view (e.g. Soil & Water Conservation and Fish & Wildlife Management)
                  <div className="dual-badges-container">
                    {officialData.dualBadges.map((dualBadge, dIdx) => (
                      <div key={dIdx} className="dual-badge-card">
                        <div className="dual-badge-card-header">
                          <span className="dual-badge-kicker">Official Merit Badge</span>
                          <h3>{dualBadge.title}</h3>
                          <p>{dualBadge.overview}</p>
                        </div>
                        <ol className="official-requirements-list">
                          {dualBadge.requirements.map((req, rIdx) => (
                            <li key={rIdx} className="official-req-item">
                              <div className="req-header">
                                {req.number && <span className="req-number-badge">{req.number}</span>}
                                <div className="req-text-body">{req.text}</div>
                              </div>
                              {req.subRequirements.length > 0 && (
                                <ul className="req-sub-list">
                                  {req.subRequirements.map((sub, sIdx) => (
                                    <li key={sIdx} className="req-sub-item">
                                      {sub}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ol>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Standard requirements view
                  <ol className="official-requirements-list">
                    {officialData?.requirements.map((req, rIdx) => (
                      <li key={rIdx} className="official-req-item">
                        <div className="req-header">
                          {req.number && <span className="req-number-badge">{req.number}</span>}
                          <div className="req-text-body">{req.text}</div>
                        </div>
                        {req.subRequirements.length > 0 && (
                          <ul className="req-sub-list">
                            {req.subRequirements.map((sub, sIdx) => (
                              <li key={sIdx} className="req-sub-item">
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ol>
                )}

                <div className="badge-spec-actions" style={{ marginTop: "36px" }}>
                  <a className="button" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
                    Register on Black Pug ↗
                  </a>
                  <a className="button button-secondary" href={MERIT_BADGE_CATALOG_URL} target="_blank" rel="noreferrer">
                    SBSA 2027 Badge Catalog ↗
                  </a>
                  <Link href="/merit-badges" className="button button-secondary">
                    Browse All 43 Offered Badges →
                  </Link>
                </div>
              </section>
            </>
          ) : (
            // =================================================================
            // NON-OFFERED ADVISORY
            // =================================================================
            <section className="badge-registration-panel">
              <div className="badge-advisory-banner">
                <span className="advisory-kicker">Not Scheduled at Camp Lawton for 2027</span>
                <p>
                  <strong>{title}</strong> is part of the general Scouts BSA advancement library, but is{" "}
                  <strong>not offered</strong> at Camp Lawton for Summer Camp 2027. Camp Lawton offers 43 specialized
                  courses selected for our 8,000-foot alpine mountain setting.
                </p>
                <Link href="/merit-badges" className="button">
                  View the 43 Badges Offered at Camp Lawton 2027 →
                </Link>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "24px" }}>
                <a className="button button-secondary" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
                  Register on Black Pug ↗
                </a>
                <a className="button button-secondary" href={MERIT_BADGE_CATALOG_URL} target="_blank" rel="noreferrer">
                  SBSA 2027 Badge Catalog ↗
                </a>
              </div>
            </section>
          )}

          <aside className="badge-source-note">
            <div>
              <span>Official requirements govern advancement</span>
              <p>
                Scouts working toward {title} must complete the requirements in effect and receive registered counselor approval. Check the official SBSA Summer 2027 Merit Badge Catalog document for any badge-specific fees or materials.
              </p>
            </div>
            <div>
              <a href={officialUrl} target="_blank" rel="noreferrer">
                Current {title} requirements <span aria-hidden="true">↗</span>
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
