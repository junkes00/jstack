import { z } from 'zod';

export const createContactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Informe um e-mail válido!'),
})
