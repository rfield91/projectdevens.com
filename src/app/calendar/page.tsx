import logo from "@/app/assets/project_devens_logo.png";
import { Calendar } from "@/app/components/calendar";
import { getClubs } from "@/data-access/calendar/clubs";
import { getEvents } from "@/data-access/calendar/events";
import { getEventTypes } from "@/data-access/calendar/eventTypes";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const eventTypes = await getEventTypes();
  const clubs = await getClubs();
  const events = await getEvents();

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
