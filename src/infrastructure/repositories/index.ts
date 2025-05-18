import fp from "fastify-plugin";
import { BookRepository } from "./book.repository";
import { AuthorRepository } from "./author.repository";

export const repositories = fp(
  (fastify, _opts, done) => {
    const db = fastify.db;
    fastify.decorate("repositories", {
      bookRepository: new BookRepository(db),
      authorRepository: new AuthorRepository(db),
    });
    done();
  },
  {
    name: "repositories",
    dependencies: ["db"],
  }
);
