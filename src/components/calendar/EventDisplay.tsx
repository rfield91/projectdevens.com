import Link from "next/link";
import DateDisplay from "./DateDisplay";
import { EventWithExtendedData } from "~/common/types";

export interface EventDisplayProps {
    event: EventWithExtendedData;
}

const EventDisplay = ({ event }: EventDisplayProps) => {
    return (
        <li>
            <Link href={event.link} target="_blank">
                <div className="my-5 grid grid-cols-12 bg-white drop-shadow-lg">
                    <div className="col-span-2 flex">
                        <div
                            className={`h-full w-2 ${event.calendarEventType.enabledColor}`}
                        ></div>
                        <DateDisplay
                            startDate={event.startDate}
                            endDate={event.endDate}
                        />
                    </div>
                    <div className="col-span-10">
                        <div className="p-2">
                            <div className="text-2xl font-bold">
                                {event.club.name}
                            </div>
                            <div className="text-xl">{event.name}</div>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default EventDisplay;
