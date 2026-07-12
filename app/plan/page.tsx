import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { sessions } from "../../lib/camp-catalog";

export default function PlanPage() {
  return <main><SiteHeader current="/plan" /><section className="page-intro plan-intro"><div><p className="section-kicker">Plan your camp</p><h1>Choose the right 2027 session.</h1><p>Compare arrival patterns, then move through paperwork, packing, schedules, and unit planning without losing the session differences that matter.</p></div></section><section className="page-content">
    <div className="session-catalog">{sessions.map((session) => <article key={session.id} className={`session-card ${session.program}`}><div><span>{session.program === "bsa" ? "BSA Scouts" : "Cub Scouts"}</span><h2>{session.name}</h2><strong>{session.dates}</strong><p>{session.note}</p></div><dl><div><dt>Arrival</dt><dd>{session.arrival}</dd></div><div><dt>Departure</dt><dd>{session.departure}</dd></div></dl><Link href={session.program === "cub" ? "/guide/cub-weekend-program" : "/guide/daily-rhythm-and-program"}>View session guidance →</Link></article>)}</div>
    <section className="planning-steps"><div className="section-heading"><div><p className="section-kicker">Preparation path</p><h2>Move from dates to departure-ready.</h2></div></div><div>{[
      ["01", "Confirm dates and registration", "Review session timing and understand the Black Pug handoff.", "/guide/dates-fees-and-registration"],
      ["02", "Prepare documents and gear", "Use the packing and paperwork guidance before the unit meeting.", "/guide/packing-list"],
      ["03", "Build Scout schedules", "Compare badge slots and resolve exact or travel-time conflicts.", "/my-plan"],
      ["04", "Share planning demand", "Submit non-binding attendance and badge interest estimates.", "/pre-register"],
    ].map(([number, title, copy, href]) => <Link href={href} key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><i aria-hidden="true">→</i></Link>)}</div></section>
  </section><SiteFooter /></main>;
}
