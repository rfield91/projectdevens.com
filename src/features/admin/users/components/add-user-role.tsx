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
// import { userRoles } from "@/db/schema";
import { createUserToRoleRelation } from "@/features/admin/users/actions/users";
import { addUserRoleFormSchema } from "@/features/admin/users/schemas/users";
import { userRoles } from "@/schemas/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type AddUserRoleProps = {
  user: InferResultType<"usersTable", { roles: true }>;
};

export const AddUserRole = ({ user }: AddUserRoleProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addUserRoleFormSchema>>({
    resolver: zodResolver(addUserRoleFormSchema),
    defaultValues: {},
  });

  const assignedRoles = user.roles.map((role) => role.role);
  const filteredRoles = userRoles.filter(
    (role) => !assignedRoles.includes(role)
  );

  async function onSubmit(values: z.infer<typeof addUserRoleFormSchema>) {
    createUserToRoleRelation(user.userId, values);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Role</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Role</DialogTitle>
          <DialogDescription>Add another role to this user.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack>
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role to add" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredRoles.map((role) => (
                          <SelectItem key={role} value={role ?? ""}>
                            {role}
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
