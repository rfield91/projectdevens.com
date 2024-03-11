import { Event } from "@/library/calendar/types";
import { sql } from "@vercel/postgres";

export async function deleteEvent(eventId: number) {
  await sql`
UPDATE events
SET
    "isDeleted" = true
WHERE
    id = ${eventId}`;
}

export async function createEvent(
  name: string,
  eventType: string,
  club: string,
  startDate: Date,
  endDate: Date,
  link: string
) {
  await sql`
INSERT INTO events
  (name, slug, "startDate", "endDate", link, "clubId", "eventTypeName")
VALUES
  (${name}, ${name
    .replace(/\s+/g, "-")
    .toLocaleLowerCase()}, ${startDate.toISOString()}, ${endDate.toISOString()}, ${link}, ${club}, ${eventType})`;
}

export async function getEvent(eventId: number) {
  const result = await sql`
SELECT 
  e.id,
  e.name,
  e.slug,
  e."startDate",
  e."endDate",
  e.link,
  c."clubId",
  c.name as "clubName",
  t."typeName" as "eventTypeName",
  t.color
FROM Events e
INNER JOIN Clubs c
ON e."clubId" = c."clubId"
INNER JOIN EventTypes t
ON e."eventTypeName" = t."typeName"
WHERE
  e."isDeleted" = false
AND e.id = ${eventId}"`;

  if (result.rowCount == 0) return null;

  return result.rows[0] as Event;
}
