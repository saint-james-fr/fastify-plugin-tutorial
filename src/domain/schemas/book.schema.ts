import { z } from "zod";

export const bookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  authorId: z.number().int().positive(),
});

export const postBookSchema = bookSchema;
