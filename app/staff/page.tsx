import Link from "next/link";
import { getDb } from "../../db";
import { alerts, articles, events, submissions } from "../../db/schema";
import { requireStaff } from "../staff-auth";

export default async function StaffDashboard() {
  const user = await requireStaff("/staff");
  let metrics = { submissions: 0, drafts: 0, events: 0, notices: 0 };
  try {
    const [submissionRows, articleRows, eventRows, noticeRows] = await Promise.all([getDb().select().from(submissions), getDb().select().from(articles), getDb().select().from(events), getDb().select().from(alerts)]);
    metrics = { submissions: submissionRows.filter((item) => item.status !== "closed").length, drafts: articleRows.filter((item) => item.status === "draft").length, events: eventRows.filter((item) => item.status === "published").length, notices: noticeRows.filter((item) => item.status === "active").length };
  } catch {}
  return <main className="staff-page"><div className="staff-shell"><header className="staff-top"><div><span>Camp Lawton staff</span><h1>Operations dashboard</h1><p>{user.displayName} · {user.role}</p></div><Link href="/">Open public site ↗</Link></header><section className="metric-grid"><article><span>Open planning submissions</span><strong>{metrics.submissions}</strong><Link href="/staff/submissions">Review submissions →</Link></article><article><span>Guide drafts</span><strong>{metrics.drafts}</strong><Link href="/staff/content">Open inventory →</Link></article><article><span>Published schedule events</span><strong>{metrics.events}</strong><Link href="/staff/schedule">Manage schedule →</Link></article><article><span>Active notices</span><strong>{metrics.notices}</strong><Link href="/staff/editor">Manage notices →</Link></article></section><nav className="staff-tools"><Link href="/staff/content"><span>Content</span><h2>Guide inventory</h2><p>Select any canonical article to draft, validate, publish, and review.</p></Link><Link href="/staff/schedule"><span>Schedule</span><h2>Event inventory</h2><p>Edit structured BSA and Cub events with immutable revisions.</p></Link><Link href="/staff/submissions"><span>Planning</span><h2>Submissions & demand</h2><p>Triage unit interest, aggregate badge demand, and export records.</p></Link></nav></div></main>;
}
