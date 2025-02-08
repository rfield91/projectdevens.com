"use server";

import { clubsTable } from "@/db/schema";
import {
  deleteClubRecord,
  insertClubRecord,
  updateClubRecord,
} from "@/features/admin/calendar/db/clubs";
import { clubFormSchema } from "@/features/admin/calendar/schemas/clubs";
import { eventTypeFormSchema } from "@/features/admin/calendar/schemas/event-types";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createClub(unsafeData: z.infer<typeof clubFormSchema>) {
  const { success, data } = clubFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Club could not be created." };
  }

  await insertClubRecord({
    name: data.name,
    slug: data.name.replaceAll(" ", "-").toLowerCase(),
  });

  redirect("/admin/calendar/clubs");
}

export async function updateClub(
  clubId: string,
  unsafeData: z.infer<typeof eventTypeFormSchema>
) {
  const { success, data } = eventTypeFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Club could not be updated." };
  }

  await updateClubRecord(clubId, data);

  redirect("/admin/calendar/clubs");
}

export async function deleteClub(club: typeof clubsTable.$inferSelect) {
  await deleteClubRecord(club);

  redirect("/admin/calendar/clubs");
}
