import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import MeritBadgeDirectory, { type MeritBadgeDirectoryItem } from "../../components/MeritBadgeDirectory";
import ProgramExplorer from "../../components/ProgramExplorer";
import { programOfferings } from "../../lib/camp-catalog";
import { meritBadgeSurveyCatalog } from "../../lib/merit-badge-survey.generated";
import { getMeritBadgeResource, OFFICIAL_MERIT_BADGE_INDEX_URL } from "../../lib/merit-badge-resources";

export default function MeritBadgesPage() {
  const directoryItems = meritBadgeSurveyCatalog.flatMap((badge): MeritBadgeDirectoryItem[] => {
    const resource = getMeritBadgeResource(badge.id);
    return resource ? [{ id: badge.id, title: badge.title, area: badge.area, tier: badge.tier, completion: badge.completion, overview: resource.overview, eagleRequired: resource.eagleRequired }] : [];
  });
  return <main><SiteHeader current="/merit-badges" /><section className="page-intro programs-intro"><div><p className="section-kicker">Program explorer</p><h1>Build a better day for every Scout.</h1><p>Compare potential 2027 offerings by badge, time, or program area. Capacity and viability are planning guidance until staff publishes the final catalog.</p></div></section><section className="page-content"><aside className="badge-source-banner"><div><span>New · 84 badge field guides</span><strong>Camp decisions, grounded in the official badge program.</strong><p>Open any badge to compare its Scouting America focus with Camp Lawton prerequisites, workload, feasibility, and potential class times.</p></div><div className="badge-source-actions"><a href="#all-badge-guides">Browse all 84 ↓</a><a href={OFFICIAL_MERIT_BADGE_INDEX_URL} target="_blank" rel="noreferrer">Official A–Z <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div></aside><ProgramExplorer offerings={programOfferings} /><MeritBadgeDirectory items={directoryItems} /></section><SiteFooter /></main>;
}
