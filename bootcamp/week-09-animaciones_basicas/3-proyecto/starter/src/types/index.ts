// Domain types — Radio Comunitaria.

// Item base para la lista del dominio: un programa de la radio.
export interface Item {
  id: string;
  name: string;
  description: string;
  // progress: avance de la temporada actual del programa (0-1), usado por ProgressBar
  progress?: number;
}

// Response shape from the API
export interface ApiResponse<T> {
  data: T[];
  total: number;
}
