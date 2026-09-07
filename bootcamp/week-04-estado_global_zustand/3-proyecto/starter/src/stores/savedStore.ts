// src/stores/savedStore.ts
// Store Zustand para gestionar los programas guardados (favoritos)
// del dominio Radio Comunitaria. Se lee desde SavedScreen, DetailScreen
// y el badge del Tab Navigator, sin prop drilling.

import { create } from 'zustand';
import type { Item } from '../types';

// ============================================================
// INTERFACE DEL STORE
// ============================================================

interface SavedStore {
  // Lista de programas guardados
  items: Item[];

  // Agrega un programa a guardados evitando duplicados
  addItem: (item: Item) => void;

  // Elimina un programa guardado por id
  removeItem: (id: string) => void;

  // Vacía por completo la lista de guardados
  clearAll: () => void;

  // Helper: indica si el programa con ese id ya está guardado.
  // Se usa en DetailScreen para alternar el botón Guardar / Quitar.
  isItemSaved: (id: string) => boolean;
}

// ============================================================
// CREAR EL STORE
// ============================================================

export const useSavedStore = create<SavedStore>((set, get) => ({
  items: [],

  addItem: (item) => {
    const alreadySaved = get().items.some((i) => i.id === item.id);
    if (alreadySaved) return;
    set((state) => ({ items: [...state.items, item] }));
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
  },

  clearAll: () => {
    set({ items: [] });
  },

  isItemSaved: (id) => {
    return get().items.some((i) => i.id === id);
  },
}));
