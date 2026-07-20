import { and, desc, eq, gt, isNull, lt, or } from "drizzle-orm";
import { getDb } from "../db";
import { alerts, articleRevisions, articles, eventRevisions, events, locations } from "../db/schema";
import {
  arrivalArticle,
  mondaySchedule,
  planningNotice,
  type PublicArticle,
  type PublicNotice,
  type PublicScheduleEvent,
} from "./public-content";
import { bsaSchedule, cubSchedule, findGuideArticle, guideArticles, type GuideArticle } from "./camp-catalog";
import { isGuideArticlePublic } from "./site-features";
import { hasLeaderGuideRequirements } from "./leader-guide-requirements";

export async function getPublishedArticle(slug: string): Promise<PublicArticle | null> {
  if (!isGuideArticlePublic(slug)) return null;
  const fallback = findGuideArticle(slug);
  try {
    const [article] = await getDb().select().from(articles)
      .where(and(eq(articles.slug, slug), eq(articles.status, "published"))).limit(1);
    if (article) {
      return {
        title: article.title, slug: article.slug, summary: article.summary, body: article.body,
        applicability: article.applicability ?? "All sessions", priority: article.priority ?? "normal",
        updatedAt: article.reviewedAt ?? article.publishedAt ?? article.updatedAt,
        ...(fallback && hasLeaderGuideRequirements(slug) ? { body: fallback.body } : {}),
      };
    }
  } catch {
    // The canonical fallback keeps the public guide usable before local D1 is migrated.
  }
  return fallback ?? null;
}

export async function getPublishedGuideArticles(): Promise<GuideArticle[]> {
  const publicArticles = guideArticles.filter((article) => isGuideArticlePublic(article.slug));
  try {
    const rows = await getDb().select().from(articles).where(eq(articles.status, "published"));
    const published = new Map(rows.map((article) => [article.slug, article]));
    return publicArticles.map((fallback) => {
      const article = published.get(fallback.slug);
      return article ? {
        ...fallback,
        title: article.title,
        summary: article.summary,
        body: hasLeaderGuideRequirements(fallback.slug) ? fallback.body : article.body,
        applicability: article.applicability ?? fallback.applicability,
        priority: article.priority ?? fallback.priority,
        updatedAt: article.reviewedAt ?? article.publishedAt ?? article.updatedAt,
      } : fallback;
    });
  } catch {
    return publicArticles;
  }
}

export async function getArticleForEditor(slug: string) {
  try {
    const [article] = await getDb().select().from(articles).where(eq(articles.slug, slug)).limit(1);
    if (article) {
      const recentRevisions = await getDb().select().from(articleRevisions).where(eq(articleRevisions.articleId, article.id))
        .orderBy(desc(articleRevisions.revision)).limit(8);
      const latest = recentRevisions[0];
      return {
        article: {
          title: latest?.title ?? article.title, slug: article.slug, summary: latest?.summary ?? article.summary,
          body: latest?.body ?? article.body, applicability: latest?.applicability ?? article.applicability ?? "All sessions",
        },
        revisions: recentRevisions.map(({ revision, status, author, createdAt }) => ({ revision, status, author, createdAt })),
      };
    }
  } catch {
    // The staff editor can still open before local D1 is migrated.
  }
  return { article: findGuideArticle(slug) ?? arrivalArticle, revisions: [] };
}

export async function getEventForEditor(id: string) {
  try {
    const [event] = await getDb().select().from(events).where(eq(events.id, id)).limit(1);
    if (event) {
      const [latest] = await getDb().select().from(eventRevisions).where(eq(eventRevisions.eventId, event.id))
        .orderBy(desc(eventRevisions.revision)).limit(1);
      return latest ? { ...event, title: latest.title, summary: latest.summary, dayOfWeek: latest.dayOfWeek, startTime: latest.startTime, endTime: latest.endTime } : event;
    }
  } catch {}
  const fallback = [...bsaSchedule, ...cubSchedule].find((event) => event.id === id) ?? bsaSchedule[0];
  return { id: fallback.id, title: fallback.title, summary: fallback.summary, kind: fallback.kind, dayOfWeek: fallback.day, startTime: fallback.startTime, endTime: fallback.endTime, audience: fallback.audience, isRequired: fallback.required, whatToBring: fallback.whatToBring, accessibilityNotes: fallback.accessibilityNotes };
}

export async function getPublishedSchedule(day: string): Promise<PublicScheduleEvent[]> {
  const schedules = await getPublishedSchedules();
  return schedules.bsaEvents.filter((event) => event.day === day);
}

export async function getPublishedSchedules(): Promise<{ bsaEvents: PublicScheduleEvent[]; cubEvents: PublicScheduleEvent[] }> {
  try {
    const rows = await getDb().select({ event: events, locationName: locations.name }).from(events)
      .leftJoin(locations, eq(events.locationId, locations.id))
      .where(eq(events.status, "published"));
    if (rows.length) {
      const overrides = new Map(rows.map((row) => [row.event.id, row]));
      const overlay = (canonical: PublicScheduleEvent[]) => canonical.map((fallback) => {
        const row = overrides.get(fallback.id);
        if (!row) return fallback;
        const { event, locationName } = row;
        return {
          id: event.id, day: event.dayOfWeek, startTime: event.startTime, endTime: event.endTime,
          title: event.title, summary: event.summary, kind: event.kind,
          location: locationName ?? fallback.location, audience: event.audience ?? fallback.audience,
          required: event.isRequired ?? fallback.required, whatToBring: event.whatToBring,
          accessibilityNotes: event.accessibilityNotes,
        };
      });
      return { bsaEvents: overlay(bsaSchedule), cubEvents: overlay(cubSchedule) };
    }
  } catch {
    // See the article fallback note above.
  }
  return { bsaEvents: bsaSchedule.length ? bsaSchedule : mondaySchedule, cubEvents: cubSchedule };
}

export async function getActiveNotices(): Promise<PublicNotice[]> {
  const now = new Date();
  try {
    const rows = await getDb().select().from(alerts).where(and(
      eq(alerts.status, "active"),
      or(isNull(alerts.startTime), lt(alerts.startTime, now)),
      or(isNull(alerts.endTime), gt(alerts.endTime, now)),
    )).orderBy(desc(alerts.updatedAt));
    if (rows.length) {
      return rows.map((notice) => ({
        id: notice.id, title: notice.title, summary: notice.content,
        instructions: notice.instructions, urgency: notice.urgency,
        source: notice.source, updatedAt: notice.updatedAt,
      }));
    }
  } catch {
    // Local and first-deploy databases may not have migrations applied yet.
  }
  return [planningNotice];
}
