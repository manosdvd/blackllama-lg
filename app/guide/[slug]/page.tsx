import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "../../../components/MarkdownContent";
import { getPublishedArticle } from "../../../lib/content-repository";

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Camp Lawton home">
          <img src="/images/CLlogo.png" alt="" className="brand-mark" />
          <span><strong>Camp Lawton</strong><small>Leader Hub · 2027</small></span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#guide" aria-current="page">Guide</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/merit-badges">Programs</Link>
          <Link href="/#alerts">Alerts</Link>
        </nav>
      </header>

      <article className="article-page">
        <Link href="/#guide" className="article-back">← Leader&apos;s guide</Link>
        <header className="article-header">
          <p className="section-kicker">Prepare for camp</p>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          <dl>
            <div><dt>Applies to</dt><dd>{article.applicability}</dd></div>
            <div><dt>Last reviewed</dt><dd>{article.updatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</dd></div>
          </dl>
        </header>
        <MarkdownContent source={article.body} />
      </article>
    </main>
  );
}
