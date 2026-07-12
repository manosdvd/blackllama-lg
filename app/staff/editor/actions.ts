"use server";
import { requireChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { articles } from "../../../db/schema";

export async function saveArticle(formData: FormData) {
  const user = await requireChatGPTUser("/staff/editor");
  const db = getDb();

  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const body = formData.get("body") as string;

  // basic slugification
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  await db.insert(articles).values({
    id: crypto.randomUUID(),
    title,
    slug,
    summary,
    body,
    owner: user.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return { success: true };
}
