import { db } from "@/db";
import { eventsTable } from "@/db/schema";
import { eq, gte } from "drizzle-orm";

export async function getEvents() {
  const events = await db.query.eventsTable.findMany({
    with: {
      club: true,
      type: true,
    },
    where: gte(eventsTable.endsAt, new Date()),
    orderBy: eventsTable.startsAt,
  });

  return events;
}

export async function getEventsByClub(clubId: string) {
  const events = await db.query.eventsTable.findMany({
    with: {
      club: true,
      type: true,
    },
    where: eq(eventsTable.clubId, clubId),
    orderBy: eventsTable.startsAt,
  });

  return events;
}
