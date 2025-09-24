import { fetcher } from "@/shared/services/http";
import { AuthorFormData } from "@/modules/providers/validation/authorSchema";
import { Author } from "@/modules/authors/page"; // Reutilizamos la interfaz

/**
 * Create a new service by sending the form data to the API.
 * @param data - The form data to create a new service validated by Zod.
 * @returns A promise that resolves with the newly created service from the backend.
 */
export const createAuthor = (data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>("/authors", {
    method: "POST",
    body: JSON.stringify(data), // We send the data as a JSON string
  });
};

export const getAuthorById = (id: number): Promise<Author> => {
  return fetcher<Author>(`/authors/${id}`, {
    method: "GET",
  });
};

export const updateAuthor = (id: number, data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>(`/authors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}; 

export const deleteAuthor = (id: number): Promise<void> => {
  return fetcher<void>(`/authors/${id}`, {
    method: "DELETE",
  });
};