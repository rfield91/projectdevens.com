import db from "../db";
import { Club, Event, EventType } from "./types";

export async function getEventTypes() {
  const [eventTypes] = await db.query<EventType[]>(
    `
SELECT
    typeName,
    filterText,
    labelText,
    color,
    disabledColor,
    enabledColor
FROM EventTypes`
  );

  return eventTypes;
}

export async function getClubs() {
  const [clubs] = await db.query<Club[]>(
    `
SELECT
  clubId,
  name
FROM Clubs`
  );

  return clubs;
}

export async function getEvents() {
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
ORDER BY e.startDate, e.EndDate
    `
  );

  return events;
}