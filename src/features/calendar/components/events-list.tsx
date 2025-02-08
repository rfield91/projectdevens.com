import { EventItem } from "@/features/calendar/components/event-item";
import { Event } from "@/schemas/calendar/calendar";

type EventListProps = {
  events: Event[];
  showClubName: boolean;
};

export const EventList = ({ events, showClubName }: EventListProps) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {events.map((ev) => (
        <EventItem key={ev.eventId} event={ev} showClubName={showClubName} />
      ))}
    </div>
  );
};
