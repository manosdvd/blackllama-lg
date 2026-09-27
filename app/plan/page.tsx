import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import { registrationSessions } from "../../lib/registration";

export const metadata: Metadata = {
  title: "2027 Camp Sessions · Camp Lawton",
  description: "Compare Camp Lawton's 2027 session dates, review fees and discounts, and register on Black Pug.",
};

import { OFFICIAL_REGISTRATION_URL } from "../../lib/registration";

export default function PlanPage() {
  return (
    <main>
      <SiteHeader current="/plan" />
      <section className="page-intro plan-intro">
        <div>
          <p className="section-kicker">2027 camp</p>
          <h1>Choose the right session.</h1>
          <p>
            Compare official 2027 session dates, review in-council and out-of-council fees, and register your unit or provisional Scouts on Black Pug.
          </p>
        </div>
      </section>

      <section className="page-content">
        <aside className="badge-source-banner" style={{ marginBottom: "36px" }}>
          <div>
            <span>Official Council Registration</span>
            <strong>Registration is Open for Summer Camp 2027</strong>
            <p>
              Week 1 (June 6–12, 2027) and Week 2 (June 13–19, 2027) are open for unit and provisional registration. Each session is limited to 150 youth participants. Register before December 31, 2026 to take advantage of Early Bird credits (in-council Scouts pay only $200).
            </p>
          </div>
          <div className="badge-source-actions">
            <a className="button" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">
              Register on Black Pug ↗
            </a>
            <Link className="button button-secondary" href="/register">
              View All Fees &amp; Details
            </Link>
          </div>
        </aside>

        <div className="session-catalog">
          {registrationSessions.map((session) => (
            <article key={session.id} className={`session-card ${session.program}`}>
              <div>
                <span>{session.program === "bsa" ? "BSA Scouts" : "Cub Scouts"}</span>
                <h2>{session.name}</h2>
                <strong>{session.dates}</strong>
                <p>{session.note}</p>
              </div>
              <dl>
                <div><dt>Arrival</dt><dd>{session.arrival}</dd></div>
                <div><dt>Departure</dt><dd>{session.departure}</dd></div>
                <div><dt>Registration closes</dt><dd>{session.registrationCloses}</dd></div>
              </dl>
              <a href={session.url} target="_blank" rel="noreferrer">Register for {session.shortName} ↗</a>
            </article>
          ))}
        </div>

        <section className="planning-steps">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Preparation path</p>
              <h2>Move from dates to departure-ready.</h2>
            </div>
          </div>
          <div>
            {[
              ["01", "Set the unit’s goals", "Start with Camp Lawton’s purpose and the outcomes leaders can help Scouts practice.", "/guide/camp-purpose-and-outcomes"],
              ["02", "Confirm dates and registration", "Review session timing, in-council and out-of-council fees, and early bird credits.", "/register"],
              ["03", "Build a balanced program", "Plan advancement, adventure, service, rest, and realistic alternatives.", "/guide/build-your-unit-program"],
              ["04", "Prepare documents and gear", "Use the packing and paperwork guidance before the unit meeting.", "/guide/packing-list"],
              ["05", "Check readiness and risks", "Prepare participants for mountain conditions and review the risk advisory.", "/guide/preparation-training-and-risk-advisory"],
              ["06", "Register on Black Pug", "Complete official unit or provisional registration and lock in Early Bird credits.", "/register"],
            ].map(([number, title, copy, href]) => (
              <Link href={href} key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <i aria-hidden="true">→</i>
              </Link>
            ))}
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
