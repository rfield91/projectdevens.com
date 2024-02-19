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
          <div className="col-span-2 flex">
            <div className={`h-full w-2 bg-${event.color}-500`}></div>
            <DateDisplay startDate={event.startDate} endDate={event.endDate} />
          </div>
          <div className="col-span-10">
            <div className="p-2">
              <div className="text-2xl font-bold">{event.clubName}</div>
              <div className="text-xl">{event.name}</div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
