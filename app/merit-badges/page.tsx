import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import ProgramExplorer from "../../components/ProgramExplorer";
import { programOfferings } from "../../lib/camp-catalog";

export default function MeritBadgesPage() {
  return <main><SiteHeader current="/merit-badges" /><section className="page-intro programs-intro"><div><p className="section-kicker">Program explorer</p><h1>Build a better day for every Scout.</h1><p>Compare potential 2027 offerings by badge, time, or program area. Capacity and viability are planning guidance until staff publishes the final catalog.</p></div></section><section className="page-content"><ProgramExplorer offerings={programOfferings} /></section><SiteFooter /></main>;
}
