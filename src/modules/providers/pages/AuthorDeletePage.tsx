"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Hook from Next.js for navigation
import { deleteAuthor } from "@/modules/providers/services/providerService";
import Home from "@/app/page";

export default function ServiceDeletePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Get the router to redirect
  const params = useParams();
  const id = Number(params?.id);


  useEffect(() => {
    const fetchAuthor = async () => {
      setIsSubmitting(true);
      setError(null);
      try {
        await deleteAuthor(id);
        router.push("/authors"); // Redirect to the provider's home page
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while deleting the author."
        );
      } finally {
        setIsSubmitting(false);
      }
    };
    if (id) fetchAuthor();
  }, [id, router]);

  return (<Home />);
}