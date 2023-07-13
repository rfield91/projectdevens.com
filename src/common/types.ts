// export interface IClub {
//     clubCode: string;
//     name: string;
// }

// export interface ICalendarEvent {
//     id: string;
//     clubCode: string;
//     club: IClub;
//     eventType: string;
//     calendarEventType: IEventType;
//     name: string;
//     startDate: Date;
//     endDate: Date;
//     link: string;
// }

// export interface IEventType {
//     typeName: string;
//     filterText: string;
//     labelText: string;
//     color: string;
//     disabledColor: string;
//     enabledColor: string;
// }

export interface FilterState {
    typeName: string;
    isEnabled: boolean;
}

import { Prisma } from "@prisma/client";

const eventExtendedData = Prisma.validator<Prisma.CalendarEventArgs>()({
    include: {
        calendarEventType: true,
        club: true,
    },
});

export type EventWithExtendedData = Prisma.CalendarEventGetPayload<
    typeof eventExtendedData
>;
