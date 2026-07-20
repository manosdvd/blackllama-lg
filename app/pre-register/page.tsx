import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import PreRegisterClient from "../../components/PreRegisterClient";

export const metadata: Metadata = {
  title: "2027 Pre-registration",
  description: "Share non-binding unit attendance and program interest to help Camp Lawton prepare for the 2027 season.",
};

export default function PreRegisterPage() {
  return <main><SiteHeader current="/pre-register" /><section className="page-intro prereg-intro"><div><p className="section-kicker">2027 pre-registration</p><h1>Help Camp Lawton prepare for your unit.</h1><p>Share non-binding attendance estimates and merit badge interests so camp can plan a strong 2027 season. The final merit badge list and schedule are still in development; this survey does not reserve space or replace official registration.</p></div></section><section className="page-content prereg-page"><PreRegisterClient /></section><SiteFooter /></main>;
}
