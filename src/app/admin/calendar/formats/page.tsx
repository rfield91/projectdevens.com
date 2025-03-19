import { Stack } from "@/components/stack/stack";
import { Table } from "@/components/table/table";
import { Button } from "@/components/ui/button";
import { getEventTypes } from "@/features/calendar/db/event-types";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const eventTypes = await getEventTypes();

  return (
    <Stack>
      <div>
        <Button asChild>
          <Link href="formats/new">Add Format</Link>
        </Button>
      </div>
      <Table
        headers={[
          { id: "name", label: "Name", render: (eventType) => eventType.name },
          {
            id: "actions",
            label: "Actions",
            styles: "text-right",
            render: (eventType) => (
              <Button variant={"ghost"} asChild>
                <Link href={`formats/${eventType.slug}`}>
                  <PencilIcon />
                </Link>
              </Button>
            ),
          },
        ]}
        data={eventTypes}
      />
    </Stack>
  );
}
