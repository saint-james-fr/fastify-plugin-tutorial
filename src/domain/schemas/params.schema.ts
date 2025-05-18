import { z } from "zod";

export const showRouteParamsSchema = z.object({
  id: z.string().transform((val) => Number(val)),
});

export type ShowRouteParams = z.infer<typeof showRouteParamsSchema>;
