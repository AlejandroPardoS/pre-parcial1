"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook from Next.js for navigation
import { BookFormData } from "../validation/bookSchema";
import { createBook } from "../services/bookService";
import BookForm from "../ui/BookForm";

export default function BookCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router to redirect

  const handleCreateBook = async (data: BookFormData) => {
    setIsSubmitting(true);
    try {
      await createBook(data);
      // Success! This is where we would show a global notification.
      // For now, we simply redirect.
      router.push("/books"); // Redirect to the provider's home page
    } catch {
      setError(
        "No se pudo crear el libro. Por favor, intente más tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Libro</h1>
      <BookForm onSubmit={handleCreateBook} isSubmitting={isSubmitting} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}