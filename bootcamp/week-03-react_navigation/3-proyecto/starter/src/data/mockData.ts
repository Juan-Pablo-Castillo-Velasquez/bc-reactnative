// src/data/mockData.ts
// Dominio: Radio Comunitaria
// Datos de prueba de programas radiales (programs), sus conductores
// (hosts), horarios (schedules) y patrocinadores (sponsors).

import type { Item } from '../types';

// ============================================
// LISTA PRINCIPAL DE PROGRAMAS
// ============================================

export const ITEMS: Item[] = [
  {
    id: '1',
    name: 'Despertar Comunitario',
    description: 'Magazine matutino con noticias locales, clima y entrevistas a líderes del barrio.',
    host: 'María Fernanda Ríos',
    schedule: 'Lun-Vie 6:00-8:00 AM',
    sponsor: 'Panadería El Trigal',
    genre: 'Noticias',
  },
  {
    id: '2',
    name: 'Ritmo Barrial',
    description: 'Música tropical y salsa dedicada a los oyentes del sector, con saludos en vivo.',
    host: 'Carlos "El Sonero" Pérez',
    schedule: 'Lun-Vie 10:00-12:00 PM',
    sponsor: 'Ferretería San José',
    genre: 'Música',
  },
  {
    id: '3',
    name: 'Voces de la Comuna',
    description: 'Espacio de opinión y debate sobre temas sociales y de convivencia ciudadana.',
    host: 'Andrea Gómez',
    schedule: 'Mar-Jue 2:00-3:30 PM',
    sponsor: 'Droguería Central',
    genre: 'Opinión',
  },
  {
    id: '4',
    name: 'Deporte Total',
    description: 'Resumen deportivo local y nacional, con análisis de los partidos del fin de semana.',
    host: 'Jorge Iván Salazar',
    schedule: 'Lun 4:00-5:00 PM',
    sponsor: 'Gimnasio PowerFit',
    genre: 'Deportes',
  },
  {
    id: '5',
    name: 'Tardes de Bolero',
    description: 'Boleros y música romántica clásica para acompañar la tarde.',
    host: 'Rosa Elena Martínez',
    schedule: 'Mié 3:00-4:00 PM',
    sponsor: 'Floristería Primavera',
    genre: 'Música',
  },
  {
    id: '6',
    name: 'Jóvenes al Aire',
    description: 'Programa hecho por y para jóvenes: música urbana, tecnología y cultura pop.',
    host: 'Sebastián Torres',
    schedule: 'Vie 5:00-7:00 PM',
    sponsor: 'Internet Café NetZone',
    genre: 'Entretenimiento',
  },
  {
    id: '7',
    name: 'Salud en Comunidad',
    description: 'Consejos de salud preventiva con invitados del centro de salud local.',
    host: 'Dra. Patricia Lozano',
    schedule: 'Jue 9:00-10:00 AM',
    sponsor: 'Droguería Central',
    genre: 'Salud',
  },
  {
    id: '8',
    name: 'Noche de Vallenato',
    description: 'Lo mejor del vallenato clásico y nuevo, con dedicatorias de los oyentes.',
    host: 'Luis Alberto Díaz',
    schedule: 'Sáb 8:00-10:00 PM',
    sponsor: 'Licorera La Esquina',
    genre: 'Música',
  },
];

// ============================================
// LISTA DE PROGRAMAS FAVORITOS
// ============================================

export const FAVORITES: Item[] = [
  ITEMS[0],
  ITEMS[2],
  ITEMS[5],
];
