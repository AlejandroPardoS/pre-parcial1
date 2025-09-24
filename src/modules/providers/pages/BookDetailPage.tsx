"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Hook from Next.js for navigation
import { Book } from "@/modules/books/page";
import { getBookById } from "@/modules/providers/services/bookService";
import BookDetailForm from "@/modules/providers/ui/BookDetailForm";


export default function BookDetailPage() {
  const [book, setBook] = useState<Book>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = Number(params?.id);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    if (id) fetchBook();
  }, [id]
);

  if (!book) {
    return <div className="text-center p-8">Cargando libro...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Ver Libro</h1>
      <BookDetailForm
        defaultValues={{
          name: book.name,
          isbn: book.isbn,
          image: book.image,
          publishingDate: book.publishingDate,
          description: book.description,
          editorialname: book.editorial.name
        }}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
