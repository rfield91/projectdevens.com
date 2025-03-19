import { z } from "zod";

export const eventFormSchema = z.object({
  clubId: z.string().nonempty(),
  typeId: z.string().nonempty(),
  singleDay: z.boolean().default(true),
  startDate: z.coerce.date({ message: "A valid start date is required" }),
  startTime: z.string(),
  timezone: z.string().nonempty(),
  endDate: z.coerce.date().optional(),
  endTime: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be at least three characters" }),
  url: z
    .string()
    .url({ message: "A valid url is required" })
    .optional()
    .or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
});
