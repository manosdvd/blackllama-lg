CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`offering_id` text,
	`session_id` text,
	`day_of_week` text NOT NULL,
	`start_time` text NOT NULL,
	`end_time` text NOT NULL,
	`location_id` text,
	`audience` text,
	`is_required` integer DEFAULT false,
	FOREIGN KEY (`offering_id`) REFERENCES `offerings`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`accessibility_notes` text
);
--> statement-breakpoint
CREATE TABLE `offerings` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`program_area_id` text,
	`eligibility` text,
	`prerequisites` text,
	`fee` integer,
	`capacity_guidance` integer,
	FOREIGN KEY (`program_area_id`) REFERENCES `program_areas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `program_areas` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`location_id` text,
	`description` text,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `program_areas_slug_unique` ON `program_areas` (`slug`);