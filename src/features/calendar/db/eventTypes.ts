"use cache";

import { db } from "@/db";
import { typesTable } from "@/db/schema";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export async function getEventTypes() {
  cacheTag("eventTypes");
  return db.select().from(typesTable);
}
