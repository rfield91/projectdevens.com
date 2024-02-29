import { Event } from "@/library/calendar/types";
import Link from "next/link";
import { DateDisplay } from "./date-display";

type EventDisplayProps = {
  event: Event;
};

export function EventDisplay({ event }: EventDisplayProps) {
  return (
    <li>
      <Link href={event.link} target="_blank">
        <div className="my-5 grid grid-cols-12 bg-white drop-shadow-lg">
          <div className="col-span-3 flex">
            <div className={`h-full w-2 bg-${event.color}-500`}></div>
            <DateDisplay startDate={event.startDate} endDate={event.endDate} />
          </div>
          <div className="col-span-9">
            <div className="pl-2 pt-1">
              <div className="text font-bold">{event.clubName}</div>
              <div className="text-xs">{event.name}</div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
