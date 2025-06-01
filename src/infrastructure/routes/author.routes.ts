import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { authorSchema } from "../../domain/schemas/author.schema";
import { z } from "zod";
import {
  ShowRouteParams,
  showRouteParamsSchema,
} from "../../domain/schemas/params.schema";
import type { Handlers } from "../../use-cases/index";
import fp from "fastify-plugin";

export default fp(function (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions
) {
  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>();

  const { getAuthorsHandler, getAuthorHandler } =
    typedFastify.getDecorator<Handlers>("handlers").authors;

  typedFastify.route({
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

  typedFastify.route({
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
