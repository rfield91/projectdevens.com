import { userRoles } from "@/schemas/users";
import { z } from "zod";

export const addUserClubFormSchema = z.object({
  clubId: z.string().min(1, "Required"),
});

export const addUserRoleFormSchema = z.object({
  role: z.enum(userRoles),
});
