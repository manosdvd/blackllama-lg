import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PreRegisterClient from "../../components/PreRegisterClient";

export default function PreRegisterPage() {
  return <main><SiteHeader /><section className="page-intro prereg-intro"><div><p className="section-kicker">2027 planning survey</p><h1>Help camp prepare for your unit.</h1><p>Share non-binding attendance and program demand. The form saves progress in this browser and collects only the minimum information needed for planning.</p></div></section><section className="page-content prereg-page"><PreRegisterClient /></section><SiteFooter /></main>;
}
