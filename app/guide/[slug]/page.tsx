import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownContent, { extractMarkdownHeadings } from "../../../components/MarkdownContent";
import PackingListClient from "../../../components/PackingListClient";
import SiteHeader from "../../../components/SiteHeader";
import SiteFooter from "../../../components/SiteFooter";
import { getPublishedArticle } from "../../../lib/content-repository";
import { guidePathStatus, requirementsForPath } from "../../../lib/leader-guide-requirements";

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
  const articlePath = `/guide/${article.slug}`;
  const requirements = requirementsForPath(articlePath);
  const status = guidePathStatus(articlePath);
  const headings = extractMarkdownHeadings(article.body).filter((heading) => heading.level === 2);
  const statusLabel = status === "placeholder" ? "Details pending" : status === "mixed" ? "Includes clearly marked pending details" : status === "source-backed" ? "Current planning guidance" : undefined;

  return (
    <main>
      <SiteHeader current="/guide" />

      <article className={`article-page${isPackingList ? " packing-article-page" : ""}${hasTraditionGallery ? " tradition-article-page" : ""}`}>
        <nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/guide">Leader&apos;s guide</Link><span aria-hidden="true">/</span><span aria-current="page">{article.title}</span></nav>
        <header className="article-header">
          <p className="section-kicker">Prepare for camp</p>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          {statusLabel && <p className={`guide-status guide-status-${status}`}>{statusLabel}</p>}
          <dl>
            <div><dt>Applies to</dt><dd>{article.applicability}</dd></div>
            <div><dt>Last reviewed</dt><dd>{article.updatedAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</dd></div>
          </dl>
        </header>
        {!isPackingList && headings.length > 1 && <nav className="article-contents" aria-label="On this page"><strong>On this page</strong><ol>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol></nav>}
        {isPackingList ? <PackingListClient source={article.body} /> : <MarkdownContent source={article.body} />}
        {requirements.length > 0 && <aside className="article-requirements"><p className="section-kicker">Guide coverage</p><h2>Requirements addressed here</h2><ul>{requirements.map((requirement) => <li key={requirement.id}><a href={`#${requirement.anchor}`}>{requirement.label}</a><span>{requirement.standard}</span></li>)}</ul></aside>}
        <nav className="article-related" aria-label="Related guide pages"><strong>Keep planning</strong><div><Link href="/guide">Browse the full guide</Link><Link href="/guide/packing-list">Open the packing list</Link><Link href="/guide/dates-fees-and-registration">Check dates and registration</Link></div></nav>
      </article>
      <SiteFooter />
    </main>
  );
}
