export interface IClub {
    club: string;
    events: ICalendarEvent[];
}

export interface ICalendarEvent {
    club: string;
    type: string;
    name: string;
    startDate: Date;
    endDate: Date | null;
    link: string;
}

export interface IEventType {
    typeName: string;
    filterText: string;
    labelText: string;
    color: string;
    disabledColor: string;
    enabledColor: string;
}

export interface FilterState {
    typeName: string;
    isEnabled: boolean;
}
