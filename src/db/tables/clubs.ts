import { eventsTable } from "@/db/tables/events";
import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const clubsTable = pgTable("clubs", {
  clubId: uuid().primaryKey().defaultRandom(),
  slug: text().unique().notNull(),
  name: text().unique().notNull(),
});

export const clubRelations = relations(clubsTable, ({ many }) => ({
  eventsTable: many(eventsTable),
}));
