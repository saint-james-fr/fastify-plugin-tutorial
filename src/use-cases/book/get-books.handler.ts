import type { IBookRepository } from "../../domain/interfaces/IBookRepository";

export class GetBooksHandler {
  constructor(private readonly bookRepository: IBookRepository) {}

  async handle() {
    const books = await this.bookRepository.getBooks();
    return books;
  }
}
