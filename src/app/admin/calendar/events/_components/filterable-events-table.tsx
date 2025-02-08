"use client";

import { Stack } from "@/components/stack/stack";
import { Table } from "@/components/table/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Club, Event } from "@/schemas/calendar/calendar";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type FilterableEventsTableProps = {
  events: Event[];
  clubs: Club[];
};

export function FilterableEventsTable({
  events,
  clubs,
}: FilterableEventsTableProps) {
  const [club, setClub] = useState("all");

  const filteredEvents = useMemo(() => {
    if (club === "all") return events;

    return events.filter((ev) => ev.club.slug === club);
  }, [club, events]);

  return (
    <Stack>
      <Select defaultValue={club} onValueChange={setClub}>
        <SelectTrigger>
          <SelectValue placeholder="Club" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Clubs</SelectItem>
          {clubs.map((club) => (
            <SelectItem key={club.slug} value={club.slug}>
              {club.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {filteredEvents.length > 0 && (
        <Table
          data={filteredEvents}
          headers={[
            { id: "club", label: "Club", render: (ev) => ev.club.name },
            {
              id: "title",
              label: "title",
              render: (ev) => ev.title,
            },
            {
              id: "actions",
              label: "Actions",
              styles: "text-right",
              render: (ev) => (
                <Button variant="ghost" asChild>
                  <Link href={`events/${ev.slug}/edit`}>
                    <PencilIcon />
                  </Link>
                </Button>
              ),
            },
          ]}
        />
      )}
      {filteredEvents.length === 0 && <p>No upcoming events.</p>}
    </Stack>
  );
}
