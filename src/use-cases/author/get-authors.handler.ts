import type { IAuthorRepository } from "../../domain/interfaces/IAuthorRepository.ts";

export class GetAuthorsHandler {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async handle() {
    const authors = await this.authorRepository.getAuthors();
    return authors;
  }
}
