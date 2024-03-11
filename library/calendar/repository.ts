import { sql } from "@vercel/postgres";
import { Club, Event, EventType } from "./types";

export async function getEventTypes() {
  const result = await sql`
SELECT
  "typeName",
  "filterText",
  "labelText",
  color,
  "disabledColor",
  "enabledColor"
FROM eventtypes`;

  return result.rows as EventType[];
}

export async function getClubs() {
  const result = await sql`
SELECT
  "clubId",
  "name"
FROM Clubs`;

  return result.rows as Club[];
}

export async function getEvents() {
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
ORDER BY e."startDate", e."endDate"
    `;

  return result.rows as Event[];
}
