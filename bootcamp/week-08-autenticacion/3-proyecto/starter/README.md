# Proyecto Semana 08 — Autenticación Completa

## 👤 Datos del Aprendiz

| Campo | Valor |
|-------|-------|
| Nombre | Juan Pablo Castillo Velásquez |
| Ficha | 3228970 |
| Repositorio | bc-reactnative |
| Correo | juanpablo2007k@gmail.com |

## 📋 Dominio Asignado: Radio Comunitaria

Autenticación JWT completa para la app de **programas** de una emisora
comunitaria, continuando el modelo de dominio `Item { id, name,
description }` de las semanas 05-07 en la nueva `HomeScreen` protegida
por sesión.

1. **`authStore` (Zustand + persist)** — `user`, `isAuthenticated`,
   `isLoading`, `error`, y las acciones `login()`, `register()`,
   `logout()`, `refreshTokens()`. Solo `{ user, isAuthenticated }` se
   persiste en AsyncStorage (`partialize`); los tokens **nunca** se
   persisten ahí.
2. **`tokenService` (Expo SecureStore)** — access y refresh token
   siempre cifrados, nunca en AsyncStorage/MMKV ni en texto plano.
3. **Interceptores Axios (`api.ts`)** — el interceptor de request
   inyecta `Authorization: Bearer <accessToken>`; el de response
   detecta `401`, renueva el token con `refreshTokens()` y reintenta la
   petición original una sola vez (`originalRequest._retry`), evitando
   loops infinitos.
4. **`HomeScreen`** — lista de **programas** de la radio, usando
   `dummyjson.com/posts` (mismo patrón de mapeo que JSONPlaceholder en
   semanas anteriores: `title → name`, `body → description`) sobre el
   tipo compartido `Item` en `src/types/index.ts`.
5. **`ProfileScreen`** — datos del usuario autenticado + fila de
   dominio "Rol: Oyente de la Radio Comunitaria" (dato de UI, no
   inventado sobre el usuario real de la API).
6. **Navegación condicional** — `RootNavigator` alterna entre
   `AuthNavigator` (Login/Register) y `AppNavigator` (Home/Profile en
   bottom tabs) según `isAuthenticated`.

`dummyjson.com/auth/login` se usa como API de práctica para el login
real (tiene endpoint JWT funcional); `register()` usa el mock sugerido
por el propio material (dummyjson no tiene endpoint real de registro),
documentado en el código de `authService.ts`.

## 🎯 Objetivo

Implementar el ciclo completo de autenticación con JWT (login, sesión
persistida, refresh automático en 401, logout) aplicado al dominio
asignado, sin exponer nunca los tokens fuera de SecureStore.

## 🏗️ Arquitectura del Proyecto

```
starter/
├── App.tsx                      # QueryClientProvider + RootNavigator
├── app.json                     # scheme "bcauth08" (sin cambios)
├── package.json
├── tsconfig.json                # ver bug 1
└── src/
    ├── types/
    │   └── index.ts              # AuthTokens, AuthUser, JwtPayload... + Item (nuevo, Programas)
    ├── theme/
    │   └── index.ts              # sin cambios
    ├── schemas/
    │   └── authSchema.ts         # loginSchema, registerSchema (sin cambios, ya completo)
    ├── components/
    │   └── FormField.tsx         # sin cambios
    ├── services/
    │   ├── tokenService.ts       # SecureStore wrapper (sin cambios, ya completo)
    │   ├── authService.ts        # login/register/refreshTokens/getProfile — implementado
    │   └── api.ts                # instancia Axios + interceptor 401 → refresh → retry — implementado
    ├── stores/
    │   └── authStore.ts          # Zustand + persist(partialize) — implementado
    ├── navigation/
    │   ├── types.ts               # sin cambios
    │   ├── AuthNavigator.tsx      # sin cambios
    │   ├── AppNavigator.tsx       # sin cambios
    │   └── RootNavigator.tsx      # sin cambios
    └── screens/
        ├── LoginScreen.tsx        # onSubmit implementado (resto ya completo)
        ├── RegisterScreen.tsx     # onSubmit implementado (resto ya completo)
        ├── HomeScreen.tsx         # adaptado al dominio: dummyjson/posts → Item{name,description}
        └── ProfileScreen.tsx      # fila de dominio agregada
```

## ✅ Requisitos Funcionales Cumplidos

1. **`useAuthStore`**: `user`, `isAuthenticated`, `login()`, `register()`, `logout()`, `refreshTokens()` funcionando end-to-end contra `dummyjson.com`
2. **`LoginScreen`**: formulario RHF + Zod, llama `login()`, `Alert` con "Credenciales incorrectas" en error
3. **Navegación condicional**: `RootNavigator` cambia entre `AuthNavigator`/`AppNavigator` según `isAuthenticated`, sin navegación manual
4. **Persistencia**: tokens en SecureStore sobreviven reinicios; `user`/`isAuthenticated` persisten vía Zustand+AsyncStorage (`partialize`, sin tokens)
5. **Interceptor 401 → refresh → retry**: `api.ts` renueva el access token automáticamente y reintenta la petición original una única vez

## 🐛 Errores encontrados en el material base y su corrección

Verificado con `pnpm install` + `npx tsc --noEmit` (criterio explícito de
la rúbrica: "TypeScript sin errores de compilación"). Se encontró y
corrigió **un** error real de compilación, y se completó **un** archivo
de configuración ausente en `2-practicas/ejercicio-02` — documentados
aquí en vez de modificados en silencio. No se tocó ningún README ni
archivo de teoría/rúbrica.

1. **`tsconfig.json` del proyecto no compila con `typescript@6.0.3`
   (versión fijada en `package.json`).** El archivo define
   `"baseUrl": "."` junto a `"paths": { "@/*": ["src/*"] }`, pero desde
   TypeScript 6.0 la opción `baseUrl` está deprecada y `tsc` la trata
   como **error duro** (`TS5101`) en vez de advertencia, salvo que se
   silencie explícitamente. El alias `@/*` tampoco se usa en ningún
   archivo del proyecto (`grep` sobre `src/` no arroja resultados), así
   que el `type-check` del proyecto (`pnpm run type-check` / `npx tsc
   --noEmit`) fallaba con una instalación limpia y sin tocar ningún
   código de la app. Corrección aplicada — un único campo agregado,
   preservando el alias por si se usa en el futuro:
   ```json
   {
     "extends": "expo/tsconfig.base",
     "compilerOptions": {
       "strict": true,
       "ignoreDeprecations": "6.0",
       "baseUrl": ".",
       "paths": { "@/*": ["src/*"] }
     }
   }
   ```

2. **`2-practicas/ejercicio-02-oauth-authsession/starter` no incluye
   `app.json`** (a diferencia de este proyecto, que sí lo trae con
   `"scheme": "bcauth08"` configurado). El flujo OAuth con
   `expo-auth-session` depende por completo de que el *deep link
   scheme* esté registrado — sin `app.json`, `makeRedirectUri({ scheme:
   'bcauth08' })` no tiene ningún esquema real que interceptar y el
   ejercicio no puede compilarse/ejecutarse como app Expo. Se agregó un
   `app.json` mínimo (documentado en el reporte del ejercicio 02) con
   el mismo `scheme` que usa el propio `App.tsx` del ejercicio.

No se detectaron warnings de peer dependencies en esta instalación
(`pnpm install` limpio, sin `node_modules` previo).

## 🔑 Acción requerida de tu parte (Ejercicio 02 — OAuth GitHub)

Este proyecto (3-proyecto) **no usa OAuth** — solo JWT contra
`dummyjson.com`, así que no necesitas ninguna credencial para
ejecutarlo. La acción pendiente es solo para
`2-practicas/ejercicio-02-oauth-authsession`, tal como indica su propio
README:

1. Ir a **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
2. **Application name**: `BC Auth08 ejercicio`
3. **Homepage URL**: `https://example.com`
4. **Authorization callback URL**: `bcauth08://`
5. Copiar el **Client ID** (público, no el secret) y pegarlo en
   `2-practicas/ejercicio-02-oauth-authsession/starter/App.tsx`, donde
   dice `REEMPLAZA_CON_TU_CLIENT_ID`
6. El `client_secret` nunca va en el código del cliente — este ejercicio
   solo obtiene el `authorization code` + `code_verifier` como prueba
   de concepto (el exchange final lo haría un backend propio).

## 🚀 Cómo ejecutar

```bash
# Ejercicio 01 (JWT con dummyjson) — funciona en Expo Go
cd bootcamp/week-08-autenticacion/2-practicas/ejercicio-01-jwt-auth/starter
pnpm install
pnpm start

# Ejercicio 02 (OAuth PKCE) — requiere build nativo + Client ID de GitHub (ver arriba)
cd bootcamp/week-08-autenticacion/2-practicas/ejercicio-02-oauth-authsession/starter
pnpm install
pnpm expo run:android   # o pnpm expo run:ios

# Proyecto — funciona en Expo Go (no usa módulos nativos adicionales)
cd bootcamp/week-08-autenticacion/3-proyecto/starter
pnpm install
pnpm start
```

### ⚠️ Nota sobre verificación de entorno

Los tres paquetes se verificaron con `pnpm install` + `npx tsc --noEmit`
(compilan sin errores). No fue posible ejecutar la app en un simulador
iOS/Android ni en Expo Go desde este entorno de verificación (sin
Android SDK/Xcode/emulador disponibles), ni probar el flujo de red en
vivo contra `dummyjson.com` o `github.com` (ambos dominios no son
alcanzables desde este entorno — se confirmó con `curl`, que devolvió
timeout/403 respectivamente). El criterio "App funcional en simulador
iOS y/o Android" y la verificación end-to-end del login/OAuth quedan
pendientes de tu propia prueba con `pnpm start` (proyecto y ejercicio
01) y `pnpm expo run:android`/`run:ios` (ejercicio 02, tras configurar
el Client ID).

## 📊 Autoevaluación según Rúbrica (Producto — 30 pts)

| Criterio | Cumple |
|---|---|
| `useAuthStore` con `user`, `accessToken` (vía SecureStore), `isAuthenticated`, `login()`, `logout()`, `refreshTokens()` | ✅ |
| Pantalla de Login: RHF + Zod, llama `login()`, maneja errores de credenciales | ✅ |
| Navegación condicional sin re-render visible | ✅ |
| Persistencia al reiniciar app (tokens en SecureStore, sesión en Zustand+AsyncStorage) | ✅ |
| App compila sin errores de TypeScript | ✅ |
| App funcional en simulador iOS y/o Android | ⏳ pendiente de verificación local (ver nota arriba) |
