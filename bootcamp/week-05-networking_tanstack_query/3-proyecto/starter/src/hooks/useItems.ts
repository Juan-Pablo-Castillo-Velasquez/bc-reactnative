// src/hooks/useItems.ts
// Custom hooks que encapsulan la lógica de fetching del dominio
// Radio Comunitaria. Los componentes consumen estos hooks, no llaman
// a apiClient directamente.
//
// NOTA: mientras el backend real de bc-expressjs (endpoint /programs con
// host, schedule y sponsor) no está desplegado y accesible desde el
// móvil, se usa JSONPlaceholder (/posts) como API de práctica, mapeando
// su forma de datos (title, body) a nuestro modelo de dominio
// (name, description).

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateItemPayload, Item } from '../types';

// ============================================================
// QUERY KEY
// ============================================================
// Centralizar la queryKey evita errores de typo al invalidar.
export const PROGRAMS_QUERY_KEY = ['programs'] as const;

// ============================================================
// Forma cruda que retorna la API de práctica (JSONPlaceholder /posts)
// ============================================================
interface RawPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function mapPostToItem(post: RawPost): Item {
  return {
    id: post.id,
    name: post.title,
    description: post.body,
  };
}

// ============================================================
// useItems — obtener lista de programas
// ============================================================

export function useItems() {
  return useQuery<Item[]>({
    queryKey: PROGRAMS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<RawPost[]>('/posts?_limit=15');
      return data.map(mapPostToItem);
    },
  });
}

// ============================================================
// useItemById — obtener un programa individual por ID
// ============================================================
// Usado en DetailScreen para obtener los detalles completos.

export function useItemById(id: string | number) {
  return useQuery<Item>({
    queryKey: [...PROGRAMS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<RawPost>(`/posts/${id}`);
      return mapPostToItem(data);
    },
    // La query solo corre si hay un id válido
    enabled: !!id,
  });
}

// ============================================================
// useCreateItem — crear un nuevo programa
// ============================================================

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation<Item, Error, CreateItemPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<RawPost>('/posts', {
        title: payload.name,
        body: payload.description,
        userId: 1,
      });
      return mapPostToItem(data);
    },
    onSuccess: () => {
      // Invalida el caché → TanStack Query hace refetch de la lista automáticamente
      queryClient.invalidateQueries({ queryKey: PROGRAMS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('No se pudo crear el programa:', error.message);
    },
  });
}

// ============================================================
// useDeleteItem — eliminar un programa por ID
// ============================================================

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string | number>({
    mutationFn: async (id) => {
      await apiClient.delete(`/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROGRAMS_QUERY_KEY });
    },
  });
}
