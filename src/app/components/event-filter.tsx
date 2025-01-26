import { FilterList } from "@/app/components/filter-list/filter-list";
import { Club, EventType, Filters } from "@/types/calendar";

type EventFilterProps = {
  eventTypes: EventType[];
  clubs: Club[];
  filters: Filters;
  handleFilterChange: (newFilterData: Filters) => void;
};

export const EventFilter = ({
  eventTypes,
  clubs,
  filters,
  handleFilterChange,
}: EventFilterProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center text-xl font-bold">Format</h3>
      <FilterList
        items={eventTypes.map((eventType) => ({
          id: eventType.typeId,
          name: eventType.name,
          enabled: !filters.excludedEventTypes.includes(eventType.typeId),
        }))}
        onSelectedItemChange={(item: {
          id: string;
          name: string;
          enabled: boolean;
        }) => {
          const updatedFilters = item.enabled
            ? filters.excludedEventTypes.filter((e) => e != item.id)
            : [...filters.excludedEventTypes, item.id];

          handleFilterChange({
            ...filters,
            excludedEventTypes: updatedFilters,
          });
        }}
      />
      <h3 className="text-center text-xl font-bold">Clubs</h3>
      <FilterList
        items={clubs.map((club) => ({
          id: club.clubId,
          name: club.name,
          enabled: !filters.excludedClubs.includes(club.clubId),
        }))}
        onSelectedItemChange={(item: {
          id: string;
          name: string;
          enabled: boolean;
        }) => {
          const updatedFilters = item.enabled
            ? filters.excludedClubs.filter((c) => c != item.id)
            : [...filters.excludedClubs, item.id];

          handleFilterChange({
            ...filters,
            excludedClubs: updatedFilters,
          });
        }}
      />
    </div>
  );
};
