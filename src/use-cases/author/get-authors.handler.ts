import type { IAuthorRepository } from "../../domain/interfaces/IAuthorRepository";

export class GetAuthorsHandler {
  constructor(private readonly authorRepository: IAuthorRepository) {}

  async handle() {
    const authors = await this.authorRepository.getAuthors();
    return authors;
  }
}
