import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  displayName: text("display_name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  lastLoginAt: integer("last_login_at", { mode: "timestamp" }).notNull(),
});

export const staffRoles = sqliteTable("staff_roles", {
  email: text("email").primaryKey(),
  role: text("role").notNull(),
  grantedBy: text("granted_by").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const campSessions = sqliteTable("camp_sessions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  programType: text("program_type").notNull(),
  startsOn: text("starts_on").notNull(),
  endsOn: text("ends_on").notNull(),
  arrivalWindow: text("arrival_window").notNull(),
  status: text("status").notNull().default("planning"),
});

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

export const unitWorkspaces = sqliteTable("unit_workspaces", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  council: text("council"),
  unitType: text("unit_type").notNull(),
  unitNumber: text("unit_number").notNull(),
  city: text("city"),
  state: text("state"),
  sessionId: text("session_id"),
  ownerEmail: text("owner_email").notNull(),
  estimatedYouth: integer("estimated_youth").notNull().default(0),
  estimatedAdults: integer("estimated_adults").notNull().default(0),
  status: text("status").notNull().default("draft"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const workspaceMembers = sqliteTable("workspace_members", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().references(() => unitWorkspaces.id),
  email: text("email").notNull(),
  role: text("role").notNull().default("planner"),
  invitedBy: text("invited_by").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const participants = sqliteTable("participants", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().references(() => unitWorkspaces.id),
  displayName: text("display_name").notNull(),
  program: text("program").notNull(),
  rank: text("rank"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const interests = sqliteTable("interests", {
  id: text("id").primaryKey(),
  workspaceId: text("workspace_id").notNull().references(() => unitWorkspaces.id),
  offeringId: text("offering_id").notNull(),
  interestedCount: integer("interested_count").notNull().default(0),
  priority: text("priority").notNull().default("nice-to-have"),
  note: text("note"),
});

export const planSelections = sqliteTable("plan_selections", {
  id: text("id").primaryKey(),
  participantId: text("participant_id").notNull().references(() => participants.id),
  eventId: text("event_id").notNull(),
  warningAcknowledged: integer("warning_acknowledged", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  workspaceId: text("workspace_id"),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  snapshot: text("snapshot").notNull(),
  consentedAt: integer("consented_at", { mode: "timestamp" }).notNull(),
  status: text("status").notNull().default("new"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  deleteAfter: integer("delete_after", { mode: "timestamp" }).notNull(),
});

export const auditLogs = sqliteTable("audit_logs", {
  id: text("id").primaryKey(),
  actorEmail: text("actor_email").notNull(),
  action: text("action").notNull(),
  objectType: text("object_type").notNull(),
  objectId: text("object_id").notNull(),
  detail: text("detail"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
