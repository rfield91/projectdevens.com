"use server";

import { typesTable } from "@/db/schema";
import {
  deleteEventTypeRecord,
  insertEventTypeRecord,
  updateEventTypeRecord,
} from "@/features/admin/calendar/db/event-types";
import { eventTypeFormSchema } from "@/features/admin/calendar/schemas/event-types";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createEventType(
  unsafeData: z.infer<typeof eventTypeFormSchema>
) {
  const { success, data } = eventTypeFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Format could not be created." };
  }

  await insertEventTypeRecord({
    name: data.name,
    slug: data.name.replaceAll(" ", "-").toLowerCase(),
  });

  redirect("/admin/calendar/formats");
}

export async function updateEventType(
  typeId: string,
  unsafeData: z.infer<typeof eventTypeFormSchema>
) {
  const { success, data } = eventTypeFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Format could not be updated." };
  }

  await updateEventTypeRecord(typeId, data);

  redirect("/admin/calendar/formats");
}

export async function deleteEventType(
  eventType: typeof typesTable.$inferSelect
) {
  await deleteEventTypeRecord(eventType);

  redirect("/admin/calendar/formats");
}
