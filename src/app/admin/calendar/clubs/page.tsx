import { Stack } from "@/components/stack/stack";
import { Table } from "@/components/table/table";
import { Button } from "@/components/ui/button";
import { getClubs } from "@/features/calendar/db/clubs";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const clubs = await getClubs();

  return (
    <Stack>
      <div>
        <Button asChild>
          <Link href="clubs/new">Add Club</Link>
        </Button>
      </div>
      <Table
        headers={[
          { id: "name", label: "Name", render: (club) => club.name },
          {
            id: "actions",
            label: "Actions",
            styles: "text-right",
            render: (club) => (
              <Button variant={"ghost"} asChild>
                <Link href={`clubs/${club.slug}/edit`}>
                  <PencilIcon />
                </Link>
              </Button>
            ),
          },
        ]}
        data={clubs}
      />
    </Stack>
  );
}
