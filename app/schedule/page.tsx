import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ScheduleExplorer from "../../components/ScheduleExplorer";
import { bsaSchedule, cubSchedule } from "../../lib/camp-catalog";

export default function SchedulePage() {
  return <main><SiteHeader current="/schedule" /><section className="page-intro schedule-intro"><div><p className="section-kicker">2027 agenda</p><h1>See the shape of camp.</h1><p>Switch between BSA weeks and Cub Weekend, filter the agenda, and open any event without losing the day&apos;s context.</p></div></section><section className="page-content"><ScheduleExplorer bsaEvents={bsaSchedule} cubEvents={cubSchedule} /></section><SiteFooter /></main>;
}
