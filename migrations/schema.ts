import { pgTable, unique, uuid, text, foreignKey, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const clubs = pgTable("clubs", {
	clubId: uuid().defaultRandom().primaryKey().notNull(),
	slug: text().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("clubs_slug_unique").on(table.slug),
	unique("clubs_name_unique").on(table.name),
]);

export const events = pgTable("events", {
	eventId: uuid().defaultRandom().primaryKey().notNull(),
	clubId: uuid().notNull(),
	typeId: uuid().notNull(),
	startsAt: timestamp({ mode: 'string' }).notNull(),
	endsAt: timestamp({ mode: 'string' }).notNull(),
	slug: text().notNull(),
	url: text(),
	title: text().notNull(),
	description: text(),
}, (table) => [
	foreignKey({
			columns: [table.clubId],
			foreignColumns: [clubs.clubId],
			name: "events_clubId_clubs_clubId_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.typeId],
			foreignColumns: [types.typeId],
			name: "events_typeId_types_typeId_fk"
		}).onDelete("cascade"),
]);

export const types = pgTable("types", {
	typeId: uuid().defaultRandom().primaryKey().notNull(),
	slug: text().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("types_slug_unique").on(table.slug),
	unique("types_name_unique").on(table.name),
]);
