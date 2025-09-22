import { z } from "zod";


export const authorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  birthDate: z
    .iso.date()
    .min(8, { message: "Birthdate must be at least 8 characters long" }),
  description: z
    .string()
    .min(15, { message: "Description must be at least 15 characters long." }),
  image: z
    .string()
    .min(10, { message: "Image must be at least 10 characters long." }),  
});

// We create a TypeScript type from the schema to use in our components.
export type AuthorFormData = z.infer<typeof authorSchema>;