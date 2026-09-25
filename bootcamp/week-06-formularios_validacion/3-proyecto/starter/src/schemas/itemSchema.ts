// src/schemas/itemSchema.ts
// Schema Zod para el formulario de programa (dominio Radio Comunitaria).

import { z } from 'zod';

export const itemSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(80, 'Máx. 80 caracteres'),

  description: z
    .string()
    .max(500, 'Máx. 500 caracteres')
    .optional()
    .or(z.literal('')),
});

// El tipo TypeScript se infiere automáticamente — sin interfaz duplicada
export type ItemFormData = z.infer<typeof itemSchema>;
