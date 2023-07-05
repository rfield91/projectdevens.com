import Tag from "./Tag";
import type { CalendarEventType } from "@prisma/client";

export interface EventTypeFilterProps {
    eventTypes: CalendarEventType[];
    selectedFilters: string[];
    handleFilterChange: (eventType: string, isEnabled: boolean) => void;
}

const EventTypeFilter = ({
    eventTypes,
    selectedFilters,
    handleFilterChange,
}: EventTypeFilterProps) => {
    return (
        <div className="my-5 text-center">
            {eventTypes.map((eventType) => (
                <Tag
                    eventType={eventType.typeName}
                    enabled={
                        selectedFilters.find((f) => f == eventType.typeName) !==
                        undefined
                    }
                    key={eventType.typeName}
                    color={eventType.color}
                    onClick={handleFilterChange}
                >
                    {eventType.filterText}
                </Tag>
            ))}
        </div>
    );
};

export default EventTypeFilter;
