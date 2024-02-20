import { Calendar } from "@/components/calendar/calendar";
import {
  getClubs,
  getEventTypes,
  getEvents,
} from "@/library/calendar/repository";

export default async function Page() {
  const eventTypes = await getEventTypes();
  const clubs = await getClubs();
  const events = await getEvents();

  return <Calendar events={events} eventTypes={eventTypes} clubs={clubs} />;
}
