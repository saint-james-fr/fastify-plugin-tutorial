import type { GetBooksHandler } from "./use-cases/book/get-books.handler.ts";
import type { GetBookHandler } from "./use-cases/book/get-book.handler.ts";
import type { GetAuthorsHandler } from "./use-cases/author/get-authors.handler.ts";
import type { GetAuthorHandler } from "./use-cases/author/get-author.handler.ts";
import type { BookRepository } from "./infrastructure/repositories/book.repository.ts";
import type { AuthorRepository } from "./infrastructure/repositories/author.repository.ts";
import type { Book } from "./domain/entities/book.ts";
import type { Author } from "./domain/entities/author.ts";
import type { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    db: {
      books: Book[];
      authors: Author[];
    };
    handlers: {
      books: {
        getBooksHandler: GetBooksHandler;
        getBookHandler: GetBookHandler;
      };
      authors: {
        getAuthorsHandler: GetAuthorsHandler;
        getAuthorHandler: GetAuthorHandler;
      };
    };
    repositories: {
      bookRepository: BookRepository;
      authorRepository: AuthorRepository;
    };
  }
}
