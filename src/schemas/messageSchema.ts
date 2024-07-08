import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "Message must be of atleast 10 characters" })
    .max(300, { message: "Message must be no longer than of 300 characters" }),
});
 