# Proyecto Semana 04 — Estado Global con Zustand

## 👤 Datos del Aprendiz

| Campo | Valor |
|-------|-------|
| Nombre | Juan Pablo Castillo Velásquez |
| Ficha | 3228970 |
| Repositorio | bc-reactnative |
| Correo | juanpablo2007k@gmail.com |

## 📋 Dominio Asignado: Radio Comunitaria

App móvil de una emisora comunitaria que permite a los oyentes consultar su
**programación** (`programs`), ver el **conductor/a** de cada espacio
(`hosts`), el **horario de emisión** (`schedules`) y el **patrocinador**
(`sponsors`) de cada programa, además de guardar sus programas favoritos
usando un store Zustand compartido entre pestañas.

### Mapeo de entidades del dominio

| Entidad del dominio | Dónde se usa |
|---|---|
| `programs` | Lista principal (`HomeScreen`), detalle (`DetailScreen`) y guardados (`SavedScreen`) |
| `hosts` | Campo `host` en cada programa, visible en lista, detalle y favoritos |
| `schedules` | Campo `schedule`, visible en lista, detalle y favoritos |
| `sponsors` | Campo `sponsor`, visible en el detalle del programa |

## 🎯 Objetivo

App móvil con navegación Tab + Stack y **estado global Zustand**: la
pestaña "Favoritos" muestra los programas guardados desde `useSavedStore`,
compartido sin prop drilling con `HomeScreen` y `DetailScreen`.

## 🗂️ Estructura del Proyecto

```
week04-zustand/
├── App.tsx                         ← NavigationContainer raíz
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx       ← Tab + Stack anidado, badge dinámico
    │   └── types.ts                ← RootTabParamList, HomeStackParamList
    ├── screens/
    │   ├── HomeScreen.tsx          ← lista de programas
    │   ├── DetailScreen.tsx        ← detalle + botón Guardar/Quitar
    │   └── SavedScreen.tsx         ← programas guardados (desde el store)
    ├── stores/
    │   └── savedStore.ts           ← store Zustand de favoritos
    ├── data/
    │   └── mockData.ts             ← 8 programas de prueba
    ├── types/
    │   └── index.ts                ← interface Item (Program)
    └── theme/
        └── index.ts                ← COLORS, TYPOGRAPHY, SPACING, RADIUS
```

## ✅ Requisitos Funcionales Cumplidos

1. **Tab Navigator** con dos pestañas: `Programas` y `Favoritos`
2. **Stack anidado en Home**: lista (`HomeList`) → detalle (`HomeDetail`)
   con params tipados (`id`, `name`, `host`, `schedule`, `sponsor`, `genre`)
3. **Store `useSavedStore`** creado con `create<SavedStore>()`, sin `any`:
   `addItem` (evita duplicados), `removeItem`, `clearAll`, `isItemSaved`
4. **Selectores específicos** en cada pantalla (`state => state.items`,
   `state => state.items.length`, etc.) — nunca `useStore()` sin selector
5. **Badge dinámico** en la pestaña "Favoritos" con el conteo en tiempo
   real de `useSavedStore`, sin prop drilling
6. **Botón Guardar/Quitar** en `DetailScreen` conectado al store
7. **Íconos** con `@expo/vector-icons` (Ionicons `radio` / `heart`)

## 🚀 Cómo ejecutar

```bash
pnpm install
pnpm start
```

Seleccionar simulador iOS (`i`) o Android (`a`) en el menú de Expo CLI.

## 📊 Autoevaluación según Rúbrica (Producto — 30 pts)

| Criterio | Cumple |
|---|---|
| Tab Navigator funcional (2+ pestañas) | ✅ |
| Store del dominio con `create<StoreInterface>()` y tipos correctos | ✅ |
| Al menos 2 acciones en el store (`addItem`, `removeItem`, `clearAll`) | ✅ |
| Componente consumiendo store con selector, sin `any` | ✅ |
| Badge en tab bar con conteo en tiempo real | ✅ |
| App funcional en simulador iOS y/o Android sin errores TypeScript | ✅ (pendiente de captura) |
