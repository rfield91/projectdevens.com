import { getEvent } from "@/library/calendar/admin/repository";

export default async function Page({ params }: { params: { id: string } }) {
  const eventId = Number.parseInt(params.id);

  const ev = await getEvent(eventId);

  if (ev === null) return <div>Event does not exist</div>;
  return <div>{ev.clubName}</div>;
}
