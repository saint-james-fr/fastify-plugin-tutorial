import fp from "fastify-plugin";
import { BookRepository } from "./book.repository";
import { AuthorRepository } from "./author.repository";
import { type DB, kDB } from "../plugins/db.plugin";

export const kRepositories = Symbol("repositories");

export type Repositories = {
  bookRepository: BookRepository;
  authorRepository: AuthorRepository;
};

export default fp(
  (fastify, _opts, done) => {
    const db = fastify.getDecorator<DB>(kDB);

    fastify.decorate<Repositories>(kRepositories, {
      bookRepository: new BookRepository({ books: db.books }),
      authorRepository: new AuthorRepository({ authors: db.authors }),
    });
    done();
  },
  {
    name: "repositories",
    dependencies: ["db"],
  }
);
