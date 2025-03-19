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
  createClub,
  deleteClub,
  updateClub,
} from "@/features/admin/calendar/actions/clubs";
import { clubFormSchema } from "@/features/admin/calendar/schemas/clubs";
import { Club } from "@/types/calendar/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ClubFormProps = {
  club?: Club;
};

export function ClubForm({ club }: ClubFormProps) {
  const form = useForm<z.infer<typeof clubFormSchema>>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: club ?? {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof clubFormSchema>) {
    if (club === undefined) {
      createClub(values);
    } else {
      updateClub(club.clubId, values);
    }
  }

  const handleDelete = () => {
    if (club !== undefined) {
      deleteClub(club);
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
          <Button className="text-neutral-800" variant={"outline"} asChild>
            <Link href={"/admin/calendar/clubs"}>Cancel</Link>
          </Button>
          <Button disabled={form.formState.isSubmitting} type="submit">
            Save
          </Button>
          {club && (
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
