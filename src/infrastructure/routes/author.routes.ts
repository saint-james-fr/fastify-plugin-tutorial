import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp(async function (fastify) {
  const { getAuthorsHandler, getAuthorHandler } = fastify.handlers.authors;

  fastify.route({
    method: "GET",
    url: "/authors",
    handler: async (_, reply) => {
      const authors = await getAuthorsHandler.handle();
      return reply.send(authors);
    },
  });

  fastify.route({
    method: "GET",
    url: "/authors/:id",
    handler: async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply
    ) => {
      const author = await getAuthorHandler.handle(Number(request.params.id));
      return reply.send(author);
    },
  });
});
