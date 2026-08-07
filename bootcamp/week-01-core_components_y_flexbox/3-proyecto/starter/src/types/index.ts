// ============================================================
// TYPES — src/types/index.ts
// ============================================================
// Interfaz del elemento del dominio: Radio comunitaria
// Este type se usa en mockData.ts, ItemCard.tsx y HomeScreen.tsx
// ============================================================

export interface Program {
  id: string;
  name: string;
  imageUri: string;
  host: string;
  schedule: string;
  sponsor: string;
}