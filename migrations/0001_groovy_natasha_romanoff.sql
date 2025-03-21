CREATE TYPE "public"."user_role" AS ENUM('user', 'calendar', 'pax', 'admin');--> statement-breakpoint
CREATE TABLE "users" (
	"userId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkUserId" text NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerkUserId_unique" UNIQUE("clerkUserId")
);
--> statement-breakpoint
CREATE TABLE "usersToClubs" (
	"userId" uuid NOT NULL,
	"clubId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usersToClubs_userId_clubId_pk" PRIMARY KEY("userId","clubId")
);
--> statement-breakpoint
CREATE TABLE "userToRoles" (
	"userId" uuid NOT NULL,
	"role" "user_role" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "startsAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "endsAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "usersToClubs" ADD CONSTRAINT "usersToClubs_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usersToClubs" ADD CONSTRAINT "usersToClubs_clubId_clubs_clubId_fk" FOREIGN KEY ("clubId") REFERENCES "public"."clubs"("clubId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userToRoles" ADD CONSTRAINT "userToRoles_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE cascade ON UPDATE no action;