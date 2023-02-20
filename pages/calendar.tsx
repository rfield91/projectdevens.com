import path from "path";
import fsPromises from "fs/promises";
import { ICalendarEvent, IClub, IEventType } from "../common/types";
import EventsDisplay from "../components/calendar/EventsDisplay";
import EventTypeFilter from "../components/calendar/EventTypeFilter";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

    const clubs: IClub[] = JSON.parse(eventData.toString());
    const eventTypes: IEventType[] = JSON.parse(tagData.toString());

    var events: ICalendarEvent[] = [];

    clubs.forEach((club) => {
        club.events.forEach((clubEvent) => {
            clubEvent.club = club.club;

            events.push(clubEvent);
        });
    });

    return {
        props: {
            events: events,
            eventTypes: eventTypes,
        },
    };
}

export interface CalendarProps {
    events: ICalendarEvent[];
    eventTypes: IEventType[];
}

const Calendar = ({ events, eventTypes }: CalendarProps) => {
    const [typesToShow, setTypesToShow] = useState<string[]>([]);

    const handleFilterChange = (updatedTypes: string[]) => {
        console.log("types", updatedTypes);
        setTypesToShow(updatedTypes);
    };

    return (
        <div className="lg:w-1/2 mx-auto md:w-3/4">
            <div className="flex justify-center py-10">
                <Link href="/">
                    <Image
                        src="/images/project_devens_logo.png"
                        alt="PROJECT.Devens Logo"
                        width={150}
                        height={150}
                    />
                </Link>
            </div>
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
    );
};

export default Calendar;
