// ============================================
// API INSTANCE — Instancia Axios con interceptores de autenticación
// ============================================
import axios from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearTokens } from './tokenService';
// NOTA sobre el import circular (api.ts <-> authService.ts): es seguro
// porque `refreshTokens` solo se usa dentro del callback del interceptor,
// que se ejecuta en tiempo de petición — no en tiempo de carga del módulo,
// cuando ambos ya están completamente inicializados.
import { refreshTokens } from './authService';

export const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─────────────────────────────────────────────
// REQUEST interceptor: inyectar access token
// ─────────────────────────────────────────────
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─────────────────────────────────────────────
// RESPONSE interceptor: manejar 401 → refresh → retry
// ─────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        await clearTokens();
        return Promise.reject(error);
      }
      try {
        const newTokens = await refreshTokens(refreshToken);
        await saveTokens(newTokens);
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export { getAccessToken, getRefreshToken, saveTokens, clearTokens };
