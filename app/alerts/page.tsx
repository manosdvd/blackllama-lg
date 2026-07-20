import type { Metadata } from "next";
import Link from "next/link";
import ConditionsPanel from "../../components/ConditionsPanel";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { getActiveNotices } from "../../lib/content-repository";

export const metadata: Metadata = {
  title: "Conditions & Notices",
  description: "Check official weather, fire, hazard, and Camp Lawton notice status before heading to camp.",
};

export default async function AlertsPage() {
  const notices = await getActiveNotices();
  return <main><SiteHeader current="/alerts" /><section className="page-intro alerts-intro"><div><p className="section-kicker">Conditions & notices</p><h1>Know what is current.</h1><p>Every source shows its status and timestamp. Website conditions supplement, but never replace, staff instructions or emergency direction at camp.</p></div></section><section className="page-content alerts-page"><aside className="conditions-guide-link"><div><p className="section-kicker">Prepare before conditions change</p><strong>Read the standing mountain risk advisory.</strong></div><Link href="/guide/preparation-training-and-risk-advisory">Preparation and risks →</Link></aside><ConditionsPanel /><section className="notice-list"><header><p className="section-kicker">Camp Lawton staff</p><h2>Active camp notices</h2></header>{notices.map((notice) => <article key={notice.id} className={`notice-${notice.urgency}`}><div><span>{notice.urgency}</span><time>{notice.updatedAt.toLocaleString()}</time></div><h3>{notice.title}</h3><p>{notice.summary}</p>{notice.instructions && <strong>{notice.instructions}</strong>}<small>Source: {notice.source}</small></article>)}</section></section><SiteFooter /></main>;
}
