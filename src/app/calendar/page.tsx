import { Calendar } from "@/app/components/calendar";
import { getClubs } from "@/data-access/calendar/clubs";
import { getEvents } from "@/data-access/calendar/events";
import { getEventTypes } from "@/data-access/calendar/eventTypes";

export default async function Page() {
  const eventTypes = await getEventTypes();
  const clubs = await getClubs();
  const events = await getEvents();

  return (
    <div className="mx-auto md:w-3/4 lg:w-1/2 mb-52">
      <Calendar clubs={clubs} eventTypes={eventTypes} events={events} />
    </div>
  );
}
