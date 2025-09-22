"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authorSchema,
  AuthorFormData,
} from "@/modules/providers/validation/authorSchema";
import Link from "next/link";

interface AuthorFormProps {
  onSubmit: SubmitHandler<AuthorFormData>;
  defaultValues?: AuthorFormData;
  isSubmitting: boolean;
}

export default function AuthorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
}: AuthorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium">
          Author Name
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
        <label htmlFor="birthDate" className="block font-medium">
          Birth Date
        </label>
        <textarea
          id="birthDate"
          {...register("birthDate")}
          className="w-full p-2 border rounded"
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.birthDate.message}
          </p>
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