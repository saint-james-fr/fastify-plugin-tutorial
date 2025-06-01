import type { IBookRepository } from "../../domain/interfaces/IBookRepository";

export class GetBookHandler {
  constructor(private readonly bookRepository: IBookRepository) {}

  async handle(id: number) {
    const book = await this.bookRepository.getBookById(id);
    return book;
  }
}
