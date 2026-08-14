// src/navigation/types.ts
// Tipos de parámetros para cada navigator.
// Dominio: Radio Comunitaria

// ============================================
// TAB NAVIGATOR — pantallas de nivel raíz
// ============================================

export type RootTabParamList = {
  // Pestaña principal con Stack interno (lista de programas → detalle)
  Home: undefined;
  // Pestaña secundaria de programas favoritos
  Favorites: undefined;
};

// ============================================
// STACK NAVIGATOR — anidado dentro de la pestaña Home
// ============================================

export type HomeStackParamList = {
  // Pantalla de lista de programas (sin params)
  HomeList: undefined;
  // Pantalla de detalle de un programa — recibe todos los campos
  // necesarios para mostrar host, horario y patrocinador sin
  // tener que volver a consultar el dataset.
  HomeDetail: {
    id: string;
    name: string;
    host: string;
    schedule: string;
    sponsor: string;
    genre: string;
  };
};
