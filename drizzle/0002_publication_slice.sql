ALTER TABLE `articles` ADD `reviewed_at` integer;
--> statement-breakpoint
ALTER TABLE `articles` ADD `published_at` integer;
--> statement-breakpoint
CREATE TABLE `article_revisions` (
  `id` text PRIMARY KEY NOT NULL,
  `article_id` text NOT NULL,
  `revision` integer NOT NULL,
  `title` text NOT NULL,
  `summary` text NOT NULL,
  `body` text NOT NULL,
  `applicability` text,
  `status` text NOT NULL,
  `author` text NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `alerts` ADD `title` text NOT NULL DEFAULT 'Camp notice';
--> statement-breakpoint
ALTER TABLE `alerts` ADD `instructions` text;
--> statement-breakpoint
ALTER TABLE `alerts` ADD `updated_at` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
ALTER TABLE `events` ADD `title` text NOT NULL DEFAULT 'Camp event';
--> statement-breakpoint
ALTER TABLE `events` ADD `summary` text NOT NULL DEFAULT '';
--> statement-breakpoint
ALTER TABLE `events` ADD `kind` text NOT NULL DEFAULT 'program';
--> statement-breakpoint
ALTER TABLE `events` ADD `what_to_bring` text;
--> statement-breakpoint
ALTER TABLE `events` ADD `accessibility_notes` text;
--> statement-breakpoint
ALTER TABLE `events` ADD `status` text NOT NULL DEFAULT 'draft';
--> statement-breakpoint
ALTER TABLE `events` ADD `published_at` integer;
--> statement-breakpoint
ALTER TABLE `events` ADD `updated_at` integer NOT NULL DEFAULT 0;
--> statement-breakpoint
CREATE TABLE `event_revisions` (
  `id` text PRIMARY KEY NOT NULL,
  `event_id` text NOT NULL,
  `revision` integer NOT NULL,
  `title` text NOT NULL,
  `summary` text NOT NULL,
  `day_of_week` text NOT NULL,
  `start_time` text NOT NULL,
  `end_time` text NOT NULL,
  `status` text NOT NULL,
  `author` text NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE cascade
);
