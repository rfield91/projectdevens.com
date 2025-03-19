import { db } from "@/db";
import { clubsTable, usersToClubsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export async function insertClubRecord(data: typeof clubsTable.$inferInsert) {
  const insertedClub = await db
    .insert(clubsTable)
    .values(data)
    .onConflictDoNothing()
    .returning();

  revalidateTag(`clubs/${data.slug}`);
  revalidateTag("clubs");

  return insertedClub;
}

export async function updateClubRecord(
  clubId: string,
  data: Partial<typeof clubsTable.$inferInsert>
) {
  const updatedClub = (
    await db
      .update(clubsTable)
      .set({
        name: data.name,
      })
      .where(eq(clubsTable.clubId, clubId))
      .returning()
  )[0];

  revalidateTag(`clubs/${updatedClub.slug}`);
  revalidateTag("clubs");

  return updatedClub;
}

export async function deleteClubRecord(club: typeof clubsTable.$inferSelect) {
  await db.delete(clubsTable).where(eq(clubsTable.clubId, club.clubId));

  revalidateTag(`clubs/${club.slug}`);
  revalidateTag("clubs");
}

export async function getClubsForUser(userId: string) {
  const userToClubs = await db
    .select()
    .from(usersToClubsTable)
    .innerJoin(clubsTable, eq(usersToClubsTable.clubId, clubsTable.clubId))
    .where(eq(usersToClubsTable.userId, userId));

  return userToClubs.map((userToClubs) => userToClubs.clubs);
}
