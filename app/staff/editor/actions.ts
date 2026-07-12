"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { alerts, articleRevisions, articles, eventRevisions, events } from "../../../db/schema";

export type EditorResult = { success: boolean; message: string };

function required(formData: FormData, name: string, maxLength: number): string {
  const value = String(formData.get(name) ?? "").trim();
  if (!value) throw new Error(`${name} is required.`);
  if (value.length > maxLength) throw new Error(`${name} is too long.`);
  return value;
}

function optional(formData: FormData, name: string, maxLength: number): string | null {
  const value = String(formData.get(name) ?? "").trim();
  if (value.length > maxLength) throw new Error(`${name} is too long.`);
  return value || null;
}

function safeMarkdown(value: string): string {
  if (/<\/?(?:script|iframe|object|embed|style)|\son\w+\s*=|javascript:/i.test(value)) {
    throw new Error("Raw scripts, embeds, event handlers, and unsafe URLs are not allowed.");
  }
  return value;
}

function slugify(value: string): string {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  if (!slug) throw new Error("A valid title is required to create the URL.");
  return slug;
}

function parseLocalDate(value: FormDataEntryValue | null): Date | null {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const date = new Date(text);
  if (Number.isNaN(date.valueOf())) throw new Error("Enter a valid date and time.");
  return date;
}

export async function saveArticle(formData: FormData): Promise<EditorResult> {
  try {
    const user = await requireChatGPTUser("/staff/editor");
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
    if (existing) {
      await db.update(articles).set({
        title, summary, body, applicability, status: intent, owner: user.email,
        reviewedAt: intent === "published" ? now : existing.reviewedAt,
        publishedAt: intent === "published" ? now : existing.publishedAt,
        updatedAt: now,
      }).where(eq(articles.id, articleId));
    } else {
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
    return { success: false, message: error instanceof Error ? error.message : "Could not save the article." };
  }
}

export async function saveScheduleEvent(formData: FormData): Promise<EditorResult> {
  try {
    const user = await requireChatGPTUser("/staff/editor");
    const db = getDb();
    const title = required(formData, "eventTitle", 120);
    const dayOfWeek = required(formData, "dayOfWeek", 12);
    if (!["Monday", "Tuesday", "Wednesday", "Thursday"].includes(dayOfWeek)) throw new Error("Choose a valid schedule day.");
    const startTime = required(formData, "startTime", 20);
    const endTime = required(formData, "endTime", 20);
    const summary = required(formData, "eventSummary", 320);
    const status = formData.get("intent") === "publish" ? "published" : "draft";
    const now = new Date();

    const eventId = optional(formData, "eventId", 80) ?? crypto.randomUUID();
    const [existing] = await db.select().from(events).where(eq(events.id, eventId)).limit(1);
    const values = {
      title, summary, kind: String(formData.get("kind") || "program"), dayOfWeek, startTime, endTime,
      audience: optional(formData, "audience", 120), whatToBring: optional(formData, "whatToBring", 320),
      accessibilityNotes: optional(formData, "accessibilityNotes", 500),
      isRequired: formData.get("isRequired") === "on", status,
      publishedAt: status === "published" ? now : existing?.publishedAt ?? null, updatedAt: now,
    };
    if (existing) await db.update(events).set(values).where(eq(events.id, eventId));
    else await db.insert(events).values({ id: eventId, ...values });

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
    return { success: false, message: error instanceof Error ? error.message : "Could not save the event." };
  }
}

export async function saveNotice(formData: FormData): Promise<EditorResult> {
  try {
    await requireChatGPTUser("/staff/editor");
    const db = getDb();
    const title = required(formData, "noticeTitle", 120);
    const content = required(formData, "noticeContent", 500);
    const urgency = required(formData, "urgency", 20);
    if (!["information", "advisory", "urgent"].includes(urgency)) throw new Error("Choose a valid notice urgency.");
    const now = new Date();
    const startTime = parseLocalDate(formData.get("startTime"));
    const endTime = parseLocalDate(formData.get("endTime"));
    if (startTime && endTime && startTime >= endTime) throw new Error("The notice end must be after its start.");

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
    return { success: false, message: error instanceof Error ? error.message : "Could not save the notice." };
  }
}
