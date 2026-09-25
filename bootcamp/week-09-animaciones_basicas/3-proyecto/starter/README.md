# Proyecto Semana 09 — Animaciones Básicas

## 👤 Datos del Aprendiz

| Campo | Valor |
|-------|-------|
| Nombre | Juan Pablo Castillo Velásquez |
| Ficha | 3228970 |
| Repositorio | bc-reactnative |
| Correo | juanpablo2007k@gmail.com |

## 📋 Dominio Asignado: Radio Comunitaria

Animaciones aplicadas a la app de **programas** de una emisora
comunitaria, continuando el modelo de dominio `Item { id, name,
description }` de las semanas 05-08 (con el campo `progress` ya
presente en el starter, reutilizado como **avance de temporada** de
cada programa):

1. **Voces del Barrio** — opinión y participación ciudadana
2. **Ritmos Locales** — espacio musical de artistas de la región
3. **Radio Noticias** — noticiero comunitario
4. **Consultorio Popular** — salud comunitaria

Los datos de ejemplo están en `src/data/programs.ts`, compartidos entre
`HomeScreen` y `DetailScreen` para que ambas pantallas muestren la
misma información de cada programa.

## 🎯 Objetivo

Integrar las 5 animaciones requeridas por la rúbrica, coherentes con el
dominio, sin usarlas como demostración aislada.

## ✅ Requisitos Funcionales Cumplidos

1. **Animación de entrada en `DetailScreen`** — `Animated.parallel`
   (fade in 0→1 + slide up 30→0, 500ms) al montar la pantalla de
   detalle de un programa.
2. **Feedback táctil en `AnimatedCard`** — `Animated.spring`
   (scale 1→0.95 en `onPressIn`, con rebote de vuelta a 1 en
   `onPressOut`) en cada card de programa de `HomeScreen`.
3. **`ProgressBar` con `interpolate`** — ancho (`0%→100%`) y color
   (rojo→amarillo→verde) animados según el avance de temporada de cada
   programa.
4. **Entrada en cascada en `HomeScreen`** — `Animated.stagger(80, …)`
   anima los 4 programas iniciales al montar la lista.
5. **`LayoutAnimation` al agregar/eliminar programas** —
   `LayoutAnimation.configureNext(Presets.easeInEaseOut)` antes de cada
   `setItems` en `handleAddItem`/`handleRemoveItem`, con
   `UIManager.setLayoutAnimationEnabledExperimental` habilitado en
   Android a nivel de módulo.

**Detalle de implementación de la cascada (`HomeScreen`)**: los
programas iniciales se animan con `Animated.stagger` al montar. Un
programa agregado dinámicamente con "+ Añadir programa" no repite la
cascada (aparece con opacidad 1 de inmediato) — su transición de
layout ya la cubre `LayoutAnimation`, evitando animar dos veces el
mismo evento. Los `Animated.Value` se guardan en un `Map` indexado por
`id` (no por índice de array), para que agregar o eliminar programas no
reasigne por error la animación de un item a otro.

## 🏗️ Arquitectura del Proyecto

```
starter/
├── App.tsx                       # QueryClientProvider + RootNavigator (sin cambios)
├── app.json                      # ver bug 1
├── package.json
├── tsconfig.json                 # ver bug 2
└── src/
    ├── types/
    │   └── index.ts               # Item { id, name, description, progress } (ya definido en el starter)
    ├── data/
    │   └── programs.ts            # NUEVO — programas de ejemplo, compartidos Home/Detail
    ├── theme/
    │   └── index.ts               # sin cambios
    ├── components/
    │   ├── AnimatedCard.tsx       # spring scale feedback — implementado
    │   ├── AnimatedButton.tsx     # timing + spring tap — implementado
    │   └── ProgressBar.tsx        # interpolate width + color — implementado
    ├── navigation/
    │   ├── types.ts                # sin cambios
    │   └── RootNavigator.tsx       # títulos actualizados al dominio
    └── screens/
        ├── HomeScreen.tsx          # stagger entrance + LayoutAnimation + datos del dominio
        └── DetailScreen.tsx        # fade in + slide up al montar + datos del dominio
```

## 🐛 Errores encontrados en el material base y su corrección

Verificado con `pnpm install` + `npx tsc --noEmit` + `npx expo config`
(este último simula la resolución de configuración que hace `expo
start` antes de arrancar el bundler). Se encontraron y corrigieron
**dos** errores reales — uno impedía que la app arrancara en absoluto —
documentados aquí en vez de modificados en silencio. No se tocó ningún
README ni archivo de teoría/rúbrica.

1. **`app.json` declara `"plugins": ["expo-router"]`, pero el proyecto
   no usa `expo-router` en ningún lado** (usa `@react-navigation/native-stack`
   con un `Stack.Navigator` normal, sin carpeta `app/` de rutas) **ni lo
   tiene como dependencia en `package.json`.** Al resolver la
   configuración, Expo intenta cargar ese plugin y falla de inmediato:
   ```
   PluginError: Failed to resolve plugin for module "expo-router"
   relative to "<proyecto>". Do you have node modules installed?
   ```
   Esto se reproduce con `npx expo config` (y bloquearía `pnpm start`
   de la misma forma, antes de llegar a levantar el bundler — el
   entregable "App corriendo en simulador" del README sería imposible
   de cumplir tal como venía el `app.json`). Corrección: se eliminó la
   clave `"plugins": ["expo-router"]` completa (no se usa en ninguna
   parte del código); verificado que `npx expo config` resuelve limpio
   después del cambio.

2. **`tsconfig.json` no compila con `typescript@6.0.3`** (versión
   fijada en `package.json`, igual que en la semana 08): define
   `"baseUrl": "."` junto a `"paths": { "@/*": ["src/*"] }`, pero desde
   TypeScript 6.0 `baseUrl` está deprecado y `tsc` lo trata como
   **error duro** (`TS5101`), no advertencia. El alias `@/*` tampoco se
   usa en ningún archivo del proyecto. Corrección aplicada — un único
   campo agregado, preservando el alias:
   ```json
   { "compilerOptions": { "strict": true, "ignoreDeprecations": "6.0", "baseUrl": ".", "paths": { "@/*": ["src/*"] } } }
   ```

No se detectaron warnings de peer dependencies en esta instalación
(`pnpm install` limpio, sin `node_modules` previo).

## 🚀 Cómo ejecutar

```bash
# Ejercicio 01 (timing + spring) — funciona en Expo Go
cd bootcamp/week-09-animaciones_basicas/2-practicas/ejercicio-01-timing-spring/starter
pnpm install
pnpm start

# Ejercicio 02 (interpolate + stagger) — funciona en Expo Go
cd bootcamp/week-09-animaciones_basicas/2-practicas/ejercicio-02-interpolation/starter
pnpm install
pnpm start

# Proyecto — funciona en Expo Go
cd bootcamp/week-09-animaciones_basicas/3-proyecto/starter
pnpm install
pnpm start
```

### ⚠️ Nota sobre verificación de entorno

Los tres paquetes se verificaron con `pnpm install` + `npx tsc --noEmit`
(compilan sin errores), y el proyecto además con `npx expo config`
(resuelve la configuración sin errores, tras corregir el bug 1). No fue
posible ejecutar la app en un simulador iOS/Android ni en Expo Go desde
este entorno de verificación (sin Android SDK/Xcode/emulador
disponibles), por lo que la fluidez real de las animaciones (60 fps,
ausencia de tirones) y el criterio "App corriendo en simulador iOS y/o
Android" quedan pendientes de tu propia verificación con `pnpm start`.

## 📊 Autoevaluación según Rúbrica (Producto — 30 pts)

| Criterio | Cumple |
|---|---|
| Animación de entrada en pantalla principal (`useEffect` + `Animated.timing`) | ✅ (stagger en `HomeScreen`, parallel en `DetailScreen`) |
| Feedback de tap animado en botones/cards del dominio (`Animated.spring`) | ✅ (`AnimatedCard`, `AnimatedButton`) |
| `LayoutAnimation` al agregar/eliminar elementos | ✅ |
| App compila y corre sin errores en simulador | ✅ compila (`tsc`, `expo config`); ⏳ ejecución en simulador pendiente de verificación local (ver nota arriba) |
| Animaciones coherentes con el dominio asignado | ✅ (avance de temporada por programa, feedback táctil en cards/botones de programas) |
