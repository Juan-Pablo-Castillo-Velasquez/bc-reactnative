# Proyecto Semana 06 — Formularios con React Hook Form + Zod

## 👤 Datos del Aprendiz

| Campo | Valor |
|-------|-------|
| Nombre | Juan Pablo Castillo Velásquez |
| Ficha | 3228970 |
| Repositorio | bc-reactnative |
| Correo | juanpablo2007k@gmail.com |

## 📋 Dominio Asignado: Radio Comunitaria

Formularios de creación y edición para **programas** (`programs`) de una
emisora comunitaria, con validación completa vía Zod + `zodResolver`.
Este proyecto continúa el mismo modelo de dominio establecido en la
Semana 05 (`Item { id, name, description }`), consumiendo
**JSONPlaceholder** (`/posts`) como API de práctica mientras el backend
propio (`bc-expressjs`, endpoint `/programs`) no está desplegado y
accesible desde el simulador. `src/hooks/useItems.ts` mapea la forma de
datos de la API (`title`, `body`) al modelo del dominio (`name`,
`description`); cambiar a la API real solo requiere definir
`EXPO_PUBLIC_API_URL` en `src/services/api.ts`.

> El objetivo de esta semana es formularios y validación, no modelado de
> dominio, por lo que no se reintrodujeron los campos `host`, `schedule`,
> `sponsor` y `genre` explorados en semanas anteriores — quedan
> pendientes hasta que el endpoint real `/programs` esté disponible.

## 🎯 Objetivo

Implementar `CreateScreen` y `EditScreen` con `useForm` + `zodResolver`,
un `FormField` reutilizable tipado con los generics de React Hook Form,
mensajes de error inline y `reset()` en `useEffect` para precargar datos
en edición.

## 🏗️ Arquitectura del Proyecto

```
starter/
├── App.tsx                       # QueryClientProvider + NavigationContainer
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── services/
    │   └── api.ts                 # Instancia Axios (sin cambios)
    ├── hooks/
    │   └── useItems.ts            # useItems, useItemById, useCreateItem, useUpdateItem
    ├── schemas/
    │   └── itemSchema.ts          # z.object(name, description) + ItemFormData inferido
    ├── components/
    │   └── FormField.tsx          # Controller + TextInput + error, tipado con Control<T>/FieldPath<T>
    ├── navigation/
    │   ├── types.ts                # RootStackParamList
    │   └── RootNavigator.tsx       # Stack: Home (Programas) → Create (modal) / Edit
    ├── screens/
    │   ├── HomeScreen.tsx          # Lista con TanStack Query (renombrado a name/description)
    │   ├── CreateScreen.tsx        # useForm + zodResolver + useCreateItem
    │   └── EditScreen.tsx          # useItemById + reset(useEffect) + useUpdateItem
    ├── types/
    │   └── index.ts                # Item, CreateItemPayload, UpdateItemPayload
    └── theme/
        └── index.ts                # COLORS, TYPOGRAPHY, SPACING, RADIUS
```

## ✅ Requisitos Funcionales Cumplidos

1. **`FormField` genérico** (`Control<T>`, `FieldPath<T>`) reutilizado en `CreateScreen` y `EditScreen`
2. **`CreateScreen`**: `useForm<ItemFormData>({ resolver: zodResolver(itemSchema) })`, campos `name`/`description`, `useCreateItem` y navegación atrás en `onSuccess`
3. **`EditScreen`**: mismo formulario con `defaultValues` cargados vía `useItemById` + `reset()` en `useEffect([item, reset])`, mutación con `useUpdateItem`
4. **Validación activa**: errores de Zod visibles bajo cada campo al intentar enviar con datos inválidos
5. **Estado de carga**: botón deshabilitado y `ActivityIndicator` durante `isSubmitting` / `isPending`

## 🐛 Errores encontrados en el material base y su corrección

Durante la verificación con `tsc --noEmit` (requisito explícito de la
rúbrica: "TypeScript sin errores de compilación") se encontraron y
corrigieron dos problemas reales en los archivos DADO, documentados aquí
en vez de modificarlos en silencio:

1. **`src/services/api.ts` usa `process.env.EXPO_PUBLIC_API_URL`, pero el
   `package.json`/`tsconfig.json` del starter no incluían `@types/node`.**
   Esto ya existía sin corregir desde la Semana 05 (mismo patrón en su
   `api.ts`), pero solo se manifiesta como error al correr `tsc`
   standalone — `expo start` usa Babel, que no tipa, así que nunca
   bloqueó la ejecución. Corrección: se agregó `"@types/node": "22.15.3"`
   a `devDependencies` **y** `"types": ["node"]` a
   `tsconfig.json` → `compilerOptions` (agregar solo la dependencia no
   fue suficiente; TypeScript no descubre automáticamente sus tipos sin
   declararlo explícitamente en `types`).

2. **Ejercicio 02 (`z.coerce.number()` + `useForm<OrderFormData>` con un
   solo genérico) no compila en modo estricto.** El código tal como está
   comentado en el starter (`useForm<OrderFormData>({ defaultValues: {
   quantity: '1', ... } })`, con `OrderFormData = z.infer<typeof
   orderSchema>` y `quantity: number`) produce `TS2322` porque
   `defaultValues` espera `number` pero se provee `'1'` (string, el
   valor que realmente puede escribirse en un `TextInput`). Corrección:
   se usó el patrón de tres genéricos de React Hook Form 7.45+, pensado
   exactamente para este caso —
   `useForm<z.input<typeof orderSchema>, unknown, z.output<typeof orderSchema>>`
   — que separa el tipo de entrada del formulario (antes de la
   coerción) del tipo de salida validado (`onSubmit` sigue recibiendo
   `quantity: number`, como promete el comentario original del PASO 4).

No se modificó nada más de los archivos DADO. También se detectó (y se
dejó igual, por no ser un error sino una advertencia no bloqueante) un
warning de peer dependency: `@react-navigation/native@^7.4.1: found
7.3.8`, causado por el pin de versión del propio starter.

## 🚀 Cómo ejecutar

```bash
# Ejercicio 01
cd bootcamp/week-06-formularios_validacion/2-practicas/ejercicio-01-useform-controller/starter
pnpm install
pnpm start

# Ejercicio 02
cd bootcamp/week-06-formularios_validacion/2-practicas/ejercicio-02-zod-resolver/starter
pnpm install
pnpm start

# Proyecto
cd bootcamp/week-06-formularios_validacion/3-proyecto/starter
pnpm install
pnpm start
```

Seleccionar simulador iOS (`i`) o Android (`a`) en el menú de Expo CLI,
o escanear el QR con Expo Go.

### ⚠️ Nota sobre verificación de entorno

Este entregable se verificó con `pnpm install` + `npx tsc --noEmit`
(los tres paquetes compilan sin errores). No fue posible ejecutar la
app en un simulador iOS/Android ni en Expo Go desde este entorno de
verificación (sin acceso a un emulador o dispositivo), por lo que el
criterio "App corriendo en simulador iOS y/o Android" (4 pts) queda
pendiente de tu propia verificación con `pnpm start` en tu máquina
(recordando los workarounds ya conocidos: `npm` en vez de `pnpm` si da
problemas, y BlueStacks para el emulador de Android).

## 📊 Autoevaluación según Rúbrica (Producto — 30 pts)

| Criterio | Cumple |
|---|---|
| `FormField` reutilizable implementado | ✅ |
| `CreateScreen` funcional (zodResolver, useMutation, navega atrás) | ✅ |
| `EditScreen` con `defaultValues` vía `reset()` en `useEffect` | ✅ |
| Validación activa y mensajes visibles | ✅ |
| App corriendo en simulador iOS y/o Android | ⏳ pendiente de verificación local (ver nota arriba) |
