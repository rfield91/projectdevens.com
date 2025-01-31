"use cache";
import { db } from "@/db";
import { eventsTable } from "@/db/schema";
import { and, eq, gte } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function getUpcomingEvents() {
  cacheTag(`events/upcoming`);
  return await db.query.eventsTable.findMany({
    with: {
      club: true,
      type: true,
    },
    where: gte(eventsTable.endsAt, new Date()),
    orderBy: eventsTable.startsAt,
  });
}

export async function getUpcomingEventsByClub(clubId: string) {
  cacheTag(`events/${clubId}/upcoming`);
  return await db.query.eventsTable.findMany({
    with: {
      club: true,
      type: true,
    },
    where: and(
      eq(eventsTable.clubId, clubId),
      gte(eventsTable.endsAt, new Date())
    ),
    orderBy: eventsTable.startsAt,
  });
}
