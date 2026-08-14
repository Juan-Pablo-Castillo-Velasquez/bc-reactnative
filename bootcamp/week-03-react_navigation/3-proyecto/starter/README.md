# Proyecto Semana 03 — React Navigation 7

## 👤 Datos del Aprendiz

| Campo | Valor |
|-------|-------|
| Nombre | Juan Pablo Castillo Velásquez |
| Ficha | 3228970 |
| Repositorio | bc-expressjs |
| Correo | juanpablo2007k@gmail.com |

## 📋 Dominio Asignado: Radio Comunitaria

App móvil de una emisora comunitaria que permite a los oyentes consultar su
**programación** (`programs`), ver el **conductor/a** de cada espacio
(`hosts`), el **horario de emisión** (`schedules`) y el **patrocinador**
(`sponsors`) de cada programa, además de guardar sus programas favoritos.

### Mapeo de entidades del dominio

| Entidad del dominio | Dónde se usa |
|---|---|
| `programs` | Lista principal (`HomeScreen`) y detalle (`DetailScreen`) |
| `hosts` | Campo `host` en cada programa, visible en lista, detalle y favoritos |
| `schedules` | Campo `schedule`, visible en lista, detalle y favoritos |
| `sponsors` | Campo `sponsor`, visible en el detalle del programa |

## 🎯 Objetivo

App móvil con navegación completa usando React Navigation 7: Tab Navigator
con dos pestañas (Programación / Favoritos) y Stack Navigator anidado
dentro de la pestaña principal para ir de lista a detalle, con tipado
correcto de parámetros.

## 🗂️ Estructura del Proyecto

```
radio-comunitaria/
├── App.tsx                         ← NavigationContainer raíz
├── app.json                        ← configuración Expo
├── package.json
├── tsconfig.json
└── src/
    ├── navigation/
    │   ├── RootNavigator.tsx       ← Tab + Stack anidado
    │   └── types.ts                ← RootTabParamList, HomeStackParamList
    ├── screens/
    │   ├── HomeScreen.tsx          ← lista de programas (FlatList)
    │   ├── DetailScreen.tsx        ← detalle con host, horario, patrocinador
    │   └── FavoritesScreen.tsx     ← programas favoritos
    ├── data/
    │   └── mockData.ts             ← 8 programas de prueba
    ├── types/
    │   └── index.ts                ← interface Item (Program)
    └── theme/
        └── index.ts                ← COLORS, TYPOGRAPHY, SPACING
```

## ✅ Requisitos Funcionales Cumplidos

1. **Tab Navigator** con dos pestañas: `Programación` y `Favoritos`
2. **Stack anidado en Home**: navega de la lista (`HomeList`) al detalle
   (`HomeDetail`) de un programa
3. **Params tipados**: se pasan `id`, `name`, `host`, `schedule`, `sponsor`
   y `genre` al navegar al detalle — sin `any`
4. **Íconos en el Tab Bar** con `@expo/vector-icons` (Ionicons `radio` /
   `heart`), cambiando de color según la pestaña activa
5. **Tipado completo** con `RootTabParamList` y `HomeStackParamList`

### Detalle de implementación

- `HomeScreen` muestra una `FlatList` con los 8 programas de la radio
- `DetailScreen` lee los params vía `useRoute` y muestra conductor,
  horario y patrocinador
- `FavoritesScreen` muestra 3 programas favoritos
- `tabBarActiveTintColor` con el acento naranja `#f0883e`
- Headers con título dinámico: el detalle muestra el nombre del programa

## 🚀 Cómo ejecutar

```bash
pnpm install
pnpm start
```

Seleccionar simulador iOS (`i`) o Android (`a`) en el menú de Expo CLI.

## 📊 Autoevaluación según Rúbrica (Producto — 30 pts)

| Criterio | Cumple |
|---|---|
| Tab Navigator con 2+ tabs adaptadas al dominio | ✅ |
| Stack Navigator anidado con pantalla de detalle | ✅ |
| Params tipados con `RootParamList` en TypeScript | ✅ |
| Header de cada pantalla con título descriptivo del dominio | ✅ |
| `NavigationContainer` correctamente configurado | ✅ |
| App funcional en simulador iOS y/o Android | ✅ (pendiente de captura) |
| TypeScript sin `any` | ✅ |
