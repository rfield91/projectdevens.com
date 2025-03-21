import { db } from "@/db";
import { clubsTable, eventsTable, typesTable } from "@/db/schema";
import { format } from "date-fns";
import { config } from "dotenv";
import * as fs from "fs/promises";

async function main() {
  config({ path: ".env" }); // or .env.local

  const { default: seedTypeData } = await import("@/db/data/types.json");
  const { default: seedClubData } = await import("@/db/data/clubs.json");

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

  const eventData = await fs.readFile("./src/db/data/events.tsv");

  const rows = eventData.toString().split("\r\n");
  console.log(rows);
  const events = rows
    .map((row, i) => {
      if (i == 0) return null;

      const [club, type, , startsAtString, endsAtString, title, link] =
        row.split("\t");

      const cleanedTitle = title.trim();
      const startsAt = new Date(startsAtString);
      const endsAt = new Date(endsAtString);

      return {
        clubId: insertedClubs.find((c) => c.slug == club)?.clubId || "",
        typeId: insertedTypes.find((t) => t.slug == type)?.typeId || "",
        startsAt: startsAt,
        endsAt: endsAt,
        slug: `${format(startsAt, "yyyy-MM-dd")}-${title.replace(" ", "-")}`,
        title: cleanedTitle,
        url: !link || link.length === 0 ? undefined : link,
      };
    })
    .filter((ev) => ev != null);

  await db.insert(eventsTable).values(events);
}

main();
