"use client"

import { useState, useEffect } from "react"
import { Author, fetchAuthors } from "@/modules/authors/services/authorService"
import Link from "next/link";


export function AuthorsApp() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        // We don't need setLoading(true) here because the initial state is already ‘true'.
        const data = await fetchAuthors();
        setAuthors(data);
      } catch {
        setError(
          "No se pudieron cargar los autores. Por favor, intente más tarde."
        );
      } finally {
        // This block always executes, whether successful or not.
        setIsLoading(false);
      }
    };

    loadAuthors();
  }, []);

  if (isLoading) {
    return <div className="text-center p-8">Cargando autores...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
  <div className="container mx-auto p-8">
    <h1 className="text-3xl font-bold mb-6">Autores Disponibles</h1>
    <ul className="space-y-4">
      {authors.map((author) => (
        <li
          key={author.id}
          className="p-4 border rounded-lg shadow-sm flex items-center justify-between"
        >
          <h2 className="text-xl font-semibold">{author.name}</h2>
          <div className="space-x-2">
            <Link href={`/editar/${author.id}`} className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300">
              Editar
            </Link>
            <Link href={`/eliminar/${author.id}`} className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300">
              Eliminar
            </Link>
          </div>
        </li>
      ))}
      <Link 
        href = "/"
        className="bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300" 
      >
        Return
      </Link>
    </ul>
  </div>
  )
}

export default AuthorsApp;
