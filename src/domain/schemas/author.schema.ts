import { z } from "zod";

export const authorSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

export const postAuthorSchema = authorSchema;
