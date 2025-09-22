"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Hook from Next.js for navigation
import { AuthorFormData } from "@/modules/providers/validation/authorSchema";
import { createAuthor } from "@/modules/providers/services/providerService";
import AuthorForm from "../ui/AuthorFormUpdate";

export default function ServiceCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router to redirect

  const handleCreateAuthor = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    try {
      await createAuthor(data);
      // Success! This is where we would show a global notification.
      // For now, we simply redirect.
      router.push("/authors"); // Redirect to the provider's home page
    } catch {
      setError(
        "No se pudo crear el autores. Por favor, intente más tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Autor</h1>
      <AuthorForm onSubmit={handleCreateAuthor} isSubmitting={isSubmitting} />
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}