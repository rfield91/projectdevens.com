import { Event } from "@/library/calendar/types";
import db from "@/library/db";

export async function deleteEvent(eventId: number) {
  await db.execute(
    `
UPDATE Events
SET
    isDeleted = 1
WHERE
    id = ?`,
    [eventId]
  );
}

export async function getEvent(eventId: number) {
  const [events] = await db.query<Event[]>(
    `
SELECT 
  e.id,
    e.name,
    e.slug,
    e.startDate,
    e.endDate,
    e.link,
    c.clubId,
    c.name as clubName,
    t.typeName as eventTypeName,
    t.color
FROM Events e
INNER JOIN Clubs c
  ON e.clubId = c.clubId
INNER JOIN EventTypes t
  ON e.eventTypeName = t.typeName
WHERE
    e.isDeleted = 0
  AND e.id = ?
    `,
    [eventId]
  );

  if (events.length == 0) return null;

  return events[0];
}
