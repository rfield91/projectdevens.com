import {
  FilterList,
  FilterListItemDetails,
} from "@/components/filter-list/filter-list";
import { Club, EventType, Filters } from "@/features/calendar/schemas/calendar";

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
  function updateFilterList(
    item: FilterListItemDetails,
    currentList: string[],
    completeList: string[]
  ) {
    let updatedList: string[] = [];

    if (currentList.length === 0) {
      updatedList = completeList.filter((t) => t != item.id);
    } else {
      updatedList = item.enabled
        ? currentList.filter((t) => t != item.id)
        : [...currentList, item.id];
    }

    if (updatedList.length === completeList.length) {
      updatedList = [];
    }

    return updatedList;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center text-xl font-bold">Format</h3>
      <FilterList
        items={eventTypes.map((eventType) => ({
          id: eventType.typeId,
          name: eventType.name,
          enabled: !filters.excludedEventTypes.includes(eventType.typeId),
        }))}
        onSelectedItemChange={(item: FilterListItemDetails) => {
          handleFilterChange({
            ...filters,
            excludedEventTypes: updateFilterList(
              item,
              filters.excludedEventTypes,
              eventTypes.map((t) => t.typeId)
            ),
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
        onSelectedItemChange={(item: FilterListItemDetails) => {
          handleFilterChange({
            ...filters,
            excludedClubs: updateFilterList(
              item,
              filters.excludedClubs,
              clubs.map((t) => t.clubId)
            ),
          });
        }}
      />
      {(filters.excludedClubs.length != 0 ||
        filters.excludedEventTypes.length != 0) && (
        <div className="text-center">
          <button
            className="bg-zinc-300 text-zinc-800 p-1.5 text-xs rounded-full tracking-wider hover:bg-zinc-400"
            onClick={() =>
              handleFilterChange({
                excludedClubs: [],
                excludedEventTypes: [],
              })
            }
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
