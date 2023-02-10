export interface IClub {
    club: string;
    events: ICalendarEvent[];
}

export interface ICalendarEvent {
    club: string;
    type: string;
    name: string;
    startDate: Date;
    endDate: Date;
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

export class FilterState {
    typeName: string;
    isEnabled: boolean;

    constructor(typeName: string, isEnabled: boolean) {
        this.typeName = typeName;
        this.isEnabled = isEnabled;
    }
}
