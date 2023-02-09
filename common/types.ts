export interface CalendarEvent {
    club: string;
    type: string;
    name: string;
    startDate: Date;
    endDate: Date;
    link: string;
}

export interface CalendarProps {
    events: CalendarEvent[];
    eventTypes: EventType[];
}

export interface DateDisplayProps {
    startDate: Date;
    endDate?: Date;
}

export interface EventType {
    typeName: string;
    filterText: string;
    labelText: string;
    color: string;
    disabledColor: string;
    enabledColor: string;
}

export interface TypeTagDisplayProps {
    eventType: EventType;
}

export interface EventTypeFilterProps {
    eventTypes: EventType[];
    handleFilterChange: (updatedTypes: string[]) => any;
}

export interface TagProps {
    tag: EventType;
    filterState: FilterState;
    handleOnClick: (newStatus: FilterState) => any;
}

export interface EventDisplayProps {
    event: CalendarEvent;
    eventType: EventType;
}

export interface EventsDisplayProps {
    events: CalendarEvent[];
    eventTypes: EventType[];
    typesToShow: string[];
}

export class FilterState {
    typeName: string;
    isEnabled: boolean;

    constructor(typeName: string, isEnabled: boolean) {
        this.typeName = typeName;
        this.isEnabled = isEnabled;
    }
}
