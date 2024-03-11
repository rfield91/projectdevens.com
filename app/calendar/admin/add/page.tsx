import { AddEventForm } from "@/components/calendar/admin/add-event-form";
import { getClubs, getEventTypes } from "@/library/calendar/repository";

export default async function Page() {
  const eventTypes = await getEventTypes();
  const clubs = await getClubs();

  return (
    <div className="mx-auto w-1/2 mt-5">
      <AddEventForm eventTypes={eventTypes} clubs={clubs} />
    </div>
  );
}
