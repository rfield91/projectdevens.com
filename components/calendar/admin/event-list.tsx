"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event, EventType } from "@/library/calendar/types";
import { useRouter } from "next/navigation";

type EventListProps = {
  events: Event[];
  eventTypes: EventType[];
};

export function EventList({ events, eventTypes }: EventListProps) {
  const router = useRouter();

  const eventTypeDictionary = Object.fromEntries(
    eventTypes.map((x) => [x.typeName, x])
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Club</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Event Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((ev) => {
          const et = eventTypeDictionary[ev.eventTypeName];

          return (
            <TableRow key={ev.id}>
              <TableCell>{ev.clubName}</TableCell>
              <TableCell>{ev.name}</TableCell>
              <TableCell>
                <div
                  className={`bg-${et.color}-500 rounded-full text-white inline-block p-2 text-xs text-center`}
                >
                  {et.filterText}
                </div>
              </TableCell>
              <TableCell>{ev.startDate.toISOString()}</TableCell>
              <TableCell>
                {/* <DeleteEventButton
                  eventId={ev.id}
                  onClick={async () => {
                    await handleDeleteEvent(ev.id);
                    router.refresh();
                  }}
                /> */}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
