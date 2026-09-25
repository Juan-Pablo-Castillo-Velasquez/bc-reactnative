// src/types/index.ts
// Tipos globales del proyecto (dominio: Radio Comunitaria).

export interface Item {
  id: number;
  name: string;
  description: string;
}

// Tipo para el estado offline de la lista
export interface ItemsWithSource {
  items: Item[];
  source: 'network' | 'cache';
}
