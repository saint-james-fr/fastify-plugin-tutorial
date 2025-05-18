import type { IAuthorRepository } from "../../domain/interfaces/IAuthorRepository";
import type { Author } from "../../domain/entities/author";

export class AuthorRepository implements IAuthorRepository {
  constructor(private readonly db: { authors: Author[] }) {}

  async getAuthors() {
    return this.db.authors;
  }

  async getAuthorById(id: number) {
    return this.db.authors.find((author) => author.id === id) ?? null;
  }
}
