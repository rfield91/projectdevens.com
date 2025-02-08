"use client";

import { EventFilter } from "@/features/calendar/components/event-filter";
import { EventList } from "@/features/calendar/components/events-list";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Club, Event, EventType, Filters } from "@/schemas/calendar/calendar";
import { useMemo } from "react";

type CalendarProps = {
  clubs: Club[];
  eventTypes: EventType[];
  events: Event[];
};

export const Calendar = ({ clubs, eventTypes, events }: CalendarProps) => {
  const [filters, setFilters, isLoading] = useLocalStorage<Filters>(
    "pd.calendar.filters",
    {
      excludedEventTypes: [],
      excludedClubs: [],
    }
  );

  const filteredEvents = useMemo(() => {
    return events.filter(
      (ev) =>
        !filters.excludedClubs.includes(ev.clubId) &&
        !filters.excludedEventTypes.includes(ev.typeId)
    );
  }, [events, filters]);

  return (
    <div className="flex flex-col items-center gap-10 px-1 lg:px-0">
      <div
        className={`${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-all ease-in duration-500 delay-1000 flex flex-col gap-10`}
      >
        <EventFilter
          clubs={clubs}
          eventTypes={eventTypes}
          filters={filters}
          handleFilterChange={(newFilterData) => setFilters(newFilterData)}
        />
        <EventList events={filteredEvents} showClubName={true} />
      </div>
    </div>
  );
};
