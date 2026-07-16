import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PreRegisterClient from "../../components/PreRegisterClient";

export default function PreRegisterPage() {
  return <main><SiteHeader /><section className="page-intro prereg-intro"><div><p className="section-kicker">2027 pre-registration</p><h1>Help Camp Lawton prepare for your unit.</h1><p>Share non-binding attendance estimates and merit badge interests so camp can plan a strong 2027 season. The final merit badge list and schedule are still in development; this survey does not reserve space or replace official registration.</p></div></section><section className="page-content prereg-page"><PreRegisterClient /></section><SiteFooter /></main>;
}
