// src/services/api.ts
import axios from 'axios';
import type { Item } from '../types';

// JSONPlaceholder como backend de práctica
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Forma cruda que retorna la API de práctica (JSONPlaceholder /posts) ──────
// Se mapea a nuestro modelo de dominio (name, description) — ver semanas 05/06.
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

export async function fetchItems(): Promise<Item[]> {
  const { data } = await api.get<RawPost[]>('/posts', { params: { _limit: 15 } });
  return data.map(mapPostToItem);
}

export async function fetchItemById(id: number | string): Promise<Item> {
  const { data } = await api.get<RawPost>(`/posts/${id}`);
  return mapPostToItem(data);
}

export async function createItem(
  payload: Omit<Item, 'id'>,
): Promise<Item> {
  const { data } = await api.post<RawPost>('/posts', {
    title: payload.name,
    body: payload.description,
    userId: 1,
  });
  return mapPostToItem(data);
}

export async function updateItem(
  id: number | string,
  payload: Partial<Omit<Item, 'id'>>,
): Promise<Item> {
  const { data } = await api.put<RawPost>(`/posts/${id}`, {
    ...(payload.name !== undefined ? { title: payload.name } : {}),
    ...(payload.description !== undefined ? { body: payload.description } : {}),
    userId: 1,
  });
  return mapPostToItem(data);
}
