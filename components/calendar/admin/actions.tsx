"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteEvent(eventId: number) {
  await sql`
UPDATE events
SET
    "isDeleted" = true
WHERE
    id = ${eventId}`;

  revalidatePath("/calendar/admin");
}

export type FormState = {
  message: string;
};

export async function addEvent(
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

  revalidatePath("/calendar/admin");

  redirect("/calendar/admin");
}
