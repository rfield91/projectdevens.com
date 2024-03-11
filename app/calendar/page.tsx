import { Calendar } from "@/components/calendar/calendar";
import {
  getClubs,
  getEventTypes,
  getEvents,
} from "@/library/calendar/repository";
import { cache } from "react";

export const getData = cache(async () => {
  return {
    eventTypes: await getEventTypes(),
    clubs: await getClubs(),
    events: await getEvents(),
  };
});

export default async function Page() {
  const { events, eventTypes, clubs } = await getData();

  return <Calendar events={events} eventTypes={eventTypes} clubs={clubs} />;
}
