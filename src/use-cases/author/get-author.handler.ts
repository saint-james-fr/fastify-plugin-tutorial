import type { IAuthorRepository } from "../../domain/interfaces/IAuthorRepository";

export class GetAuthorHandler {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async handle(id: number) {
    const author = await this.authorRepository.getAuthorById(id);
    return author;
  }
}
