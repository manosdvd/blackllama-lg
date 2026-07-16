import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { sessions } from "../../lib/camp-catalog";

export default function PlanPage() {
  return <main><SiteHeader current="/plan" /><section className="page-intro plan-intro"><div><p className="section-kicker">2027 camp</p><h1>Choose the right session.</h1><p>Compare the current session dates, prepare with the working Leader&apos;s Guide, and share non-binding attendance and program interest while details take shape.</p></div></section><section className="page-content">
    <div className="session-catalog">{sessions.map((session) => <article key={session.id} className={`session-card ${session.program}`}><div><span>{session.program === "bsa" ? "BSA Scouts" : "Cub Scouts"}</span><h2>{session.name}</h2><strong>{session.dates}</strong><p>{session.note}</p></div><dl><div><dt>Arrival</dt><dd>{session.arrival}</dd></div><div><dt>Departure</dt><dd>{session.departure}</dd></div></dl><Link href="/guide/dates-fees-and-registration">View current session guidance →</Link></article>)}</div>
    <section className="planning-steps"><div className="section-heading"><div><p className="section-kicker">Preparation path</p><h2>Move from dates to departure-ready.</h2></div></div><div>{[
      ["01", "Confirm dates and registration", "Review session timing and understand the Black Pug handoff.", "/guide/dates-fees-and-registration"],
      ["02", "Prepare documents and gear", "Use the packing and paperwork guidance before the unit meeting.", "/guide/packing-list"],
      ["03", "Share badge interests", "Tell staff which badge subjects would serve your Scouts; this is not a final catalog.", "/merit-badges"],
      ["04", "Pre-register your unit", "Submit non-binding attendance and program-interest estimates.", "/pre-register"],
    ].map(([number, title, copy, href]) => <Link href={href} key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><i aria-hidden="true">→</i></Link>)}</div></section>
  </section><SiteFooter /></main>;
}
