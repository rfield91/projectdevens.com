"use server";

import { createEvent, deleteEvent } from "@/library/calendar/admin/repository";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteEventAction(eventId: number) {
  //   await sql`
  // UPDATE events
  // SET
  //     "isDeleted" = true
  // WHERE
  //     id = ${eventId}`;

  await deleteEvent(eventId);

  revalidatePath("/calendar/admin");
}

export type FormState = {
  message: string;
};

export async function addEventAction(
  name: string,
  eventType: string,
  club: string,
  startDate: Date,
  endDate: Date,
  link: string
) {
  await createEvent(name, eventType, club, startDate, endDate, link);

  revalidatePath("/calendar/admin");

  redirect("/calendar/admin");
}
