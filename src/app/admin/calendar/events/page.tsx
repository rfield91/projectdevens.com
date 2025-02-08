import { FilterableEventsTable } from "@/app/admin/calendar/events/_components/filterable-events-table";
import { Stack } from "@/components/stack/stack";
import { Button } from "@/components/ui/button";
import { getClubsForUser } from "@/features/admin/calendar/db/clubs";
import { getUpcomingEventsForUser } from "@/features/admin/calendar/db/events";
import { getUser } from "@/services/user";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      <UserEvents />
    </Suspense>
  );
}

async function UserEvents() {
  const user = await getUser();

  if (user.user === null) {
    return user.redirectToSignIn();
  }

  const clubs = await getClubsForUser(user.user.userId);
  const events = await getUpcomingEventsForUser(user.user.userId);

  return (
    <Stack>
      <div>
        <Button asChild>
          <Link href="events/new">Add Event</Link>
        </Button>
      </div>
      <FilterableEventsTable clubs={clubs} events={events} />
    </Stack>
  );
}
