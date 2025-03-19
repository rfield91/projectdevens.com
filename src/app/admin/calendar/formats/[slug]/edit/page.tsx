import { db } from "@/db";
import { typesTable } from "@/db/schema";
import { EventTypeForm } from "@/features/admin/calendar/components/eventTypes/event-type-form";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const eventType = await getEventType(slug);

  if (eventType === undefined) {
    return notFound();
  }

  return (
    <div>
      <EventTypeForm eventType={eventType} />
    </div>
  );
}

async function getEventType(slug: string) {
  "use cache";
  cacheTag(`eventTypes/${slug}`);

  return db.query.typesTable.findFirst({
    where: eq(typesTable.slug, slug),
  });
}
