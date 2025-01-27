import { db } from "@/db";
import { clubsTable, eventsTable, typesTable } from "@/db/schema";
import { format } from "date-fns";
import { config } from "dotenv";
async function main() {
  config({ path: ".env" }); // or .env.local

  const { default: seedTypeData } = await import("@/db/data/types.json");
  const { default: seedClubData } = await import("@/db/data/clubs.json");
  const { default: seedEventData } = await import("@/db/data/events.json");

  await db.delete(typesTable);
  await db.delete(clubsTable);

  const insertedTypes = await db
    .insert(typesTable)
    .values(seedTypeData)
    .returning();
  const insertedClubs = await db
    .insert(clubsTable)
    .values(seedClubData)
    .returning();

  const events = seedEventData.map((ev) => {
    const startsAt = new Date(ev.startsAt);
    const endsAt = new Date(ev.endsAt);
    const title = ev.title;

    return {
      clubId: insertedClubs.find((c) => c.slug == ev.club)?.clubId || "",
      typeId: insertedTypes.find((t) => t.slug == ev.type)?.typeId || "",
      startsAt: startsAt,
      endsAt: endsAt,
      slug: `${format(startsAt, "yyyy-MM-dd")}-${title.replace(" ", "-")}`,
      title: title,
      url: ev.link,
    };
  });

  await db.insert(eventsTable).values(events);
}

main();
