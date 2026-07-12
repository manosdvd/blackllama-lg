import { and, asc, desc, eq, gt, isNull, lt, or } from "drizzle-orm";
import { getDb } from "../db";
import { alerts, articleRevisions, articles, events, locations } from "../db/schema";
import {
  arrivalArticle,
  mondaySchedule,
  planningNotice,
  type PublicArticle,
  type PublicNotice,
  type PublicScheduleEvent,
} from "./public-content";
import { bsaSchedule, cubSchedule, findGuideArticle } from "./camp-catalog";

export async function getPublishedArticle(slug: string): Promise<PublicArticle | null> {
  try {
    const [article] = await getDb().select().from(articles)
      .where(and(eq(articles.slug, slug), eq(articles.status, "published"))).limit(1);
    if (article) {
      return {
        title: article.title, slug: article.slug, summary: article.summary, body: article.body,
        applicability: article.applicability ?? "All sessions", priority: article.priority ?? "normal",
        updatedAt: article.reviewedAt ?? article.publishedAt ?? article.updatedAt,
      };
    }
  } catch {
    // The canonical fallback keeps the public guide usable before local D1 is migrated.
  }
  return findGuideArticle(slug) ?? null;
}

export async function getArticleForEditor(slug: string) {
  try {
    const [article] = await getDb().select().from(articles).where(eq(articles.slug, slug)).limit(1);
    if (article) {
      const revisions = await getDb().select({
        revision: articleRevisions.revision,
        status: articleRevisions.status,
        author: articleRevisions.author,
        createdAt: articleRevisions.createdAt,
      }).from(articleRevisions).where(eq(articleRevisions.articleId, article.id))
        .orderBy(desc(articleRevisions.revision)).limit(8);
      return {
        article: {
          title: article.title, slug: article.slug, summary: article.summary, body: article.body,
          applicability: article.applicability ?? "All sessions",
        },
        revisions,
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
    if (event) return event;
  } catch {}
  const fallback = [...bsaSchedule, ...cubSchedule].find((event) => event.id === id) ?? bsaSchedule[0];
  return { id: fallback.id, title: fallback.title, summary: fallback.summary, kind: fallback.kind, dayOfWeek: fallback.day, startTime: fallback.startTime, endTime: fallback.endTime, audience: fallback.audience, isRequired: fallback.required, whatToBring: fallback.whatToBring, accessibilityNotes: fallback.accessibilityNotes };
}

export async function getPublishedSchedule(day: string): Promise<PublicScheduleEvent[]> {
  try {
    const rows = await getDb().select({ event: events, locationName: locations.name }).from(events)
      .leftJoin(locations, eq(events.locationId, locations.id))
      .where(and(eq(events.dayOfWeek, day), eq(events.status, "published")))
      .orderBy(asc(events.startTime));
    if (rows.length) {
      return rows.map(({ event, locationName }) => ({
        id: event.id, day: event.dayOfWeek, startTime: event.startTime, endTime: event.endTime,
        title: event.title, summary: event.summary, kind: event.kind,
        location: locationName ?? "Location announced", audience: event.audience ?? "All camp",
        required: event.isRequired ?? false, whatToBring: event.whatToBring,
        accessibilityNotes: event.accessibilityNotes,
      }));
    }
  } catch {
    // See the article fallback note above.
  }
  const canonical = bsaSchedule.filter((event) => event.day === day);
  return canonical.length ? canonical : day === "Monday" ? mondaySchedule : [];
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
