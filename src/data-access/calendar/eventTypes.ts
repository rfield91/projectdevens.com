import { db } from "@/db";
import { typesTable } from "@/db/schema";

export async function getEventTypes() {
  const eventTypes = db.select().from(typesTable);

  return eventTypes;
}
