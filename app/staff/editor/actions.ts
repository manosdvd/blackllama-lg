"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { PROGRAM_PLANNING_PUBLISHED } from "../../../lib/site-features";
import { requireStaffRole } from "../../staff-auth";
import { getDb } from "../../../db";
import { alerts, articleRevisions, articles, eventRevisions, events } from "../../../db/schema";

export type EditorResult = { success: boolean; message: string };
const publishingRoles = ["director", "program-director"] as const;
class EditorValidationError extends Error {}

function required(formData: FormData, name: string, maxLength: number): string {
  const value = String(formData.get(name) ?? "").trim();
  if (!value) throw new EditorValidationError(`${name} is required.`);
  if (value.length > maxLength) throw new EditorValidationError(`${name} is too long.`);
  return value;
}

function optional(formData: FormData, name: string, maxLength: number): string | null {
  const value = String(formData.get(name) ?? "").trim();
  if (value.length > maxLength) throw new EditorValidationError(`${name} is too long.`);
  return value || null;
}

function safeMarkdown(value: string): string {
  if (/<\/?(?:script|iframe|object|embed|style)|\son\w+\s*=|javascript:/i.test(value)) {
    throw new EditorValidationError("Raw scripts, embeds, event handlers, and unsafe URLs are not allowed.");
  }
  return value;
}

function slugify(value: string): string {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  if (!slug) throw new EditorValidationError("A valid title is required to create the URL.");
  return slug;
}

function parseLocalDate(value: FormDataEntryValue | null): Date | null {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const local = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})(?::\d{2})?$/.exec(text);
  if (!local) throw new EditorValidationError("Enter a valid Arizona date and time.");
  const date = new Date(`${local[1]}:00-07:00`);
  if (Number.isNaN(date.valueOf())) throw new EditorValidationError("Enter a valid date and time.");
  return date;
}

function campTime(value: string): number {
  const match = /^(1[0-2]|[1-9]):([0-5]\d) (AM|PM)$/.exec(value);
  if (!match) throw new EditorValidationError("Use a time such as 8:15 AM.");
  const hour = Number(match[1]) % 12 + (match[3] === "PM" ? 12 : 0);
  return hour * 60 + Number(match[2]);
}

export async function saveArticle(formData: FormData): Promise<EditorResult> {
  const user = await requireStaffRole("/staff/editor", [...publishingRoles]);
  try {
    const db = getDb();
    const title = required(formData, "title", 120);
    const slug = slugify(String(formData.get("slug") || title));
    const summary = required(formData, "summary", 320);
    const body = safeMarkdown(required(formData, "body", 50_000));
    const applicability = optional(formData, "applicability", 200);
    const intent = formData.get("intent") === "publish" ? "published" : "draft";
    const now = new Date();

    const [existing] = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
    const articleId = existing?.id ?? crypto.randomUUID();
    if (existing && (intent === "published" || existing.status !== "published")) {
      await db.update(articles).set({
        title, summary, body, applicability, status: intent, owner: user.email,
        reviewedAt: intent === "published" ? now : existing.reviewedAt,
        publishedAt: intent === "published" ? now : existing.publishedAt,
        updatedAt: now,
      }).where(eq(articles.id, articleId));
    } else if (!existing) {
      await db.insert(articles).values({
        id: articleId, title, slug, summary, body, applicability, status: intent,
        owner: user.email, reviewedAt: intent === "published" ? now : null,
        publishedAt: intent === "published" ? now : null, createdAt: now, updatedAt: now,
      });
    }

    const [latest] = await db.select({ revision: articleRevisions.revision }).from(articleRevisions)
      .where(eq(articleRevisions.articleId, articleId)).orderBy(desc(articleRevisions.revision)).limit(1);
    await db.insert(articleRevisions).values({
      id: crypto.randomUUID(), articleId, revision: (latest?.revision ?? 0) + 1,
      title, summary, body, applicability, status: intent, author: user.email, createdAt: now,
    });

    revalidatePath(`/guide/${slug}`);
    revalidatePath("/");
    revalidatePath("/staff/editor");
    return { success: true, message: intent === "published" ? "Article published." : "Draft saved." };
  } catch (error) {
    if (error instanceof EditorValidationError) return { success: false, message: error.message };
    const incidentId = crypto.randomUUID();
    console.error("Article save failed", { incidentId, category: error instanceof Error ? error.name : "UnknownError" });
    return { success: false, message: `Could not save the article. Reference: ${incidentId}` };
  }
}

export async function saveScheduleEvent(formData: FormData): Promise<EditorResult> {
  const user = await requireStaffRole("/staff/editor", [...publishingRoles]);
  if (!PROGRAM_PLANNING_PUBLISHED) return { success: false, message: "Schedule editing is archived until the 2027 program is approved." };
  try {
    const db = getDb();
    const title = required(formData, "eventTitle", 120);
    const dayOfWeek = required(formData, "dayOfWeek", 12);
    if (!["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].includes(dayOfWeek)) throw new EditorValidationError("Choose a valid schedule day.");
    const startTime = required(formData, "startTime", 20);
    const endTime = required(formData, "endTime", 20);
    if (campTime(endTime) <= campTime(startTime)) throw new EditorValidationError("The event end must be after its start.");
    const summary = required(formData, "eventSummary", 320);
    const status = formData.get("intent") === "publish" ? "published" : "draft";
    const now = new Date();

    const eventId = optional(formData, "eventId", 80) ?? crypto.randomUUID();
    const [existing] = await db.select().from(events).where(eq(events.id, eventId)).limit(1);
    const kind = String(formData.get("kind") || "program");
    if (!["program", "routine", "leader", "meal"].includes(kind)) throw new EditorValidationError("Choose a valid event type.");
    const values = {
      title, summary, kind, dayOfWeek, startTime, endTime,
      audience: optional(formData, "audience", 120), whatToBring: optional(formData, "whatToBring", 320),
      accessibilityNotes: optional(formData, "accessibilityNotes", 500),
      isRequired: formData.get("isRequired") === "on", status,
      publishedAt: status === "published" ? now : existing?.publishedAt ?? null, updatedAt: now,
    };
    if (existing) {
      if (status === "published" || existing.status !== "published") {
        await db.update(events).set(values).where(eq(events.id, eventId));
      }
    } else {
      await db.insert(events).values({ id: eventId, ...values });
    }

    const [latest] = await db.select({ revision: eventRevisions.revision }).from(eventRevisions)
      .where(eq(eventRevisions.eventId, eventId)).orderBy(desc(eventRevisions.revision)).limit(1);
    await db.insert(eventRevisions).values({
      id: crypto.randomUUID(), eventId, revision: (latest?.revision ?? 0) + 1,
      title, summary, dayOfWeek, startTime, endTime, status, author: user.email, createdAt: now,
    });
    revalidatePath("/schedule");
    revalidatePath("/staff/editor");
    return { success: true, message: status === "published" ? "Schedule event published." : "Schedule event draft saved." };
  } catch (error) {
    if (error instanceof EditorValidationError) return { success: false, message: error.message };
    const incidentId = crypto.randomUUID();
    console.error("Schedule event save failed", { incidentId, category: error instanceof Error ? error.name : "UnknownError" });
    return { success: false, message: `Could not save the event. Reference: ${incidentId}` };
  }
}

export async function saveNotice(formData: FormData): Promise<EditorResult> {
  await requireStaffRole("/staff/editor", [...publishingRoles]);
  try {
    const db = getDb();
    const title = required(formData, "noticeTitle", 120);
    const content = required(formData, "noticeContent", 500);
    const urgency = required(formData, "urgency", 20);
    if (!["information", "advisory", "urgent"].includes(urgency)) throw new EditorValidationError("Choose a valid notice urgency.");
    const now = new Date();
    const startTime = parseLocalDate(formData.get("startTime"));
    const endTime = parseLocalDate(formData.get("endTime"));
    if (startTime && endTime && startTime >= endTime) throw new EditorValidationError("The notice end must be after its start.");

    await db.insert(alerts).values({
      id: crypto.randomUUID(), title, source: "Camp Lawton staff", urgency, content,
      instructions: optional(formData, "instructions", 500), audience: optional(formData, "noticeAudience", 120),
      startTime, endTime, status: "active", updatedAt: now,
    });
    revalidatePath("/");
    revalidatePath("/api/notices");
    revalidatePath("/staff/editor");
    return { success: true, message: "Notice scheduled." };
  } catch (error) {
    if (error instanceof EditorValidationError) return { success: false, message: error.message };
    const incidentId = crypto.randomUUID();
    console.error("Notice save failed", { incidentId, category: error instanceof Error ? error.name : "UnknownError" });
    return { success: false, message: `Could not save the notice. Reference: ${incidentId}` };
  }
}
