import { db } from "@/db";
import { usersToClubsTable, usersToRolesTable } from "@/db/schema";
import { UserRole } from "@/schemas/users";
import { and, eq } from "drizzle-orm";

export async function insertUserToClubRecord(
  data: typeof usersToClubsTable.$inferInsert
) {
  const inserted = await db
    .insert(usersToClubsTable)
    .values(data)
    .onConflictDoNothing()
    .returning();

  return inserted;
}

export async function deleteUserToClubRecord(userId: string, clubId: string) {
  await db
    .delete(usersToClubsTable)
    .where(
      and(
        eq(usersToClubsTable.userId, userId),
        eq(usersToClubsTable.clubId, clubId)
      )
    );
}

export async function insertUserToRoleRecord(
  data: typeof usersToRolesTable.$inferInsert
) {
  const inserted = await db
    .insert(usersToRolesTable)
    .values(data)
    .onConflictDoNothing()
    .returning();

  return inserted;
}

export async function deleteUserToRoleRecord(userId: string, role: UserRole) {
  await db
    .delete(usersToRolesTable)
    .where(
      and(
        eq(usersToRolesTable.userId, userId),
        eq(usersToRolesTable.role, role)
      )
    );
}
