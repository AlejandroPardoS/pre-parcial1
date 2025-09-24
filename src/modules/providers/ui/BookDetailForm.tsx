"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { BookFormData, bookSchema } from "@/modules/providers/validation/bookSchema";

interface BookFormProps {
  defaultValues?: BookFormData;
  isSubmitting: boolean;
}

export default function BookForm({
  defaultValues,
  isSubmitting,
}: BookFormProps) {
  const {
    register,
    formState: { errors },
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium">
          Book Name
        </label>
        <input
          id="name"
          {...register("name")}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="isbn" className="block font-medium">
          ISBN
        </label>
        <input
          id="isbn"
          {...register("isbn")}
          className="w-full p-2 border rounded"
        />
        {errors.isbn && (
          <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="image" className="block font-medium">
          Image
        </label>
        <textarea
          id="image"
          {...register("image")}
          className="w-full p-2 border rounded"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">
            {errors.image.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="publishingDate" className="block font-medium">
          Publishing Date
        </label>
        <textarea
          id="publishingDate"
          {...register("publishingDate")}
          className="w-full p-2 border rounded"
        />
        {errors.publishingDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.publishingDate.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block font-medium">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="editorialname" className="block font-medium">
          Nombre Editorial
        </label>
        <textarea
          id="editorialname"
          {...register("editorialname")}
          className="w-full p-2 border rounded"
        />
        {errors.editorialname && (
          <p className="text-red-500 text-sm mt-1">
            {errors.editorialname.message}
          </p>
        )}
      </div>

      <div className="space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-400 text-black font-bold py-2 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300"
        >
          {isSubmitting ? "Saving..." : "Save Author"}
        </button>

        <Link 
          href = "/"
          className="bg-yellow-400 text-black font-bold py-3 px-6 rounded hover:bg-yellow-500 disabled:bg-gray-300" 
        >
          Return
        </Link>
      </div>

    </form>
  );
}