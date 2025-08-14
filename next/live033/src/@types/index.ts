import { z } from 'zod';

export interface IContactSuccess {
  contact: {
    id: string;
    name: string;
    email: string;
  };
};

export interface IContactError {
  message: z.ZodIssue[];
};
