import { db } from "@/db";
import {
  clubsTable,
  eventsTable,
  typesTable,
  usersToClubsTable,
} from "@/db/schema";
import { and, eq, gte } from "drizzle-orm";

export async function getUpcomingEventsForUser(userId: string) {
  const events = await db
    .select()
    .from(eventsTable)
    .innerJoin(
      usersToClubsTable,
      eq(usersToClubsTable.clubId, eventsTable.clubId)
    )
    .innerJoin(clubsTable, eq(clubsTable.clubId, eventsTable.clubId))
    .innerJoin(typesTable, eq(typesTable.typeId, eventsTable.typeId))
    .where(
      and(
        eq(usersToClubsTable.userId, userId),
        gte(eventsTable.endsAt, new Date())
      )
    );

  return events.map((events) => ({
    ...events.events,
    club: events.clubs,
    type: events.types,
  }));
}
