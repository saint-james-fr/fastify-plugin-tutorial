import fp from "fastify-plugin";
import { BookRepository } from "./book.repository";
import { AuthorRepository } from "./author.repository";
import type { DB } from "../plugins/db.plugin";

export type Repositories = {
  bookRepository: BookRepository;
  authorRepository: AuthorRepository;
};

export default fp(
  (fastify, _opts, done) => {
    const db = fastify.getDecorator<DB>("db");

    fastify.decorate<Repositories>("repositories", {
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
