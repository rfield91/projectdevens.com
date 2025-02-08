import { eventsTable } from "@/db/tables/events";
import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const typesTable = pgTable("types", {
  typeId: uuid().primaryKey().defaultRandom(),
  slug: text().unique().notNull(),
  name: text().unique().notNull(),
});

export const typeRelations = relations(typesTable, ({ many }) => ({
  eventsTable: many(eventsTable),
}));
