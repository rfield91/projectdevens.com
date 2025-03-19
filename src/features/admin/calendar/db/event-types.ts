import { db } from "@/db";
import { typesTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function insertEventTypeRecord(
  data: typeof typesTable.$inferInsert
) {
  const insertedEventType = await db
    .insert(typesTable)
    .values(data)
    .onConflictDoNothing()
    .returning();

  revalidateTag(`eventTypes/${data.slug}`);
  revalidateTag("eventTypes");

  return insertedEventType;
}

export async function updateEventTypeRecord(
  typeId: string,
  data: Partial<typeof typesTable.$inferInsert>
) {
  const updatedEventType = (
    await db
      .update(typesTable)
      .set({
        name: data.name,
      })
      .where(eq(typesTable.typeId, typeId))
      .returning()
  )[0];

  revalidateTag(`eventTypes/${updatedEventType.slug}`);
  revalidateTag("eventTypes");

  return updatedEventType;
}

export async function deleteEventTypeRecord(
  eventType: typeof typesTable.$inferSelect
) {
  await db.delete(typesTable).where(eq(typesTable.typeId, eventType.typeId));

  revalidateTag(`eventTypes/${eventType.slug}`);
  revalidateTag("eventTypes");
}
