import Link from "next/link";
import DateDisplay from "./DateDisplay";
import TypeTagDisplay from "./TypeTagDisplay";
import type { CalendarEvent } from "@prisma/client";

export interface EventDisplayProps {
    event: CalendarEvent;
}

const EventDisplay = ({ event }: EventDisplayProps) => {
    return (
        <div className="grid grid-cols-12 border-b-2 border-slate-200 px-2 py-4 last:border-b-0">
            <div className="col-span-2 pt-1 text-xs">
                <DateDisplay
                    startDate={event.startDate}
                    endDate={event.endDate}
                />
            </div>
            <div className="col-span-8">
                {event.link != undefined ? (
                    <Link href={event.link} target="_blank">
                        <div className="font-bold">{event.club.name}</div>
                        <div className="text-xs">{event.name}</div>
                    </Link>
                ) : (
                    <>
                        <div className="font-bold">{event.club.name}</div>
                        <div className="text-xs">{event.name}</div>
                    </>
                )}
            </div>
            <div className="col-span-2 text-center">
                <TypeTagDisplay eventType={event.calendarEventType} />
            </div>
        </div>
    );
};

export default EventDisplay;
