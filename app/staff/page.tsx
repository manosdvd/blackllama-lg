import Link from "next/link";
import { count, eq } from "drizzle-orm";
import { getDb } from "../../db";
import { alerts, articles } from "../../db/schema";
import { OFFICIAL_REGISTRATION_URL } from "../../lib/registration";
import { requireStaff } from "../staff-auth";

export default async function StaffDashboard() {
  const user = await requireStaff("/staff");
  const canPublish = user.role === "director" || user.role === "program-director";
  let metrics = { drafts: 0, notices: 0 };
  let databaseAvailable = true;

  try {
    const [articleRows, noticeRows] = await Promise.all([
      getDb().select({ value: count() }).from(articles).where(eq(articles.status, "draft")),
      getDb().select({ value: count() }).from(alerts).where(eq(alerts.status, "active")),
    ]);
    metrics = {
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
      {canPublish && <article><span>Guide drafts</span><strong>{metrics.drafts}</strong><Link href="/staff/content">Open inventory →</Link></article>}
      {canPublish && <article><span>Active notices</span><strong>{metrics.notices}</strong><Link href="/staff/editor">Manage notices →</Link></article>}
    </section>
    <nav className="staff-tools" aria-label="Staff tools">
      {canPublish && <Link href="/staff/content"><span>Content</span><h2>Guide inventory</h2><p>Select any canonical article to draft, validate, publish, and review.</p></Link>}
      <a href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer"><span>Registration</span><h2>Official council event ↗</h2><p>Open Black Pug for 2027 registration, session details, and the merit badge catalog.</p></a>
    </nav>
    {!canPublish && <p className="staff-data-warning">Your assigned role does not include publishing access.</p>}
  </div></main>;
}
