import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import MeritBadgeDirectory, { type MeritBadgeDirectoryItem } from "../../components/MeritBadgeDirectory";
import { meritBadgeSurveyCatalog } from "../../lib/merit-badge-survey.generated";
import { getMeritBadgeResource, OFFICIAL_MERIT_BADGE_INDEX_URL } from "../../lib/merit-badge-resources";

export const metadata: Metadata = {
  title: "Merit Badge Interest Survey",
  description: "Explore merit badge subjects and share non-binding unit interest to help Camp Lawton plan its 2027 program.",
};

export default function MeritBadgesPage() {
  const directoryItems = meritBadgeSurveyCatalog.flatMap((badge): MeritBadgeDirectoryItem[] => {
    const resource = getMeritBadgeResource(badge.id);
    return resource ? [{ id: badge.id, title: badge.title, area: badge.area, tier: badge.tier, completion: badge.completion, overview: resource.overview, eagleRequired: resource.eagleRequired }] : [];
  });
  return <main><SiteHeader current="/merit-badges" /><section className="page-intro programs-intro"><div><p className="section-kicker">Merit badge interest survey</p><h1>Help shape the 2027 program.</h1><p>Tell Camp Lawton which badge subjects would matter most to your Scouts. The final badge list and class schedule are still in development.</p></div></section><section className="page-content"><aside className="badge-source-banner"><div><span>Important · survey candidates, not a catalog</span><strong>Interest now can lead to better program decisions later.</strong><p>The 84 topics below provide a broad research list for unit feedback. Their presence does not mean Camp Lawton will offer them, and the survey does not reserve a class or seat. Prerequisites, required materials, and activity-specific equipment remain pending until the final catalog is approved.</p></div><div className="badge-source-actions"><Link className="button" href="/pre-register">Share unit interest</Link><Link href="/guide/program-requirements-and-materials">Requirements guide →</Link><a href={OFFICIAL_MERIT_BADGE_INDEX_URL} target="_blank" rel="noreferrer">Official A–Z <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div></aside><MeritBadgeDirectory items={directoryItems} /></section><SiteFooter /></main>;
}
