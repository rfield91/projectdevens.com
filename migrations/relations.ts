import { relations } from "drizzle-orm/relations";
import { clubs, events, types } from "./schema";

export const eventsRelations = relations(events, ({one}) => ({
	club: one(clubs, {
		fields: [events.clubId],
		references: [clubs.clubId]
	}),
	type: one(types, {
		fields: [events.typeId],
		references: [types.typeId]
	}),
}));

export const clubsRelations = relations(clubs, ({many}) => ({
	events: many(events),
}));

export const typesRelations = relations(types, ({many}) => ({
	events: many(events),
}));