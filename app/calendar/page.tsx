import { Calendar } from "@/components/calendar/calendar";
import { getEventTypes, getEvents } from "@/library/calendar/repository";

export default async function Page() {
  const eventTypes = await getEventTypes();
  const events = await getEvents();

  return <Calendar events={events} eventTypes={eventTypes} />;
}
