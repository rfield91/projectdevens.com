import { useEffect } from "react";
import { FilterState, IEventType } from "../../common/types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Tag from "./Tag";

export interface EventTypeFilterProps {
    eventTypes: IEventType[];
    handleFilterChange: (updatedTypes: string[]) => any;
}

const EventTypeFilter = ({
    eventTypes,
    handleFilterChange,
}: EventTypeFilterProps) => {
    const defaultEventTypes = eventTypes.map((eventType) => {
        return {
            typeName: eventType.typeName,
            isEnabled: true,
        };
    });
    const [filterStates, setFilterStates] = useLocalStorage<FilterState[]>(
        "eventTypeFilters",
        defaultEventTypes
    );

    useEffect(() => {
        handleFilterChange(
            filterStates.filter((fs) => fs.isEnabled).map((fs) => fs.typeName)
        );
    }, [filterStates]);

    const handleToggleFilterStatus =
        (eventType: IEventType) => (toggled: boolean) => {
            const nextFilterStates = [...filterStates];
            const index = nextFilterStates.findIndex(
                (f) => f.typeName == eventType.typeName
            );
            if (index === -1) {
                nextFilterStates.push({
                    typeName: eventType.typeName,
                    isEnabled: toggled,
                });
            } else {
                nextFilterStates[index].isEnabled = toggled;
            }
            setFilterStates(nextFilterStates);
        };

    return (
        <div className="text-center my-5">
            {eventTypes.map((eventType) => (
                <Tag
                    enabled={
                        !!filterStates.find(
                            (f) => f.typeName == eventType.typeName
                        )?.isEnabled
                    }
                    key={eventType.typeName}
                    color={eventType.color}
                    onClick={handleToggleFilterStatus(eventType)}
                >
                    {eventType.filterText}
                </Tag>
            ))}
        </div>
    );
};

export default EventTypeFilter;
