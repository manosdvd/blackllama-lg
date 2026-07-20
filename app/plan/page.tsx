import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { sessions } from "../../lib/camp-catalog";

export const metadata: Metadata = {
  title: "2027 Camp Sessions",
  description: "Compare Camp Lawton's 2027 session dates and follow the preparation path from planning to arrival.",
};

export default function PlanPage() {
  return <main><SiteHeader current="/plan" /><section className="page-intro plan-intro"><div><p className="section-kicker">2027 camp</p><h1>Choose the right session.</h1><p>Compare the current session dates, prepare with the working Leader&apos;s Guide, and share non-binding attendance and program interest while details take shape.</p></div></section><section className="page-content">
    <div className="session-catalog">{sessions.map((session) => <article key={session.id} className={`session-card ${session.program}`}><div><span>{session.program === "bsa" ? "BSA Scouts" : "Cub Scouts"}</span><h2>{session.name}</h2><strong>{session.dates}</strong><p>{session.note}</p></div><dl><div><dt>Arrival</dt><dd>{session.arrival}</dd></div><div><dt>Departure</dt><dd>{session.departure}</dd></div></dl><Link href="/guide/dates-fees-and-registration">View current session guidance →</Link></article>)}</div>
    <section className="planning-steps"><div className="section-heading"><div><p className="section-kicker">Preparation path</p><h2>Move from dates to departure-ready.</h2></div></div><div>{[
      ["01", "Set the unit’s goals", "Start with Camp Lawton’s purpose and the outcomes leaders can help Scouts practice.", "/guide/camp-purpose-and-outcomes"],
      ["02", "Confirm dates and registration", "Review session timing, pending financial details, and the Black Pug handoff.", "/guide/dates-fees-and-registration"],
      ["03", "Build a balanced program", "Plan advancement, adventure, service, rest, and realistic alternatives.", "/guide/build-your-unit-program"],
      ["04", "Prepare documents and gear", "Use the packing and paperwork guidance before the unit meeting.", "/guide/packing-list"],
      ["05", "Check readiness and risks", "Prepare participants for mountain conditions and review the risk advisory.", "/guide/preparation-training-and-risk-advisory"],
      ["06", "Share program interests", "Submit non-binding attendance and badge-interest estimates.", "/pre-register"],
    ].map(([number, title, copy, href]) => <Link href={href} key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><i aria-hidden="true">→</i></Link>)}</div></section>
  </section><SiteFooter /></main>;
}
