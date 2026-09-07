// src/services/api.ts
// Instancia Axios centralizada para el proyecto.
//
// Dominio: Radio Comunitaria. Mientras el backend propio (bc-expressjs,
// endpoint /programs) no esté desplegado y accesible desde el simulador,
// se usa JSONPlaceholder como API de práctica para los endpoints de red.

import axios from 'axios';

// ============================================================
// BASE URL
// ============================================================
// Expo expone variables de entorno con prefijo EXPO_PUBLIC_
// ej. en .env.local: EXPO_PUBLIC_API_URL=https://tu-api-bc-expressjs.com
//
// Cuando el backend de bc-expressjs esté desplegado, basta con definir
// EXPO_PUBLIC_API_URL para apuntar la app a los endpoints reales de
// /programs sin tocar el resto del código.
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'https://jsonplaceholder.typicode.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ============================================================
// INTERCEPTOR DE RESPUESTA — manejo global de errores
// ============================================================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // log de red para debugging en desarrollo
    if (__DEV__) {
      console.error('[API Error]', error.response?.status, error.config?.url);
    }
    return Promise.reject(error);
  }
);
