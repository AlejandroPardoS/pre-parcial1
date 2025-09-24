"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Hook from Next.js for navigation
import AuthorFormUpdate from "@/modules/providers/ui/AuthorFormUpdate";
import { AuthorFormData } from "@/modules/providers/validation/authorSchema";
import { getAuthorById, updateAuthor } from "@/modules/providers/services/authorService";
import { Author } from "@/modules/authors/page";

export default function ServiceUpdatePage() {
  const [author, setAuthor] = useState<Author>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router to redirect
  const params = useParams();
  const id = Number(params?.id);

  useEffect(() => {
    const fetchAuthor = async () => {
      const data = await getAuthorById(id);
      setAuthor(data);
    };
    if (id) fetchAuthor();
  }, [id]
);

  const handleUpdateAuthor = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await updateAuthor(id, data);
      // Success! This is where we would show a global notification.
      // For now, we simply redirect.
      router.push("/authors"); // Redirect to the provider's home page
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while updating the author."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!author) {
    return <div className="text-center p-8">Cargando autor...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Editar Autor</h1>
      <AuthorFormUpdate
        onSubmit={handleUpdateAuthor}
        defaultValues={{
          name: author.name,
          description: author.description,
          birthDate: author.birthDate,
          image: author.image
        }}
        isSubmitting={isSubmitting}
      />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
