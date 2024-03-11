"use server";

import mysql, { ConnectionOptions } from "mysql2/promise";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteEvent(eventId: number) {
  const config: ConnectionOptions = {
    uri: process.env.DATABASE_URL,
    decimalNumbers: true,
  };

  const db = await mysql.createConnection(config);

  await db.execute(
    `
    UPDATE Events
    SET
        isDeleted = 1
    WHERE
        id = ?`,
    [eventId]
  );

  revalidatePath("/calendar/admin");
}

export type FormState = {
  message: string;
};

export async function addEvent(
  name: string,
  eventType: string,
  club: string,
  startDate: Date,
  endDate: Date,
  link: string
) {
  const config: ConnectionOptions = {
    uri: process.env.DATABASE_URL,
    decimalNumbers: true,
  };

  const db = await mysql.createConnection(config);

  await db.execute(
    `
    INSERT INTO Events
      (name, slug, startDate, endDate, link, clubId, eventTypeName)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)`,
    [
      name,
      `${name.replace(/\s+/g, "-").toLocaleLowerCase()}`,
      startDate,
      endDate,
      link,
      club,
      eventType,
    ]
  );

  revalidatePath("/calendar/admin");

  redirect("/calendar/admin");
}
