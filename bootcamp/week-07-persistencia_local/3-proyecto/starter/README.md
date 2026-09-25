# Proyecto Semana 07 — Persistencia Local

## 👤 Datos del Aprendiz

| Campo | Valor |
|-------|-------|
| Nombre | Juan Pablo Castillo Velásquez |
| Ficha | 3228970 |
| Repositorio | bc-reactnative |
| Correo | juanpablo2007k@gmail.com |

## 📋 Dominio Asignado: Radio Comunitaria

Capa de persistencia completa para la app de **programas** (`programs`)
de una emisora comunitaria, continuando el modelo de dominio
`Item { id, name, description }` de las semanas 05-06:

1. **MMKV** — preferencias del usuario (`sortOrder`, `compactMode`,
   `itemsPerPage`) para la lista de programas.
2. **AsyncStorage** — caché offline de la lista de programas, con banner
   visible cuando se muestran datos guardados localmente.
3. **Expo SecureStore** — código de acceso a la **cabina de
   transmisión** (dato sensible del dominio), cifrado.

Como en semanas anteriores, se usa **JSONPlaceholder** (`/posts`) como
API de práctica mientras el backend propio (`bc-expressjs`, endpoint
`/programs`) no está desplegado y accesible desde el simulador;
`src/services/api.ts` mapea su forma de datos (`title`, `body`) al
modelo del dominio (`name`, `description`).

## 🎯 Objetivo

Aplicar los tres mecanismos de almacenamiento local (MMKV sincrónico,
AsyncStorage asíncrono con fallback offline, y SecureStore cifrado) al
dominio asignado, con un custom hook `usePreferences()` que encapsula
toda la lógica de MMKV.

## 🏗️ Arquitectura del Proyecto

```
starter/
├── App.tsx                      # QueryClientProvider + NavigationContainer
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── storage/
    │   └── mmkv.ts               # Instancia MMKV global (createMMKV — ver bug 1)
    ├── types/
    │   └── index.ts              # Item { id, name, description }, ItemsWithSource
    ├── theme/
    │   └── index.ts              # Colores, espaciado (sin cambios)
    ├── services/
    │   └── api.ts                # Axios + mapeo RawPost → Item
    ├── schemas/
    │   └── itemSchema.ts         # z.object(name, description) — ver bug 3
    ├── components/
    │   └── FormField.tsx         # Reutilizado de semana 06 (sin cambios)
    ├── hooks/
    │   ├── useItems.ts           # TanStack Query + caché AsyncStorage con fallback offline
    │   └── usePreferences.ts     # useMMKVString/Boolean/Number reactivos
    ├── navigation/
    │   ├── types.ts
    │   └── RootNavigator.tsx     # Stack: Home (Programas) → Create (modal) / Settings
    └── screens/
        ├── HomeScreen.tsx        # Lista + banner offline + orden/compacto (renombrado a name/description)
        ├── CreateScreen.tsx      # Del proyecto semana 06, renombrado a name/description
        └── SettingsScreen.tsx    # Preferencias MMKV + SecureStore (código de cabina) — ver bug 2
```

## ✅ Requisitos Funcionales Cumplidos

1. **`usePreferences`**: expone `sortOrder`, `compactMode`, `itemsPerPage` con `useMMKVString`/`useMMKVBoolean`/`useMMKVNumber`, reactivos y sin `async/await`
2. **`useItems`**: cachea la lista en AsyncStorage tras una llamada de red exitosa; si la red falla, recupera del caché y marca `source: 'cache'`; `HomeScreen` muestra el banner "⚠️ Sin red — mostrando datos guardados localmente"
3. **`SettingsScreen`**: switches/segmented controls para las 3 preferencias (persisten en tiempo real, sin botón "Guardar"); sección "Datos sensibles" con Guardar/Leer/Eliminar el código de acceso de cabina vía `SecureStore.setItemAsync`/`getItemAsync`/`deleteItemAsync`; el valor nunca se muestra completo (solo enmascarado: `CAB•••XT7`)
4. **`HomeScreen`**: ordena la lista según `sortOrder`, aplica `compactMode` a la fila (`ItemRow`), y muestra el banner offline cuando corresponde

## 🐛 Errores encontrados en el material base y su corrección

Verificado con `pnpm install` + `npx tsc --noEmit` (criterio explícito de
la rúbrica: "TypeScript sin errores de compilación"). Se encontraron y
corrigieron **tres** errores reales de compilación causados por
desfases entre el código de ejemplo del material y las versiones de
librerías fijadas en `package.json` — documentados aquí en vez de
modificados en silencio. No se tocó ningún README ni archivo de
teoría/rúbrica.

1. **`react-native-mmkv@4.3.2` (arquitectura Nitro) ya no expone `MMKV`
   como clase instanciable.** Tanto `src/storage/mmkv.ts` (marcado "YA
   IMPLEMENTADO") como el PASO 1 de `2-practicas/ejercicio-02` usan
   `import { MMKV } from 'react-native-mmkv'; new MMKV({ id })`, el
   patrón de la v2/v3. En la v4, `MMKV` es solo un *tipo* (la interfaz
   de una instancia ya creada); crear una instancia requiere la función
   factory `createMMKV()`. Corrección aplicada en ambos archivos:
   ```ts
   import { createMMKV } from 'react-native-mmkv';
   export const storage = createMMKV({ id: 'app-storage' });
   ```

2. **`SettingsScreen.tsx` referencia `COLORS.error` y `RADIUS.xs`, que
   no existen en `src/theme/index.ts`** (el tema define `COLORS.danger`
   y `SPACING.xs`, pero no `COLORS.error` ni `RADIUS.xs`). Corrección:
   se reemplazaron las 2 referencias a `COLORS.error` por `COLORS.danger`
   y las 2 referencias a `RADIUS.xs` por `RADIUS.sm` — sin tocar
   `theme/index.ts`, que es correcto y lo usan el resto de pantallas
   sin problema.

3. **`itemSchema.ts` usa `z.string({ required_error: '...' })`, sintaxis
   de Zod 3.** Con `zod@4.4.3` (fijado en `package.json`), ese parámetro
   fue reemplazado por un único `error`/`message`, y TypeScript rechaza
   `required_error` como propiedad desconocida (`TS2769`). Corrección:
   se eliminó `required_error` — la validación de "campo requerido" ya
   queda cubierta por `.min(1, 'El nombre no puede estar vacío')`, que
   es la única rama alcanzable en la práctica (React Hook Form siempre
   inicializa el campo como `string` vía `defaultValues`).

También se detectó (y se dejó igual, por no ser un error sino una
advertencia no bloqueante) el mismo warning de peer dependency de
semanas anteriores: `@react-navigation/native@^7.4.1: found 7.3.8`.

## 🚀 Cómo ejecutar

```bash
# Ejercicio 01 (AsyncStorage) — funciona en Expo Go
cd bootcamp/week-07-persistencia_local/2-practicas/ejercicio-01-asyncstorage/starter
pnpm install
pnpm start

# Ejercicio 02 (MMKV + SecureStore) — requiere build nativo
cd bootcamp/week-07-persistencia_local/2-practicas/ejercicio-02-mmkv-securestore/starter
pnpm install
pnpm expo run:android   # o pnpm expo run:ios

# Proyecto — requiere build nativo (usa MMKV)
cd bootcamp/week-07-persistencia_local/3-proyecto/starter
pnpm install
pnpm expo run:android   # o pnpm expo run:ios
```

### ⚠️ Nota sobre verificación de entorno

Los tres paquetes se verificaron con `pnpm install` + `npx tsc --noEmit`
(compilan sin errores). El proyecto y el ejercicio 02 **requieren un
build nativo** para MMKV (no funcionan en Expo Go), y no fue posible
generar ni ejecutar ese build desde este entorno de verificación (sin
Android SDK/Xcode ni emulador disponibles). El criterio "App funcional
en simulador iOS y/o Android" queda pendiente de tu propia verificación
con `pnpm expo run:android` (o `run:ios`) en tu máquina — recordando que
la primera vez ese comando compila los módulos nativos e instala en el
emulador/dispositivo, y que necesitarás BlueStacks o un emulador Android
si no tienes uno configurado. El ejercicio 01 sí puede verificarse de
inmediato en Expo Go.

## 📊 Autoevaluación según Rúbrica (Producto — 30 pts)

| Criterio | Cumple |
|---|---|
| MMKV: `SettingsScreen` con mínimo 2 preferencias reactivas sin async/await | ✅ (3: sortOrder, compactMode, itemsPerPage) |
| AsyncStorage: caché offline con banner visible | ✅ |
| SecureStore: dato sensible del dominio con `setItemAsync`/`getItemAsync` | ✅ (código de cabina de transmisión) |
| `usePreferences()` encapsula la lógica MMKV con helpers tipados | ✅ |
| App funcional en simulador (requiere build nativo) | ⏳ pendiente de verificación local (ver nota arriba) |
