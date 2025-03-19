import { clubsTable } from "@/db/tables/clubs";
import { typesTable } from "@/db/tables/eventTypes";
import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const eventsTable = pgTable("events", {
  eventId: uuid().primaryKey().defaultRandom(),
  clubId: uuid()
    .notNull()
    .references(() => clubsTable.clubId, {
      onDelete: "cascade",
    }),
  typeId: uuid()
    .notNull()
    .references(() => typesTable.typeId, { onDelete: "cascade" }),
  startsAt: timestamp({ withTimezone: true }).notNull(),
  endsAt: timestamp({ withTimezone: true }).notNull(),
  slug: text().notNull(),
  url: text(),
  title: text().notNull(),
  description: text(),
});

export const eventRelations = relations(eventsTable, ({ one }) => ({
  club: one(clubsTable, {
    fields: [eventsTable.clubId],
    references: [clubsTable.clubId],
  }),
  type: one(typesTable, {
    fields: [eventsTable.typeId],
    references: [typesTable.typeId],
  }),
}));
