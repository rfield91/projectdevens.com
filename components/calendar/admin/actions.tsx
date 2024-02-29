"use server";

import mysql, { ConnectionOptions } from "mysql2/promise";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleDeleteEvent(eventId: number) {
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

export async function addEvent(prevState: any, formData: FormData) {
  const rawFormData = {
    name: formData.get("event-name")?.toString(),
    eventType: formData.get("event-type"),
    clubId: formData.get("club"),
    startDate: formData.get("start-date"),
    endDate: formData.get("end-date"),
    link: formData.get("link"),
  };

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
      rawFormData.name,
      `${rawFormData.name?.replace(/\s+/g, "-").toLocaleLowerCase()}`,
      rawFormData.startDate,
      rawFormData.endDate,
      rawFormData.link,
      rawFormData.clubId,
      rawFormData.eventType,
    ]
  );

  redirect("/calendar/admin");
}
