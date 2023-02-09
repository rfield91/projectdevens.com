import {
    CalendarEvent,
    EventsDisplayProps,
    EventType,
} from "../../common/types";
import EventDisplay from "./EventDisplay";

const EventsDisplay = ({
    events,
    eventTypes,
    typesToShow,
}: EventsDisplayProps) => {
    const filters = new Map<string, EventType>();

    eventTypes.forEach((eventType) =>
        filters.set(eventType.typeName, eventType)
    );

    events.sort((a: CalendarEvent, b: CalendarEvent) => {
        return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
    });

    events = events.filter((ev) => typesToShow.includes(ev.type));

    const monthNames: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const months = new Map<number, CalendarEvent[]>();

    events.forEach((ev: CalendarEvent) => {
        const date = new Date(ev.startDate);
        const month = date.getMonth();

        if (months.has(month)) {
            months.get(month)?.push(ev);
        } else {
            months.set(month, [ev]);
        }
    });

    const calendar: React.ReactElement[] = [];

    months.forEach((events, month) => {
        const eventEntries: any = [];

        events.forEach((ev, index) => {
            const eventType: EventType = filters.get(ev.type)!;

            eventEntries.push(
                <EventDisplay event={ev} eventType={eventType} key={index} />
            );
        });

        const monthEvents = (
            <div key={month} className="p-2 mx-1 my-2 bg-white">
                <h3 className="text-xl text-center font-bold">
                    {monthNames[month]}
                </h3>
                <div className="events">{eventEntries}</div>
            </div>
        );

        calendar.push(monthEvents);
    });

    return (
        <div>
            {calendar.length > 0 ? (
                calendar
            ) : (
                <div className="p-2 mx-1 my-2 bg-white text-center">
                    No events
                </div>
            )}
        </div>
    );
};

export default EventsDisplay;
