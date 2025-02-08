"use client";

import { Header2 } from "@/components/header/headers";
import { Table } from "@/components/table/table";
import { Button } from "@/components/ui/button";
import { InferResultType } from "@/db/helpers";
import { deleteUserToClubRelation } from "@/features/admin/users/actions/users";
import { AddUserClub } from "@/features/admin/users/components/add-user-club";
import { Club } from "@/schemas/calendar/calendar";
import { TrashIcon } from "lucide-react";

type UserClubsEditorProps = {
  user: InferResultType<"usersTable", { clubs: { with: { club: true } } }>;
  clubs: Club[];
};

export const UserClubsEditor = ({ user, clubs }: UserClubsEditorProps) => {
  async function handleDelete(clubId: string) {
    deleteUserToClubRelation(user.userId, clubId);
  }

  return (
    <>
      <Header2>Clubs</Header2>

      <div>
        <AddUserClub user={user} clubs={clubs} />
      </div>

      <Table
        data={user.clubs}
        headers={[
          {
            id: "club",
            label: "Club",
            render: (userClub) => userClub.club.name,
          },
          {
            id: "actions",
            label: "Actions",
            styles: "text-right",
            render: (userClub) => (
              <Button
                variant={"ghost"}
                onClick={() => handleDelete(userClub.clubId)}
              >
                <TrashIcon />
              </Button>
            ),
          },
        ]}
      />
    </>
  );
};
