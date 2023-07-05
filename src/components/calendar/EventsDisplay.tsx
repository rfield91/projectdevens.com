import type { CalendarEvent, CalendarEventType } from "@prisma/client";
import EventDisplay from "./EventDisplay";

export interface EventsDisplayProps {
    events: CalendarEvent[];
    eventTypes: CalendarEventType[];
    typesToShow: string[];
}

const EventsDisplay = ({
    events,
    eventTypes,
    typesToShow,
}: EventsDisplayProps) => {
    const filters = new Map<string, CalendarEventType>();

    eventTypes.forEach((eventType) =>
        filters.set(eventType.typeName, eventType)
    );

    events.sort((a: CalendarEvent, b: CalendarEvent) => {
        return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
    });

    events = events.filter((ev) => typesToShow.includes(ev.eventType));

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
        const eventEntries: React.ReactElement[] = [];

        events.forEach((ev, index) => {
            eventEntries.push(<EventDisplay event={ev} key={index} />);
        });

        const monthEvents = (
            <div key={month} className="mx-1 my-2 p-2">
                <h3 className="text-center text-xl font-bold">
                    {monthNames[month]}
                </h3>
                <div className="events">{eventEntries}</div>
            </div>
        );

        calendar.push(monthEvents);
    });

    return (
        <div className="px-2">
            {calendar.length > 0 ? (
                calendar
            ) : (
                <div className="mx-1 my-2 p-2 text-center">
                    No upcoming events
                </div>
            )}
        </div>
    );
};

export default EventsDisplay;
