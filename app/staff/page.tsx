import Link from "next/link";
import { count, eq, ne } from "drizzle-orm";
import { getDb } from "../../db";
import { alerts, articles, submissions } from "../../db/schema";
import { requireStaff } from "../staff-auth";

export default async function StaffDashboard() {
  const user = await requireStaff("/staff");
  const canPublish = user.role === "director" || user.role === "program-director";
  let metrics = { submissions: 0, drafts: 0, notices: 0 };
  let databaseAvailable = true;

  try {
    const [submissionRows, articleRows, noticeRows] = await Promise.all([
      user.role === "director"
        ? getDb().select({ value: count() }).from(submissions).where(ne(submissions.status, "closed"))
        : Promise.resolve([{ value: 0 }]),
      getDb().select({ value: count() }).from(articles).where(eq(articles.status, "draft")),
      getDb().select({ value: count() }).from(alerts).where(eq(alerts.status, "active")),
    ]);
    metrics = {
      submissions: submissionRows[0]?.value ?? 0,
      drafts: articleRows[0]?.value ?? 0,
      notices: noticeRows[0]?.value ?? 0,
    };
  } catch {
    databaseAvailable = false;
  }

  return <main className="staff-page"><div className="staff-shell">
    <header className="staff-top"><div><span>Camp Lawton staff</span><h1>Operations dashboard</h1><p>{user.displayName} · {user.role}</p></div><Link href="/">Open public site ↗</Link></header>
    {!databaseAvailable && <p className="staff-data-warning" role="alert">The camp database is unavailable. Counts and publishing tools may be incomplete; no records have been changed.</p>}
    <section className="metric-grid">
      {user.role === "director" && <article><span>Open planning submissions</span><strong>{metrics.submissions}</strong><Link href="/staff/submissions">Review submissions →</Link></article>}
      {canPublish && <article><span>Guide drafts</span><strong>{metrics.drafts}</strong><Link href="/staff/content">Open inventory →</Link></article>}
      {canPublish && <article><span>Active notices</span><strong>{metrics.notices}</strong><Link href="/staff/editor">Manage notices →</Link></article>}
    </section>
    <nav className="staff-tools" aria-label="Staff tools">
      {canPublish && <Link href="/staff/content"><span>Content</span><h2>Guide inventory</h2><p>Select any canonical article to draft, validate, publish, and review.</p></Link>}
      {user.role === "director" && <Link href="/staff/submissions"><span>Planning</span><h2>Submissions & demand</h2><p>Triage unit interest, aggregate badge demand, and export records.</p></Link>}
    </nav>
    {!canPublish && user.role !== "director" && <p className="staff-data-warning">Your assigned role does not include publishing or planning-submission access.</p>}
  </div></main>;
}
