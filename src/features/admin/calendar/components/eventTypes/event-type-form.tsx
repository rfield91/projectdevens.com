"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  createEventType,
  deleteEventType,
  updateEventType,
} from "@/features/admin/calendar/actions/event-types";
import { eventTypeFormSchema } from "@/features/admin/calendar/schemas/event-types";
import { EventType } from "@/schemas/calendar/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

type EventTypeFormProps = {
  eventType?: EventType;
};

export function EventTypeForm({ eventType }: EventTypeFormProps) {
  const form = useForm<z.infer<typeof eventTypeFormSchema>>({
    resolver: zodResolver(eventTypeFormSchema),
    defaultValues: eventType ?? {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof eventTypeFormSchema>) {
    if (eventType === undefined) {
      createEventType(values);
    } else {
      updateEventType(eventType.typeId, values);
    }
  }

  const handleDelete = () => {
    if (eventType !== undefined) {
      deleteEventType(eventType);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          {/* TODO: Fix text color */}
          <Button className="text-neutral-800" variant={"outline"} asChild>
            <Link href={"/admin/calendar/formats"}>Cancel</Link>
          </Button>
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
          {eventType && (
            <Button
              variant="destructive"
              className="ml-auto"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              <TrashIcon />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
