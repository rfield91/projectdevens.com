import { z } from "zod";

export const clubFormSchema = z.object({
  name: z.string().min(1, "Required"),
});
