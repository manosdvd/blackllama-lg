import Link from "next/link";
import { guideArticles } from "../../../lib/camp-catalog";
import { requireStaffRole } from "../../staff-auth";

export default async function StaffContentPage() { await requireStaffRole("/staff/content", ["director", "program-director"]); return <main className="staff-page"><div className="staff-shell"><header className="staff-top"><div><span>Editorial inventory</span><h1>Guide content</h1><p>Select a canonical article to draft or publish.</p></div><Link href="/staff">Dashboard</Link></header><section className="staff-content-list">{guideArticles.map((article) => <article key={article.slug}><div><span>{article.category} · {article.audience}</span><h2>{article.title}</h2><p>{article.summary}</p></div><Link className="button button-small" href={`/staff/editor?article=${article.slug}`}>Edit</Link></article>)}</section></div></main>; }
