CREATE TABLE `alerts` (
	`id` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`urgency` text NOT NULL,
	`content` text NOT NULL,
	`audience` text,
	`start_time` integer,
	`end_time` integer,
	`status` text DEFAULT 'active'
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`summary` text NOT NULL,
	`body` text NOT NULL,
	`applicability` text,
	`priority` text DEFAULT 'normal',
	`status` text DEFAULT 'draft',
	`owner` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_slug_unique` ON `articles` (`slug`);--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`file` text NOT NULL,
	`alt_text` text,
	`caption` text,
	`credit` text
);
