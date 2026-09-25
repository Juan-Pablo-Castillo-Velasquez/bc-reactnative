// Datos de ejemplo — programas de la Radio Comunitaria.
// Compartido entre HomeScreen y DetailScreen para que ambos muestren
// la misma información de cada programa (name, description, progress
// de temporada).
import type { Item } from '../types';

export const SAMPLE_PROGRAMS: Item[] = [
  {
    id: '1',
    name: 'Voces del Barrio',
    description: 'Programa de opinión y participación ciudadana de la comunidad.',
    progress: 0.8,
  },
  {
    id: '2',
    name: 'Ritmos Locales',
    description: 'Espacio musical dedicado a artistas y bandas de la región.',
    progress: 0.45,
  },
  {
    id: '3',
    name: 'Radio Noticias',
    description: 'Noticiero comunitario con la actualidad del barrio y la ciudad.',
    progress: 0.2,
  },
  {
    id: '4',
    name: 'Consultorio Popular',
    description: 'Programa de salud comunitaria con consejos y entrevistas.',
    progress: 0.65,
  },
];
