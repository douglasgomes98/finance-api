import { z } from "zod";

export const createValidator = z.object({
  name: z.string(),
  color: z
    .string()
    .length(7)
    .regex(/^#[0-9a-f]{6}$/i),
});
