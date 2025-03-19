import { Stack } from "@/components/stack/stack";
import { Table } from "@/components/table/table";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/services/user";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const users = await getUsers();

  return (
    <Stack>
      <Table
        data={users}
        headers={[
          { id: "name", label: "Name", render: (user) => user.name },
          {
            id: "actions",
            label: "Actions",
            styles: "text-right",
            render: (user) => (
              <Button variant={"ghost"} asChild>
                <Link href={`users/${user.userId}/edit`}>
                  <PencilIcon />
                </Link>
              </Button>
            ),
          },
        ]}
      />
    </Stack>
  );
}
