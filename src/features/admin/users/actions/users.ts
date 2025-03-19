"use server";

import {
  deleteUserToClubRecord,
  deleteUserToRoleRecord,
  insertUserToClubRecord,
  insertUserToRoleRecord,
} from "@/features/admin/users/db/users";
import {
  addUserClubFormSchema,
  addUserRoleFormSchema,
} from "@/features/admin/users/schemas/users";
import { UserRole } from "@/types/users";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createUserToClubRelation(
  userId: string,
  unsafeData: z.infer<typeof addUserClubFormSchema>
) {
  const { success, data } = addUserClubFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Access could not be added for this user." };
  }

  await insertUserToClubRecord({
    userId: userId,
    clubId: data.clubId,
  });

  redirect(`/admin/users/${userId}/edit`);
}

export async function deleteUserToClubRelation(userId: string, clubId: string) {
  await deleteUserToClubRecord(userId, clubId);

  redirect(`/admin/users/${userId}/edit`);
}

export async function createUserToRoleRelation(
  userId: string,
  unsafeData: z.infer<typeof addUserRoleFormSchema>
) {
  const { success, data } = addUserRoleFormSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: "Access could not be added for this user." };
  }

  await insertUserToRoleRecord({
    userId: userId,
    role: data.role,
  });

  redirect(`/admin/users/${userId}/edit`);
}

export async function deleteUserToRoleRelation(userId: string, role: UserRole) {
  await deleteUserToRoleRecord(userId, role);

  redirect(`/admin/users/${userId}/edit`);
}
