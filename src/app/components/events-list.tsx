import { EventItem } from "@/app/components/event-item";
import { Event } from "@/types/calendar";

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
