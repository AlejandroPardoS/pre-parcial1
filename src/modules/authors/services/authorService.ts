import { fetcher } from "@/shared/services/http";

export interface Editorial {
    id: number;
    name: string;
}

export interface Organization {
    id: number;
    name: string;
    tipo: string;
}

export interface Prize {
    id: number;
    premiationDate: string;
    name: string;
    description: string;
    organization: Organization;
}

export interface Book {
    id: number;
    name: string;
    isbn: string;
    image: string;
    publishingDate: string;
    description: string;
    editorial: Editorial
}

export interface Author {
    id: number;
    birthDate: string;
    name: string;
    description: string;
    image: string;
    //books: Book[];
    //prizes: Prize[];
}

export const fetchAuthors = (): Promise<Author[]> => {
  // We call the GET /authors endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Author[]>("/authors");
};
