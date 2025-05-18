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

  async createBook(book: Book) {
    if (this.db.books.find((b) => b.id === book.id)) {
      throw new Error("Book already exists");
    }
    this.db.books.push(book);
    return book;
  }
}
