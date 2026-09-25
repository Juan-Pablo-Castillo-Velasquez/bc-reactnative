// src/schemas/itemSchema.ts
// Schema Zod para validar el formulario de creación (dominio Radio Comunitaria).

import { z } from 'zod';

export const itemSchema = z.object({
  // NOTA: Zod 4 elimina el parámetro `required_error` de v3 (Object
  // literal may only specify 'error'/'message') — la validación de
  // "requerido" se cubre con `.min(1, ...)`.
  name: z
    .string()
    .min(1, 'El nombre no puede estar vacío')
    .max(80, 'Máximo 80 caracteres'),
  description: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
});

// El tipo se infiere del schema — no duplicar con interface manual
export type ItemFormData = z.infer<typeof itemSchema>;
