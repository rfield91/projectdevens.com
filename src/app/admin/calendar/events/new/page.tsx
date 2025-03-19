import { EventForm } from "@/features/admin/calendar/components/events/event-form";
import { getClubsForUser } from "@/features/admin/calendar/db/clubs";
import { getEventTypes } from "@/features/calendar/db/event-types";
import { getUser } from "@/services/user";

export default async function Page() {
  const user = await getUser();

  if (user.user === null) {
    return user.redirectToSignIn();
  }

  const eventTypes = await getEventTypes();
  const clubs = await getClubsForUser(user.user.userId);

  return (
    <div>
      <EventForm eventTypes={eventTypes} clubs={clubs} />
    </div>
  );
}
