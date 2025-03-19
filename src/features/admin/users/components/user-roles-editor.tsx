"use client";

import { Header2 } from "@/components/header/headers";
import { Table } from "@/components/table/table";
import { Button } from "@/components/ui/button";
import { InferResultType } from "@/db/helpers";
import { deleteUserToRoleRelation } from "@/features/admin/users/actions/users";

import { AddUserRole } from "@/features/admin/users/components/add-user-role";
import { UserRole } from "@/types/users";
import { TrashIcon } from "lucide-react";

type UserRolesEditorProps = {
  user: InferResultType<"usersTable", { roles: true }>;
};
export const UserRolesEditor = ({ user }: UserRolesEditorProps) => {
  async function handleDelete(role: UserRole) {
    deleteUserToRoleRelation(user.userId, role);
  }

  return (
    <>
      <Header2>Roles</Header2>

      <div>
        <AddUserRole user={user} />
      </div>

      <Table
        data={user.roles}
        headers={[
          {
            id: "role",
            label: "Role",
            render: (role) => role.role,
          },
          {
            id: "actions",
            label: "Actions",
            styles: "text-right",
            render: (role) => (
              <Button variant={"ghost"} onClick={() => handleDelete(role.role)}>
                <TrashIcon />
              </Button>
            ),
          },
        ]}
      />
    </>
  );
};
