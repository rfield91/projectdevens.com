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
