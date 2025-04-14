import logo from "@/app/assets/project_devens_logo.png";
import { EventList } from "@/features/calendar/components/events-list";
import { getClubBySlug } from "@/features/calendar/db/clubs";
import { getUpcomingEventsByClub } from "@/features/calendar/db/events";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const [clubSlug, typeSlug] = slug;

  const club = await getClubBySlug(clubSlug);

  if (club === undefined) {
    return <div>Club Not Found</div>;
  }

  let events = await getUpcomingEventsByClub(club.clubId);

  if (typeSlug !== undefined) {
    events = events.filter((ev) => ev.type.slug === typeSlug);
  }

  return (
    <div className="mx-auto md:w-3/4 lg:w-1/2 mb-52">
      <Link href="/calendar">
        <Image
          src={logo}
          alt="PROJECT.Devens Logo"
          width={250}
          className="mx-auto my-10"
        />
      </Link>
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-5xl">{club.name}</h1>
        {events && <EventList events={events} showClubName={false} />}
        {!events && <div>This club does not have any upcoming events.</div>}
      </div>
    </div>
  );
}
