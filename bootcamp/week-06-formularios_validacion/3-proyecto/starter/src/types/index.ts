// src/types/index.ts
// Modelo de dominio del proyecto: Radio Comunitaria.
//
// La API de práctica (JSONPlaceholder /posts) no expone campos de radio,
// así que el hook useItems() mapea su forma (title, body) a este modelo
// (name, description). Cuando el backend real de bc-expressjs (/programs)
// esté disponible, este modelo puede extenderse con host, schedule,
// sponsor y genre — los mismos campos ya usados en las semanas 03 y 04.

export interface Item {
  id: number;
  // Nombre del programa radial
  name: string;
  // Descripción del programa
  description: string;
}

// ============================================================
// PAYLOAD DE CREACIÓN
// ============================================================
// Lo que se envía al crear un nuevo programa. El servidor asigna el id.

export type CreateItemPayload = Omit<Item, 'id'>;

// ============================================================
// PAYLOAD DE ACTUALIZACIÓN
// ============================================================
// Lo que se envía al editar un programa existente — requiere el id.

export interface UpdateItemPayload extends CreateItemPayload {
  id: number;
}
