import { useEffect, useState } from "react";
import { FilterState, IEventType } from "../../common/types";
import Tag from "./Tag";

export interface EventTypeFilterProps {
    eventTypes: IEventType[];
    handleFilterChange: (updatedTypes: string[]) => any;
}

const EventTypeFilter = ({
    eventTypes,
    handleFilterChange,
}: EventTypeFilterProps) => {
    const [filterStates, setFilterStates] = useState<FilterState[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("eventTypeFilters");
        if (saved) {
            const savedFilters: FilterState[] = JSON.parse(saved);

            setFilterStates(savedFilters);
        } else {
            const defaultFilters = eventTypes.map(
                (eventType) => new FilterState(eventType.typeName, true)
            );

            localStorage.setItem(
                "eventTypeFilters",
                JSON.stringify(defaultFilters)
            );

            setFilterStates(defaultFilters);
        }
    }, []);

    useEffect(() => {
        handleFilterChange(
            filterStates.filter((fs) => fs.isEnabled).map((fs) => fs.typeName)
        );
    }, [filterStates]);

    const handleToggleFilterStatus = (newState: FilterState) => {
        const newStates = [...filterStates];
        var index = newStates.findIndex((f) => f.typeName == newState.typeName);
        newStates[index] = newState;
        localStorage.setItem("eventTypeFilters", JSON.stringify(newStates));
        setFilterStates(newStates);
    };

    const eventTypeMap = new Map<string, IEventType>();
    eventTypes.forEach((eventType) =>
        eventTypeMap.set(eventType.typeName, eventType)
    );

    const tags: React.ReactElement[] = [];

    eventTypeMap.forEach((eventType) => {
        tags.push(
            <Tag
                tag={eventType}
                filterState={
                    filterStates?.find(
                        (fs) => fs.typeName == eventType.typeName
                    ) ?? new FilterState(eventType.typeName, true)
                }
                key={eventType.typeName}
                handleOnClick={handleToggleFilterStatus}
            />
        );
    });

    return <div className="text-center my-5">{tags}</div>;
};

export default EventTypeFilter;
