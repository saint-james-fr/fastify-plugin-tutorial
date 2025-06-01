import fp from "fastify-plugin";
import { GetBookHandler } from "./book/get-book.handler.js";
import { GetBooksHandler } from "./book/get-books.handler.js";
import { GetAuthorHandler } from "./author/get-author.handler.js";
import { GetAuthorsHandler } from "./author/get-authors.handler.js";
import { CreateBookHandler } from "./book/create-book.handler.js";
import type { Repositories } from "../infrastructure/repositories/index.ts";

export type Handlers = {
  books: {
    getBookHandler: GetBookHandler;
    getBooksHandler: GetBooksHandler;
    createBookHandler: CreateBookHandler;
  };
  authors: {
    getAuthorHandler: GetAuthorHandler;
    getAuthorsHandler: GetAuthorsHandler;
  };
};

export default fp(
  (fastify, _opts, done) => {
    const { bookRepository, authorRepository } =
      fastify.getDecorator<Repositories>("repositories");

    fastify.decorate<Handlers>("handlers", {
      books: {
        getBookHandler: new GetBookHandler(bookRepository),
        getBooksHandler: new GetBooksHandler(bookRepository),
        createBookHandler: new CreateBookHandler(bookRepository),
      },
      authors: {
        getAuthorHandler: new GetAuthorHandler(authorRepository),
        getAuthorsHandler: new GetAuthorsHandler(authorRepository),
      },
    });
    done();
  },
  {
    name: "handlers",
    dependencies: ["repositories"],
  }
);
