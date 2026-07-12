import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent from "../../../components/MarkdownContent";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { getPublishedArticle } from "../../../lib/content-repository";

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <SiteHeader current="/guide" />

      <article className="article-page">
        <Link href="/guide" className="article-back">← Leader&apos;s guide</Link>
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
      <SiteFooter />
    </main>
  );
}
