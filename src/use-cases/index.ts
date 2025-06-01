import fp from "fastify-plugin";
import { GetBookHandler } from "./book/get-book.handler";
import { GetBooksHandler } from "./book/get-books.handler";
import { GetAuthorHandler } from "./author/get-author.handler";
import { GetAuthorsHandler } from "./author/get-authors.handler";
import { CreateBookHandler } from "./book/create-book.handler";
import {
  type Repositories,
  kRepositories,
} from "../infrastructure/repositories/index.js";

export const kHandlers = Symbol.for("handlers");

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
      fastify.getDecorator<Repositories>(kRepositories);

    fastify.decorate<Handlers>(kHandlers, {
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
