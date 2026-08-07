// ============================================================
// MOCK DATA — src/data/mockData.ts
// ============================================================
// Datos de ejemplo del dominio: Radio comunitaria
// ============================================================

import { Program } from '../types';

export const MOCK_PROGRAMS: Program[] = [
  {
    id: '1',
    name: 'Voces del Barrio',
    imageUri: 'https://picsum.photos/seed/radio1/300/200',
    host: 'Marta Gómez',
    schedule: 'Lunes a viernes, 7:00 - 9:00 am',
    sponsor: 'Panadería La Espiga',
  },
  {
    id: '2',
    name: 'Ritmo Local',
    imageUri: 'https://picsum.photos/seed/radio2/300/200',
    host: 'Andrés Pardo',
    schedule: 'Martes y jueves, 3:00 - 5:00 pm',
    sponsor: 'Ferretería El Tornillo',
  },
  {
    id: '3',
    name: 'Charla Comunitaria',
    imageUri: 'https://picsum.photos/seed/radio3/300/200',
    host: 'Lucía Fernández',
    schedule: 'Miércoles, 6:00 - 7:30 pm',
    sponsor: 'Droguería San José',
  },
  {
    id: '4',
    name: 'Noches de Vinilo',
    imageUri: 'https://picsum.photos/seed/radio4/300/200',
    host: 'Camilo Restrepo',
    schedule: 'Sábados, 8:00 - 10:00 pm',
    sponsor: 'Café La Esquina',
  },
];