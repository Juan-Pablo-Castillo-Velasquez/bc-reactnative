// src/navigation/types.ts
// Tipos de parámetros para los navigators del proyecto.
// Dominio: Radio Comunitaria

export type RootTabParamList = {
  // Pestaña principal con Stack interno (lista de programas → detalle)
  Home: undefined;
  // Pestaña secundaria de programas guardados (favoritos)
  Saved: undefined;
};

export type HomeStackParamList = {
  // Pantalla de lista de programas (sin params)
  HomeList: undefined;
  // Pantalla de detalle de un programa — recibe todos los campos
  // necesarios para mostrar host, horario y patrocinador sin volver
  // a consultar el dataset.
  HomeDetail: {
    id: string;
    name: string;
    host: string;
    schedule: string;
    sponsor: string;
    genre: string;
  };
};
