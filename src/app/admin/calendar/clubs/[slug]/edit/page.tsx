import { ClubForm } from "@/features/admin/calendar/components/clubs/club-form";
import { getClubBySlug } from "@/features/calendar/db/clubs";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (club === undefined) {
    return notFound();
  }

  return (
    <div>
      <ClubForm club={club} />
    </div>
  );
}
