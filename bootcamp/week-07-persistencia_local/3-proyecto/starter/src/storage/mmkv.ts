// src/storage/mmkv.ts
// Instancia global de MMKV para toda la app.
// Importa `storage` desde aquí en cualquier hook o pantalla.
// ⚠️  Requiere build nativo — no funciona con Expo Go.
//
// NOTA: react-native-mmkv 4.x (Nitro) ya no expone `MMKV` como clase
// instanciable con `new MMKV({...})` — en esta versión `MMKV` es solo
// un tipo (la interfaz de una instancia ya creada). La instancia se
// crea con la función factory `createMMKV()`.

import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'app-storage' });
