import Link from "next/link";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function ProgramPlanningPaused({ tool }: { tool: "schedule" | "planner" }) {
  const isPlanner = tool === "planner";
  return <main>
    <SiteHeader />
    <section className="page-intro schedule-intro">
      <div>
        <p className="section-kicker">2027 program update</p>
        <h1>{isPlanner ? "Personal schedule planning is paused." : "The 2027 schedule is in development."}</h1>
        <p>Merit badge offerings and class times are not final. We have taken the working schedule and planner out of public use so units do not make decisions from draft information.</p>
      </div>
    </section>
    <section className="page-content planning-paused">
      <div>
        <p className="section-kicker">Help shape the program</p>
        <h2>Tell us what would make camp valuable for your Scouts.</h2>
        <p>The non-binding planning survey collects estimated attendance and merit badge interest. Staff can use that demand to make better program, staffing, and equipment decisions.</p>
        <div className="planning-paused-actions">
          <Link className="button" href="/pre-register">Start the planning survey</Link>
          <Link className="button button-secondary" href="/merit-badges">About the badge survey</Link>
        </div>
      </div>
      <aside>
        <strong>What is available now</strong>
        <ul>
          <li>The working Leader&apos;s Guide, with policies and arrival preparation</li>
          <li>2027 session dates and non-binding pre-registration</li>
          <li>Merit badge interest collection—not a class reservation</li>
          <li>Camp history, map, conditions, and official notices</li>
        </ul>
        <Link href="/guide">Open the Leader&apos;s Guide →</Link>
      </aside>
    </section>
    <SiteFooter />
  </main>;
}
