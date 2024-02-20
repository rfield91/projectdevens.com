"use client";

import { EventType } from "@/library/calendar/types";
import { EventTypeTag } from "./event-type-tag";

type EventTypeFilterProps = {
  eventTypes: EventType[];
  deselectedFilters: string[];
  handleFilterChange: (eventType: string, isEnabled: boolean) => void;
};

export function EventTypeFilter({
  eventTypes,
  deselectedFilters,
  handleFilterChange,
}: EventTypeFilterProps) {
  return (
    <>
      <h2 className="text-center mb-2 font-medium">Event Types</h2>
      <div className="flex justify-center">
        {eventTypes.map((eventType) => (
          <EventTypeTag
            key={eventType.typeName}
            eventType={eventType}
            enabled={
              deselectedFilters.find((f) => f == eventType.typeName) ===
              undefined
            }
            onClick={handleFilterChange}
          />
        ))}
      </div>
    </>
  );
}
