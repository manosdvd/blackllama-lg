import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import TraditionGallery from "../../components/TraditionGallery";
import TribeExplorer from "../../components/TribeExplorer";
import { getPublishedArticle } from "../../lib/content-repository";

export const metadata: Metadata = {
  title: "Tribe of Papago · Camp Lawton",
  description: "Explore the working Camp Lawton recognition tradition, its rank paths, Barker Standard, and credited archive material.",
  alternates: { canonical: "/tribe-of-papago" },
};

export default async function TribeOfPapagoPage() {
  const article = await getPublishedArticle("history-and-camp-spirit");
  const source = article?.body ?? "";
  return <main className="tribe-page">
    <SiteHeader current="/tribe-of-papago" />
    <section className="page-intro tribe-intro"><div><p className="section-kicker">Camp Lawton · Returning-camper tradition</p><h1>Tribe of Papago</h1><p>A living Camp Lawton recognition tradition shaped by return visits, service, leadership, trails, reflection, and Scout spirit. Explore the working requirements and the objects that carry its story.</p></div></section>
    <section className="page-content tribe-page-content"><TribeExplorer source={source} /><TraditionGallery /></section>
    <SiteFooter />
  </main>;
}
