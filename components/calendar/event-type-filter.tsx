"use client";

import { EventType } from "@/library/calendar/types";
import Tag from "./tag";

type EventTypeFilterProps = {
  eventTypes: EventType[];
  selectedFilters: string[];
  handleFilterChange: (eventType: string, isEnabled: boolean) => void;
};

export function EventTypeFilter({
  eventTypes,
  selectedFilters,
  handleFilterChange,
}: EventTypeFilterProps) {
  return (
    <div className="flex justify-center">
      {eventTypes.map((eventType) => (
        <Tag
          key={eventType.typeName}
          eventType={eventType}
          enabled={
            selectedFilters.find((f) => f == eventType.typeName) !== undefined
          }
          onClick={handleFilterChange}
        />
      ))}
    </div>
  );
}
