"use client";

import { Stack } from "@/components/stack/stack";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InferResultType } from "@/db/helpers";
import { createUserToClubRelation } from "@/features/admin/users/actions/users";
import { addUserClubFormSchema } from "@/features/admin/users/schemas/users";
import { Club } from "@/schemas/calendar/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddUserClubProps = {
  user: InferResultType<"usersTable", { clubs: { with: { club: true } } }>;
  clubs: Club[];
};

export const AddUserClub = ({ user, clubs }: AddUserClubProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addUserClubFormSchema>>({
    resolver: zodResolver(addUserClubFormSchema),
    defaultValues: {
      clubId: "",
    },
  });

  const userClubIds = user.clubs.map((club) => club.clubId);
  const filteredClubs = clubs.filter(
    (club) => !userClubIds.includes(club.clubId)
  );

  async function onSubmit(values: z.infer<typeof addUserClubFormSchema>) {
    createUserToClubRelation(user.userId, values);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Club</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Club</DialogTitle>
          <DialogDescription>
            Give this user access to another club.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack>
              <FormField
                control={form.control}
                name="clubId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Club</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select club to give access to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredClubs.map((club) => (
                          <SelectItem key={club.clubId} value={club.clubId}>
                            {club.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button disabled={form.formState.isSubmitting}>Save</Button>
              </DialogFooter>
            </Stack>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
