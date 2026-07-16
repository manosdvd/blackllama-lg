import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent from "../../../components/MarkdownContent";
import PackingListClient from "../../../components/PackingListClient";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { getPublishedArticle } from "../../../lib/content-repository";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) return { title: "Guide article not found" };
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/guide/${article.slug}` },
    openGraph: { title: article.title, description: article.summary, url: `/guide/${article.slug}` },
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);
  if (!article) notFound();
  const isPackingList = article.slug === "packing-list";
  const hasTraditionGallery = article.slug === "history-and-camp-spirit";

  return (
    <main>
      <SiteHeader current="/guide" />

      <article className={`article-page${isPackingList ? " packing-article-page" : ""}${hasTraditionGallery ? " tradition-article-page" : ""}`}>
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
        {isPackingList ? <PackingListClient source={article.body} /> : <MarkdownContent source={article.body} />}
      </article>
      <SiteFooter />
    </main>
  );
}
