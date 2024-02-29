import { EventList } from "@/components/calendar/admin/event-list";
import { Button } from "@/components/ui/button";

import { getEventTypes, getEvents } from "@/library/calendar/repository";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

export default async function Page() {
  const events = await getEvents();
  const eventTypes = await getEventTypes();

  return (
    <div className="mx-auto w-3/4 mt-5">
      <Link href="admin/add">
        <Button>
          <FaPlus className="mr-2" /> Add Event
        </Button>
      </Link>
      <EventList eventTypes={eventTypes} events={events} />
    </div>
  );
}
