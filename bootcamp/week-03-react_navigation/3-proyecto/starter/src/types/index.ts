// src/types/index.ts
// Dominio: Radio Comunitaria
// Entidades: programs, hosts, schedules, sponsors

// ============================================
// INTERFACE PRINCIPAL DEL DOMINIO
// ============================================

export interface Item {
  id: string;
  // Nombre del programa radial
  name: string;
  // Descripción general del programa
  description: string;

  // Campos específicos del dominio "Radio Comunitaria"
  host: string; // Nombre del conductor/a o presentador/a (hosts)
  schedule: string; // Horario de emisión (schedules), ej. "Lun-Vie 8:00-10:00 AM"
  sponsor: string; // Patrocinador principal del programa (sponsors)
  genre: string; // Género/categoría del programa (música, noticias, deportes, etc.)
}
