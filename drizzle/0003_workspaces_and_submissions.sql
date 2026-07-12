CREATE TABLE `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `display_name` text NOT NULL,
  `created_at` integer NOT NULL,
  `last_login_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
--> statement-breakpoint
CREATE TABLE `staff_roles` (
  `email` text PRIMARY KEY NOT NULL,
  `role` text NOT NULL,
  `granted_by` text NOT NULL,
  `created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `camp_sessions` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `program_type` text NOT NULL,
  `starts_on` text NOT NULL,
  `ends_on` text NOT NULL,
  `arrival_window` text NOT NULL,
  `status` text DEFAULT 'planning' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `unit_workspaces` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `council` text,
  `unit_type` text NOT NULL,
  `unit_number` text NOT NULL,
  `city` text,
  `state` text,
  `session_id` text,
  `owner_email` text NOT NULL,
  `estimated_youth` integer DEFAULT 0 NOT NULL,
  `estimated_adults` integer DEFAULT 0 NOT NULL,
  `status` text DEFAULT 'draft' NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workspace_members` (
  `id` text PRIMARY KEY NOT NULL,
  `workspace_id` text NOT NULL,
  `email` text NOT NULL,
  `role` text DEFAULT 'planner' NOT NULL,
  `invited_by` text NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`workspace_id`) REFERENCES `unit_workspaces`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workspace_member_unique` ON `workspace_members` (`workspace_id`, `email`);
--> statement-breakpoint
CREATE TABLE `participants` (
  `id` text PRIMARY KEY NOT NULL,
  `workspace_id` text NOT NULL,
  `display_name` text NOT NULL,
  `program` text NOT NULL,
  `rank` text,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`workspace_id`) REFERENCES `unit_workspaces`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `interests` (
  `id` text PRIMARY KEY NOT NULL,
  `workspace_id` text NOT NULL,
  `offering_id` text NOT NULL,
  `interested_count` integer DEFAULT 0 NOT NULL,
  `priority` text DEFAULT 'nice-to-have' NOT NULL,
  `note` text,
  FOREIGN KEY (`workspace_id`) REFERENCES `unit_workspaces`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `workspace_interest_unique` ON `interests` (`workspace_id`, `offering_id`);
--> statement-breakpoint
CREATE TABLE `plan_selections` (
  `id` text PRIMARY KEY NOT NULL,
  `participant_id` text NOT NULL,
  `event_id` text NOT NULL,
  `warning_acknowledged` integer DEFAULT false NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`participant_id`) REFERENCES `participants`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `participant_event_unique` ON `plan_selections` (`participant_id`, `event_id`);
--> statement-breakpoint
CREATE TABLE `submissions` (
  `id` text PRIMARY KEY NOT NULL,
  `reference` text NOT NULL,
  `workspace_id` text,
  `contact_name` text NOT NULL,
  `contact_email` text NOT NULL,
  `contact_phone` text,
  `snapshot` text NOT NULL,
  `consented_at` integer NOT NULL,
  `status` text DEFAULT 'new' NOT NULL,
  `created_at` integer NOT NULL,
  `delete_after` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `submissions_reference_unique` ON `submissions` (`reference`);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
  `id` text PRIMARY KEY NOT NULL,
  `actor_email` text NOT NULL,
  `action` text NOT NULL,
  `object_type` text NOT NULL,
  `object_id` text NOT NULL,
  `detail` text,
  `created_at` integer NOT NULL
);
