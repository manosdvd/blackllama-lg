import Link from "next/link";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

import { OFFICIAL_REGISTRATION_URL } from "../lib/registration";

export default function ProgramPlanningPaused({ tool }: { tool: "schedule" | "planner" }) {
  const isPlanner = tool === "planner";
  return <main>
    <SiteHeader />
    <section className="page-intro schedule-intro">
      <div>
        <p className="section-kicker">2027 program update</p>
        <h1>{isPlanner ? "Personal schedule planning is paused." : "The 2027 schedule is in development."}</h1>
        <p>Official camp registration is open, and merit badge class registration opens February 1, 2027. We have taken the working schedule and planner out of public use so units do not make decisions from draft times.</p>
      </div>
    </section>
    <section className="page-content planning-paused">
      <div>
        <p className="section-kicker">Summer Camp 2027</p>
        <h2>Official registration is now open.</h2>
        <p>Official registration for Camp Lawton Summer Camp 2027 is live on Black Pug for Week 1 (June 6–12) and Week 2 (June 13–19). Merit badge class registration opens February 1, 2027.</p>
        <div className="planning-paused-actions">
          <a className="button" href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">Register on Black Pug ↗</a>
          <Link className="button button-secondary" href="/register">View registration details &amp; fees</Link>
        </div>
      </div>
      <aside>
        <strong>What is available now</strong>
        <ul>
          <li>Official registration on Black Pug for Week 1 (June 6–12) and Week 2 (June 13–19)</li>
          <li>Early Bird credits ($200 before 12/31/26; $100 before 3/31/27)</li>
          <li>The Leader&apos;s Guide with policies, packing lists, and arrival preparation</li>
          <li>Camp history, map, mountain conditions, and official notices</li>
        </ul>
        <a href={OFFICIAL_REGISTRATION_URL} target="_blank" rel="noreferrer">Open registration site ↗</a>
      </aside>
    </section>
    <SiteFooter />
  </main>;
}
