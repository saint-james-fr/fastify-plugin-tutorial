import type { IBookRepository } from "../../domain/interfaces/IBookRepository";
import type { Book } from "../../domain/entities/book";

export class BookRepository implements IBookRepository {
  constructor(private readonly db: { books: Book[] }) {}

  async getBooks() {
    return this.db.books;
  }

  async getBookById(id: number) {
    return this.db.books.find((book) => book.id === id) ?? null;
  }

  async getBooksByAuthorId(authorId: number) {
    return this.db.books.filter((book) => book.authorId === authorId);
  }
}
