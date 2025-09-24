import { z } from "zod";


export const bookSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  isbn: z
    .string()
    .min(13, { message: "ISBN must be at least 13 characters long." }),
  description: z
    .string()
    .min(15, { message: "Description must be at least 15 characters long." }),
  image: z
    .string()
    .min(10, { message: "Image must be at least 10 characters long." }),
  publishingDate: z
    .iso.date()
    .min(8, { message: "Publishing date must be at least 8 characters long" }),
  editorialname: z
    .string()
    .min(3, { message: "Editorial name must be at least 3 characters long." }),
});

// We create a TypeScript type from the schema to use in our components.
export type BookFormData = z.infer<typeof bookSchema>;