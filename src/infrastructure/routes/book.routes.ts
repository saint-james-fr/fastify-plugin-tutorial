import fp from "fastify-plugin";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { bookSchema, postBookSchema } from "../../domain/schemas/book.schema";
import { z } from "zod";
import {
  ShowRouteParams,
  showRouteParamsSchema,
} from "../../domain/schemas/params.schema";
import { FastifyRequest } from "fastify";

export default fp(async function (fastify) {
  const { getBooksHandler, getBookHandler, createBookHandler } =
    fastify.handlers.books;

  const typedFastify = fastify.withTypeProvider<ZodTypeProvider>();

  typedFastify.route({
    method: "GET",
    url: "/books",
    schema: {
      response: {
        200: z.array(bookSchema),
      },
    },
    handler: async (_, reply) => {
      const books = await getBooksHandler.handle();
      return reply.send(books);
    },
  });

  typedFastify.route({
    method: "GET",
    url: "/books/:id",
    schema: {
      params: showRouteParamsSchema,
      response: {
        200: bookSchema.nullable(),
      },
    },
    handler: async (
      request: FastifyRequest<{ Params: ShowRouteParams }>,
      reply
    ) => {
      const book = await getBookHandler.handle(request.params.id);
      return reply.send(book);
    },
  });

  typedFastify.route({
    method: "POST",
    url: "/books",
    schema: {
      body: postBookSchema,
    },
    handler: async (request, reply) => {
      const book = await createBookHandler.handle(request.body);
      return reply.send(book);
    },
  });
});
