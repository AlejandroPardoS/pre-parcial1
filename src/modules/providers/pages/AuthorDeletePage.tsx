"use client";

import { useEffect, useState, useRef} from "react";
import { useParams, useRouter } from "next/navigation"; // Hook from Next.js for navigation
import { deleteAuthor } from "@/modules/providers/services/authorService";

export default function ServiceDeletePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router to redirect
  const params = useParams();
  const id = Number(params?.id);
  const executedRef = useRef(false);


  useEffect(() => {
    if (executedRef.current) return;
    executedRef.current = true;
    const deleteaAuthor = async () => {
      setIsSubmitting(true);
      setError(null);
      try {
        await deleteAuthor(id);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while deleting the author."
        );
      } finally {
        router.push("/authors"); // Redirect to the provider's home page
        setIsSubmitting(false);
      }
    };
    if (id) deleteaAuthor();
  }, [id, router]);

  return <p>Eliminando autor...</p>;
}