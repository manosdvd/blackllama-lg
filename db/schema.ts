import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  body: text("body").notNull(),
  applicability: text("applicability"),
  priority: text("priority").default("normal"),
  status: text("status").default("draft"),
  owner: text("owner"),
  reviewedAt: integer("reviewed_at", { mode: "timestamp" }),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const articleRevisions = sqliteTable("article_revisions", {
  id: text("id").primaryKey(),
  articleId: text("article_id").notNull().references(() => articles.id),
  revision: integer("revision").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  body: text("body").notNull(),
  applicability: text("applicability"),
  status: text("status").notNull(),
  author: text("author").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  file: text("file").notNull(),
  altText: text("alt_text"),
  caption: text("caption"),
  credit: text("credit"),
});

export const alerts = sqliteTable("alerts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  source: text("source").notNull(),
  urgency: text("urgency").notNull(), // information, advisory, urgent, emergency
  content: text("content").notNull(),
  instructions: text("instructions"),
  audience: text("audience"),
  startTime: integer("start_time", { mode: "timestamp" }),
  endTime: integer("end_time", { mode: "timestamp" }),
  status: text("status").default("active"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const locations = sqliteTable("locations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  accessibilityNotes: text("accessibility_notes"),
});

export const programAreas = sqliteTable("program_areas", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  locationId: text("location_id").references(() => locations.id),
  description: text("description"),
});

export const offerings = sqliteTable("offerings", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  programAreaId: text("program_area_id").references(() => programAreas.id),
  eligibility: text("eligibility"),
  prerequisites: text("prerequisites"),
  fee: integer("fee"),
  capacityGuidance: integer("capacity_guidance"),
});

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  kind: text("kind").notNull().default("program"),
  offeringId: text("offering_id").references(() => offerings.id),
  sessionId: text("session_id"),
  dayOfWeek: text("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  locationId: text("location_id").references(() => locations.id),
  audience: text("audience"),
  isRequired: integer("is_required", { mode: "boolean" }).default(false),
  whatToBring: text("what_to_bring"),
  accessibilityNotes: text("accessibility_notes"),
  status: text("status").notNull().default("draft"),
  publishedAt: integer("published_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const eventRevisions = sqliteTable("event_revisions", {
  id: text("id").primaryKey(),
  eventId: text("event_id").notNull().references(() => events.id),
  revision: integer("revision").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  dayOfWeek: text("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  status: text("status").notNull(),
  author: text("author").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
