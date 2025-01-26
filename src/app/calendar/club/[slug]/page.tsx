import logo from "@/app/assets/project_devens_logo.png";
import { EventList } from "@/app/components/events-list";
import { getClubBySlug } from "@/data-access/calendar/clubs";
import { getEventsByClub } from "@/data-access/calendar/events";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const club = await getClubBySlug(slug);

  if (club === undefined) {
    return <div>Club Not Found</div>;
  }

  const events = await getEventsByClub(club.clubId);

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
      {events && <EventList events={events} />}
      {!events && <div>This club does not have any upcoming events.</div>}
    </div>
  );
}
