import { fetcher } from "@/shared/services/http";

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

export const fetchPrizes = (): Promise<Prize[]> => {
  // We call the GET /prizes endpoint.
  // The fetcher takes care of the base URL and error handling.
  return fetcher<Prize[]>("/prizes");
};