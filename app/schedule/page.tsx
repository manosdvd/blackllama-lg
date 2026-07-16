import type { Metadata } from "next";
import ProgramPlanningPaused from "../../components/ProgramPlanningPaused";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ScheduleExplorer from "../../components/ScheduleExplorer";
import { getPublishedSchedules } from "../../lib/content-repository";
import { PROGRAM_PLANNING_PUBLISHED } from "../../lib/site-features";

export const metadata: Metadata = PROGRAM_PLANNING_PUBLISHED
  ? { title: "2027 camp schedule" }
  : { title: "2027 program schedule in development", robots: { index: false, follow: false } };

export default async function SchedulePage() {
  if (!PROGRAM_PLANNING_PUBLISHED) return <ProgramPlanningPaused tool="schedule" />;
  const { bsaEvents, cubEvents } = await getPublishedSchedules();
  return <main><SiteHeader current="/schedule" /><section className="page-intro schedule-intro"><div><p className="section-kicker">2027 agenda</p><h1>See the shape of camp.</h1><p>Switch between BSA weeks and Cub Weekend, filter the agenda, and open any event without losing the day&apos;s context.</p></div></section><section className="page-content"><ScheduleExplorer bsaEvents={bsaEvents} cubEvents={cubEvents} /></section><SiteFooter /></main>;
}
