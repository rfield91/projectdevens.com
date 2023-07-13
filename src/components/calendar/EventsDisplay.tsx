import EventDisplay from "./EventDisplay";
import { EventWithExtendedData } from "~/common/types";

export interface EventsDisplayProps {
    events: EventWithExtendedData[];
}

const EventsDisplay = ({ events }: EventsDisplayProps) => {
    if (events.length == 0) {
        return (
            <div className="mx-1 my-2 p-2 text-center">No upcoming events</div>
        );
    }
    return (
        <ul className="list-none px-2">
            {events.map((ev) => (
                <EventDisplay event={ev} key={ev.id} />
            ))}
        </ul>
    );
};

export default EventsDisplay;
