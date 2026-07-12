import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PlannerClient from "../../components/PlannerClient";

export default async function MyPlanPage({ searchParams }: { searchParams: Promise<{ add?: string }> }) {
  const { add } = await searchParams;
  return <main><SiteHeader /><section className="page-intro planner-intro"><div><p className="section-kicker">Personal schedule builder</p><h1>Resolve conflicts before camp.</h1><p>Create a plan for each Scout. Exact overlaps are errors; short transitions, prerequisites, and duplicate selections are explained before export.</p></div></section><section className="page-content planner-page"><PlannerClient requestedSlot={add} /></section><SiteFooter /></main>;
}
