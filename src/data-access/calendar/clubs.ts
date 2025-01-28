import { db } from "@/db";
import { clubsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getClubs() {
  const clubs = await db.select().from(clubsTable);

  return clubs;
}

export async function getClubBySlug(slug: string) {
  const club = await db.query.clubsTable.findFirst({
    where: eq(clubsTable.slug, slug),
  });

  return club;
}
