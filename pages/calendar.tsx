import path from "path";
import fsPromises from "fs/promises";
import { CalendarEvent, CalendarProps, EventType } from "../common/types";
import EventsDisplay from "../components/calendar/EventsDisplay";
import EventTypeFilter from "../components/calendar/EventTypeFilter";
import { useState } from "react";

export async function getStaticProps() {
    const eventFilePath = path.join(
        process.cwd(),
        "data/calendar/calendar.json"
    );
    const tagFilePath = path.join(
        process.cwd(),
        "data/calendar/eventTypes.json"
    );

    const eventData = await fsPromises.readFile(eventFilePath);
    const tagData = await fsPromises.readFile(tagFilePath);

    const events: CalendarEvent[] = JSON.parse(eventData.toString());
    const eventTypes: EventType[] = JSON.parse(tagData.toString());

    return {
        props: {
            events: events,
            eventTypes: eventTypes,
        },
    };
}

const Calendar = ({ events, eventTypes }: CalendarProps) => {
    const [typesToShow, setTypesToShow] = useState<string[]>([]);

    const handleFilterChange = (updatedTypes: string[]) => {
        setTypesToShow(updatedTypes);
    };

    return (
        <div className="  bg-slate-100 pb-20 min-h-screen">
            <div className="lg:w-1/2 mx-auto md:w-3/4 p-2">
                <EventTypeFilter
                    eventTypes={eventTypes}
                    handleFilterChange={handleFilterChange}
                />
                <EventsDisplay
                    events={events}
                    eventTypes={eventTypes}
                    typesToShow={typesToShow}
                />
            </div>
        </div>
    );
};

export default Calendar;
