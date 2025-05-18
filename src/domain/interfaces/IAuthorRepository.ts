import type { Author } from "../entities/author";

export interface IAuthorRepository {
  getAuthors(): Promise<Author[]>;
  getAuthorById(id: number): Promise<Author | null>;
}
