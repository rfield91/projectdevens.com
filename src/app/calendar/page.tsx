import logo from "@/app/assets/project_devens_logo.png";
import { Calendar } from "@/features/calendar/components/calendar";
import { getClubs } from "@/features/calendar/db/clubs";
import { getEventTypes } from "@/features/calendar/db/event-types";
import { getUpcomingEvents } from "@/features/calendar/db/events";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense>
      <CalendarContent />
    </Suspense>
  );
}

async function CalendarContent() {
  const eventTypes = await getEventTypes();
  const clubs = await getClubs();
  const events = await getUpcomingEvents();

  return (
    <div className="mx-auto md:w-3/4 lg:w-1/2 mb-52 h-full">
      <Link href="/">
        <Image
          src={logo}
          alt="PROJECT.Devens Logo"
          width={250}
          className="mx-auto my-10"
        />
      </Link>
      <Calendar clubs={clubs} eventTypes={eventTypes} events={events} />
    </div>
  );
}
