import type { MetadataRoute } from "next";
import { guideArticles } from "../lib/camp-catalog";
import { absoluteSiteUrl } from "../lib/site-url";
import { isGuideArticlePublic } from "../lib/site-features";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = ["/", "/plan", "/guide", "/history", "/tribe-of-papago", "/map", "/merit-badges", "/alerts", "/pre-register", "/privacy", "/accessibility"];
  return [
    ...publicRoutes.map((path) => ({ url: absoluteSiteUrl(path), changeFrequency: path === "/alerts" ? "daily" as const : "weekly" as const, priority: path === "/" ? 1 : .7 })),
    ...guideArticles.filter((article) => isGuideArticlePublic(article.slug)).map((article) => ({ url: absoluteSiteUrl(`/guide/${article.slug}`), lastModified: article.updatedAt, changeFrequency: "monthly" as const, priority: .65 })),
  ];
}
