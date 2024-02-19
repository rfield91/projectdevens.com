import { Event } from "@/library/calendar/types";
import { EventDisplay } from "./event-display";

type EventsDisplayProps = {
  events: Event[];
};

export function EventsDisplay({ events }: EventsDisplayProps) {
  if (events.length == 0) {
    return <div className="mx-1 my-2 p-2 text-center">No upcoming events</div>;
  }
  return (
    <ul className="list-none px-2">
      {events.map((ev) => (
        <EventDisplay event={ev} key={ev.id} />
      ))}
    </ul>
  );
}
