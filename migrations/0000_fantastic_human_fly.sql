-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "clubs" (
	"clubId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "clubs_slug_unique" UNIQUE("slug"),
	CONSTRAINT "clubs_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"eventId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clubId" uuid NOT NULL,
	"typeId" uuid NOT NULL,
	"startsAt" timestamp NOT NULL,
	"endsAt" timestamp NOT NULL,
	"slug" text NOT NULL,
	"url" text,
	"title" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "types" (
	"typeId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "types_slug_unique" UNIQUE("slug"),
	CONSTRAINT "types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_clubId_clubs_clubId_fk" FOREIGN KEY ("clubId") REFERENCES "public"."clubs"("clubId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_typeId_types_typeId_fk" FOREIGN KEY ("typeId") REFERENCES "public"."types"("typeId") ON DELETE cascade ON UPDATE no action;
*/