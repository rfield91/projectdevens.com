import { Card } from "@/components/card/card";
import { Header2 } from "@/components/header/headers";
import { Stack } from "@/components/stack/stack";
import { UserClubsEditor } from "@/features/admin/users/components/user-clubs-editor";
import { UserRolesEditor } from "@/features/admin/users/components/user-roles-editor";
import { getClubs } from "@/features/calendar/db/clubs";
import { getUserByDbId } from "@/services/user";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId: userIdParam } = await params;
  const user = await getUserByDbId(userIdParam);
  const clubs = await getClubs();

  if (user == null) return notFound();

  return (
    <Stack>
      <Header2>Details</Header2>
      <Card>
        <Stack gap="sm">
          <div>
            <strong>Username</strong>: {user.name}
          </div>
          <div>
            <strong>Email</strong>: {user.email}
          </div>
        </Stack>
      </Card>

      <UserRolesEditor user={user} />
      <UserClubsEditor user={user} clubs={clubs} />
    </Stack>
  );
}
