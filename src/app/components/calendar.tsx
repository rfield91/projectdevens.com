"use client";

import { EventFilter } from "@/app/components/event-filter";
import { EventList } from "@/app/components/events-list";
import { Club, Event, EventType, Filters } from "@/types/calendar";
import { useMemo, useState } from "react";

type CalendarProps = {
  clubs: Club[];
  eventTypes: EventType[];
  events: Event[];
};

export const Calendar = ({ clubs, eventTypes, events }: CalendarProps) => {
  const [filters, setFilters] = useState<Filters>({
    excludedEventTypes: [],
    excludedClubs: [],
  });

  const filteredEvents = useMemo(() => {
    return events.filter(
      (ev) =>
        !filters.excludedClubs.includes(ev.clubId) &&
        !filters.excludedEventTypes.includes(ev.typeId)
    );
  }, [events, filters]);

  return (
    <div className="flex flex-col items-center gap-10 py-10">
      <EventFilter
        clubs={clubs}
        eventTypes={eventTypes}
        filters={filters}
        handleFilterChange={(newFilterData) => setFilters(newFilterData)}
      />
      <EventList events={filteredEvents} />
    </div>
  );
};
