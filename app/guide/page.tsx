import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import GuideDirectory from "../../components/GuideDirectory";
import { getPublishedGuideArticles } from "../../lib/content-repository";

export const metadata: Metadata = {
  title: "2027 Leader's Guide",
  description: "Search Camp Lawton arrival, packing, safety, policy, and leader logistics for the 2027 season.",
};

export default async function GuidePage() {
  const articles = await getPublishedGuideArticles();
  return <main><SiteHeader current="/guide" /><section className="page-intro guide-intro"><div><p className="section-kicker">Working 2027 information</p><h1>Leader&apos;s Guide</h1><p>Camp preparation, policy, safety, and arrival information organized for search and scanning. The guide will continue to evolve; draft badge offerings and schedule-specific articles are withheld until program approval.</p></div></section><section className="page-content"><GuideDirectory articles={articles} /></section><SiteFooter /></main>;
}
