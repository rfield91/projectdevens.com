"use client";

import logo from "@/app/assets/project_devens_logo.png";
import { useUpdatableList } from "@/hooks/use-updatable-list";
import { Club, Event, EventType } from "@/library/calendar/types";
import Image from "next/image";
import Link from "next/link";
import { Loading } from "../ui/loading";
import { ClubFilter } from "./club-filter";
import { EventTypeFilter } from "./event-type-filter";
import { EventsDisplay } from "./events-display";

type CalendarProps = {
  events: Event[];
  eventTypes: EventType[];
  clubs: Club[];
};

export function Calendar({ events, eventTypes, clubs }: CalendarProps) {
  const {
    storedList: deselectedEventTypes,
    updaterFunction: deselectedEventTypesUpdaterFunction,
    isLoading: isEventTypesLoading,
  } = useUpdatableList("selectedEventTypes", []);

  const {
    storedList: deselectedClubs,
    updaterFunction: deselectedClubsUpdaterFunction,
    isLoading: isClubsLoading,
  } = useUpdatableList("selectedClubs", []);

  const filteredEvents = events.filter(
    (ev) =>
      !deselectedEventTypes.includes(ev.eventTypeName) &&
      !deselectedClubs.includes(ev.clubId)
  );

  return (
    <div className="mx-auto md:w-3/4 lg:w-1/2 mb-52">
      <div className="flex justify-center py-10">
        <Link href="/">
          <Image src={logo} alt="PROJECT.Devens Logo" width={250} />
        </Link>
      </div>
      {(isEventTypesLoading || isClubsLoading) && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {!(isEventTypesLoading && isClubsLoading) && (
        <>
          <EventTypeFilter
            eventTypes={eventTypes}
            deselectedFilters={deselectedEventTypes}
            handleFilterChange={deselectedEventTypesUpdaterFunction}
          />
          <ClubFilter
            clubs={clubs}
            deselectedFilters={deselectedClubs}
            handleFilterChange={deselectedClubsUpdaterFunction}
          />
          <EventsDisplay events={filteredEvents} />
        </>
      )}
    </div>
  );
}
