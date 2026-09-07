# Proyecto Semana 05 — Networking y TanStack Query v5

## 👤 Datos del Aprendiz

| Campo | Valor |
|-------|-------|
| Nombre | Juan Pablo Castillo Velásquez |
| Ficha | 3228970 |
| Repositorio | bc-reactnative |
| Correo | juanpablo2007k@gmail.com |

## 📋 Dominio Asignado: Radio Comunitaria

App móvil que consume una API REST usando Axios y TanStack Query v5 para
mostrar, consultar y crear **programas** (`programs`) de una emisora
comunitaria. Mientras el backend propio (`bc-expressjs`, endpoint
`/programs` con `host`, `schedule` y `sponsor`, construido en la Semana
03 de ese track) no está desplegado y accesible desde el simulador, se
usa **JSONPlaceholder** (`/posts`) como API de práctica: `src/hooks/useItems.ts`
mapea su forma de datos (`title`, `body`) al modelo del dominio
(`name`, `description`). Cambiar a la API real solo requiere definir
`EXPO_PUBLIC_API_URL` en `src/services/api.ts`.

### Mapeo de entidades del dominio

| Entidad del dominio | Estado en esta entrega |
|---|---|
| `programs` | Implementado end-to-end: listar (`useItems`), ver detalle (`useItemById`) y crear (`useCreateItem`) contra la API de práctica |
| `hosts`, `schedules`, `sponsors` | Modelados en semanas 03 y 04; se incorporarán al `Item` de esta app cuando el endpoint real `/programs` esté disponible |

## 🎯 Objetivo

Aplicar Axios + TanStack Query v5 (`useQuery`, `useMutation`,
`invalidateQueries`) con manejo completo de estados de red: loading,
error (con reintento), vacío y pull-to-refresh.

## 🏗️ Arquitectura del Proyecto

```
starter/
├── App.tsx                       # QueryClientProvider + NavigationContainer
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── services/
    │   └── api.ts                 # Instancia Axios con baseURL configurable
    ├── hooks/
    │   └── useItems.ts            # useItems, useItemById, useCreateItem, useDeleteItem
    ├── navigation/
    │   ├── types.ts                # RootStackParamList
    │   └── RootNavigator.tsx       # Stack: Home → Detail / Create
    ├── screens/
    │   ├── HomeScreen.tsx          # Lista con useQuery + pull-to-refresh
    │   ├── DetailScreen.tsx        # Detalle con useItemById
    │   └── CreateScreen.tsx        # Formulario con useMutation
    ├── types/
    │   └── index.ts                # Item, CreateItemPayload
    └── theme/
        └── index.ts                # COLORS, TYPOGRAPHY, SPACING, RADIUS
```

## ✅ Requisitos Funcionales Cumplidos

1. **`QueryClientProvider`** envuelve toda la app en `App.tsx`
2. **Instancia Axios** en `src/services/api.ts` con `baseURL` configurable por variable de entorno
3. **`useQuery`** (`useItems`) lista los programas con `queryKey: ['programs']`
4. **`useQuery`** (`useItemById`) obtiene el detalle fresco por id
5. **`useMutation`** (`useCreateItem`) crea un programa y en `onSuccess` invalida `['programs']`
6. **Loading, error (con botón Reintentar) y empty state** en `HomeScreen`
7. **Pull-to-refresh** con `refetch` pasado a `onRefresh`/`refreshing`
8. Sin `as any`; sin estado de servidor guardado en Zustand

## 🚀 Cómo ejecutar

```bash
pnpm install
pnpm start
```

Seleccionar simulador iOS (`i`) o Android (`a`) en el menú de Expo CLI.

## 📊 Autoevaluación según Rúbrica (Producto — 30 pts)

| Criterio | Cumple |
|---|---|
| `QueryClientProvider` envuelve la app en `App.tsx` | ✅ |
| Instancia Axios en `src/services/api.ts` con `baseURL` | ✅ |
| `useQuery` obtiene lista con `queryKey` semántico (`['programs']`) | ✅ |
| `useMutation` crea un programa e invalida la query en `onSuccess` | ✅ |
| Estados loading, error y vacío implementados | ✅ |
| Pull-to-refresh funcional con `refetch` en `onRefresh` | ✅ (pendiente de captura) |
