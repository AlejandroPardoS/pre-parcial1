import { fetcher } from "@/shared/services/http";
import { Book } from "@/modules/books/page"; // Reutilizamos la interfaz
import { BookFormData } from "../validation/bookSchema";

/**
 * Create a new service by sending the form data to the API.
 * @param data - The form data to create a new service validated by Zod.
 * @returns A promise that resolves with the newly created service from the backend.
 */
export const createBook = (data: BookFormData): Promise<Book> => {
  return fetcher<Book>("/books", {
    method: "POST",
    body: JSON.stringify(data), // We send the data as a JSON string
  });
};

export const getBookById = (id: number): Promise<Book> => {
  return fetcher<Book>(`/books/${id}`, {
    method: "GET",
  });
};