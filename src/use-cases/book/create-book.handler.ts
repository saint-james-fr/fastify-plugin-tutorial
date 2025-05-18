import { IBookRepository } from "../../domain/interfaces/IBookRepository";
import { Book } from "../../domain/entities/book";

export class CreateBookHandler {
  constructor(private readonly bookRepository: IBookRepository) {}

  async handle(book: Book) {
    return this.bookRepository.createBook(book);
  }
}
