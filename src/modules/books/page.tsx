"use client"

import { fetcher } from "@/shared/services/http";
import { useState, useEffect } from "react"
import Link from "next/link";

export interface Editorial {
    id: number;
    name: string;
}

export interface Book {
    id: number;
    name: string;
    isbn: string;
    image: string;
    publishingDate: string;
    description: string;
    editorial: Editorial
}


export const fetchBooks = (): Promise<Book[]> => {
  // We call the GET /books endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Book[]>("/books");
};

export function BooksApp() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        // We don't need setLoading(true) here because the initial state is already ‘true'.
        const data = await fetchBooks();
        setBooks(data);
      } catch {
        setError(
          "No se pudieron cargar los libros. Por favor, intente más tarde."
        );
      } finally {
        // This block always executes, whether successful or not.
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Cargando libros...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

    return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Libros Disponibles</h1>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <li
            key={book.id}
            className="overflow-hidden rounded-2xl border shadow-sm bg-white flex flex-col"
          >
            <div className="relative w-full h-56">
              <img
                src={book.image}
                alt={`Portada de ${book.name}`}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold line-clamp-2">{book.name}</h2>

              <p className="text-sm text-gray-700 line-clamp-4">{book.description}</p>

              {book.editorial?.name && (
                <p className="text-xs text-gray-500 mt-1">Editorial: {book.editorial.name}</p>
              )}
            </div>
            <div className="p-4 pt-0 mt-auto flex gap-2">
              <Link
                href={`/books/${book.id}`}
                className="inline-block bg-black text-white text-sm font-medium px-4 py-2 rounded hover:opacity-90"
              >
                Ver detalles
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-block bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-500"
        >
          Return
        </Link>
      </div>
    </div>
  );
}

export default BooksApp;
