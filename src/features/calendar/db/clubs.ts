"use cache";

import { db } from "@/db";
import { clubsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function getClubs() {
  cacheTag("clubs");
  return await db.select().from(clubsTable);
}

export async function getClubBySlug(slug: string) {
  cacheTag("`clubs/${slug}`");
  return await db.query.clubsTable.findFirst({
    where: eq(clubsTable.slug, slug),
  });
}
