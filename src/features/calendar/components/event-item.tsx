import { Event } from "@/schemas/calendar/calendar";
import { format } from "date-fns";
import Link from "next/link";

type EventItemProps = {
  event: Event;
  showClubName: boolean;
};

export const EventItem = ({ event, showClubName = true }: EventItemProps) => {
  return (
    <div className="grid grid-cols-[40%_1fr] md:grid-cols-[25%_1fr] gap-4">
      <div className="md:border-l-2 border-r-2 border-red-700 py-4 flex flex-col items-center gap-1">
        <div className="text-2xl md:text-3xl tracking-widest uppercase">
          {format(event.startsAt, "MMM")}
        </div>
        <div className="text-3xl md:text-6xl">
          {format(event.startsAt, "dd")}
        </div>
        <div className="bg-neutral-300 text-neutral-800 p-1.5 text-xs rounded-full tracking-wider pointer-events-none">
          {event.type.name.toUpperCase()}
        </div>
      </div>
      <div className="flex flex-col gap-2 py-4">
        {showClubName && (
          <div className="flex flex-col items-start md:flex-row md:items-center gap-4">
            <div className="text-xl md:text-3xl">
              <Link
                href={`/calendar/club/${event.club.slug}`}
                className="hover:text-neutral-600 transition-all ease-in-out duration-500"
                title="View more events held by this club"
              >
                {event.club.name}
              </Link>
            </div>
          </div>
        )}
        <div className="text-xl md:text-2">{event.title}</div>
        <div className="">
          {event.url && (
            <Link
              href={event.url}
              target="_blank"
              className={`
                inline-block rounded-full text-xs p-2 hover:brightness-90 transition-all ease-in-out duration-500
                bg-neutral-300 text-neutral-700 hover:text-neutral-800
                dark:bg-neutral-800 dark:text-white dark:hover:text-neutral-100
              `}
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
