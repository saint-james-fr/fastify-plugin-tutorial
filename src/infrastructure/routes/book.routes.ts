import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp(async function (fastify) {
  const { getBooksHandler, getBookHandler } = fastify.handlers.books;

  fastify.route({
    method: "GET",
    url: "/books",
    handler: async (_, reply) => {
      const books = await getBooksHandler.handle();
      return reply.send(books);
    },
  });

  fastify.route({
    method: "GET",
    url: "/books/:id",
    handler: async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply
    ) => {
      const book = await getBookHandler.handle(Number(request.params.id));
      return reply.send(book);
    },
  });
});
