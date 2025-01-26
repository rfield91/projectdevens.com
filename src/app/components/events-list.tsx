import { EventItem } from "@/app/components/event-item";
import { Event } from "@/types/calendar";

type EventListProps = {
  events: Event[];
};

export const EventList = ({ events }: EventListProps) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {events.map((ev) => (
        <EventItem key={ev.eventId} event={ev} />
      ))}
    </div>
  );
};
