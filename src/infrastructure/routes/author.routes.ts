import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { authorSchema } from "../../domain/schemas/author.schema";
import { z } from "zod";
import {
  ShowRouteParams,
  showRouteParamsSchema,
} from "../../domain/schemas/params.schema";

export default fp(async function (fastify) {
  const { getAuthorsHandler, getAuthorHandler } = fastify.handlers.authors;

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/authors",
    schema: {
      response: {
        200: z.array(authorSchema),
      },
    },
    handler: async (_, reply) => {
      const authors = await getAuthorsHandler.handle();
      return reply.send(authors);
    },
  });

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/authors/:id",
    schema: {
      params: showRouteParamsSchema,
      response: {
        200: authorSchema.nullable(),
      },
    },
    handler: async (
      request: FastifyRequest<{ Params: ShowRouteParams }>,
      reply
    ) => {
      const author = await getAuthorHandler.handle(request.params.id);
      return reply.send(author);
    },
  });
});
