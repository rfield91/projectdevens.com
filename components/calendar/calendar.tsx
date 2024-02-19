"use client";

import logo from "@/app/assets/project_devens_logo.png";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Event, EventType } from "@/library/calendar/types";
import Image from "next/image";
import Link from "next/link";
import { Loading } from "../ui/loading";
import { EventTypeFilter } from "./event-type-filter";
import { EventsDisplay } from "./events-display";

type CalendarProps = {
  events: Event[];
  eventTypes: EventType[];
};

export function Calendar({ events, eventTypes }: CalendarProps) {
  const [selectedFilters, setSelectedFilters, isLoading] = useLocalStorage<
    string[]
  >(
    "selectedEventTypes",
    eventTypes.map((et) => et.typeName)
  );

  const handleFilterChange = (eventType: string, isEnabled: boolean) => {
    const currentIndex = selectedFilters.indexOf(eventType);

    if (isEnabled && currentIndex === -1) {
      setSelectedFilters([...selectedFilters, eventType]);
    } else if (!isEnabled && currentIndex > -1) {
      const newFilters = [...selectedFilters];

      newFilters.splice(currentIndex, 1);

      setSelectedFilters(newFilters);
    }
  };

  const filteredEvents = events.filter((ev) =>
    selectedFilters.includes(ev.eventTypeName)
  );

  return (
    <div className="mx-auto md:w-3/4 lg:w-1/2">
      <div className="flex justify-center py-10">
        <Link href="/">
          <Image src={logo} alt="PROJECT.Devens Logo" width={250} />
        </Link>
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <>
          <EventTypeFilter
            eventTypes={eventTypes}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
          />
          <EventsDisplay events={filteredEvents} />
        </>
      )}
    </div>
  );
}
