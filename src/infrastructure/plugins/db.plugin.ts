import fp from "fastify-plugin";
import { Book } from "../../domain/entities/book";
import { Author } from "../../domain/entities/author";

export const kDB = Symbol.for("db");

export type DB = {
  books: Book[];
  authors: Author[];
};

export default fp(
  (fastify, _opts, done) => {
    fastify.decorate(kDB, {
      books: [
        { id: 1, title: "Book 1", authorId: 1 },
        { id: 2, title: "Book 2", authorId: 2 },
        { id: 3, title: "Book 3", authorId: 3 },
      ],
      authors: [
        { id: 1, name: "Author 1" },
        { id: 2, name: "Author 2" },
        { id: 3, name: "Author 3" },
      ],
    });
    done();
  },
  {
    name: "db",
  }
);
