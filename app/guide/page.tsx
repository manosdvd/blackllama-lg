import SiteHeader from "../../components/SiteHeader";
import SiteFooter from "../../components/SiteFooter";
import GuideDirectory from "../../components/GuideDirectory";
import { guideArticles } from "../../lib/camp-catalog";

export default function GuidePage() {
  return <main><SiteHeader current="/guide" /><section className="page-intro guide-intro"><div><p className="section-kicker">Canonical 2027 information</p><h1>Leader&apos;s Guide</h1><p>Reviewed camp information organized for search, scanning, and session-specific planning. Critical policies remain subject to current staff and official agency direction.</p></div></section><section className="page-content"><GuideDirectory articles={guideArticles} /></section><SiteFooter /></main>;
}
