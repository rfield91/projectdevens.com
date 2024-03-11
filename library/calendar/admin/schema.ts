import { z } from "zod";

export const eventFormSchema = z.object({
  eventName: z.string().trim().min(1),
  eventType: z.string().trim().min(1),
  club: z.string().trim().min(1),
  startDate: z.date(),
  endDate: z.date(),
  link: z.string().url(),
});
