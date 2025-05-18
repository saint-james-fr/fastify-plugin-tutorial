import type { Book } from "../entities/book";

export interface IBookRepository {
  getBooks(): Promise<Book[]>;
  getBookById(id: number): Promise<Book | null>;
  createBook(book: Book): Promise<Book>;
}
