// src/screens/DetailScreen.tsx
// Pantalla de detalle: muestra la información completa de un programa
// (host, horario, patrocinador) y permite guardarlo / quitarlo usando
// el store de Zustand. Demuestra cómo acceder al store desde cualquier
// screen sin recibir props.

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { ITEMS } from '../data/mockData';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type DetailRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

// ============================================================
// PANTALLA: DetailScreen
// ============================================================

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id, name, host, schedule, sponsor, genre } = route.params;

  // Se busca el ítem completo en ITEMS para obtener la descripción,
  // que no viaja en los params de navegación.
  const item: Item | undefined = ITEMS.find((i) => i.id === id);

  // ──────────────────────────────────────────────────────────
  // Selectores del savedStore — cada uno individual para evitar
  // re-renders innecesarios cuando cambia una parte del store que
  // esta pantalla no usa.
  // ──────────────────────────────────────────────────────────
  const isItemSaved = useSavedStore((state) => state.isItemSaved);
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  const isSaved = isItemSaved(id);

  function handleToggleSave(): void {
    if (isSaved) {
      removeItem(id);
    } else if (item) {
      addItem(item);
    }
  }

  return (
    <View style={styles.container}>
      {/* Icono / thumbnail del programa */}
      <View style={styles.hero}>
        <Text style={styles.heroLetter}>{name.charAt(0)}</Text>
      </View>

      {/* Información principal */}
      <View style={styles.info}>
        <View style={styles.genreBadge}>
          <Text style={styles.genreBadgeText}>{genre}</Text>
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.id}>ID: {id}</Text>

        <Text style={styles.description}>
          {item?.description ?? 'Descripción no disponible para este programa.'}
        </Text>

        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>Presentador/a</Text>
          <Text style={styles.metaValue}>🎙️ {host}</Text>
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>Horario de emisión</Text>
          <Text style={styles.metaValue}>🕐 {schedule}</Text>
        </View>
        <View style={styles.metaBlock}>
          <Text style={styles.metaLabel}>Patrocinador</Text>
          <Text style={styles.metaValue}>🤝 {sponsor}</Text>
        </View>
      </View>

      {/* ──────────────────────────────────────────────────── */}
      {/* BOTÓN GUARDAR / QUITAR — conectado al store Zustand  */}
      {/* ──────────────────────────────────────────────────── */}
      {/* Al guardar aquí, el badge del Tab "Favoritos" se actualiza
          automáticamente sin necesidad de pasar props ni callbacks. */}
      <Pressable
        style={({ pressed }) => [
          styles.saveButton,
          isSaved && styles.saveButtonActive,
          pressed && styles.saveButtonPressed,
        ]}
        onPress={handleToggleSave}
        testID="save-button"
      >
        <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>
          {isSaved ? '★  Guardado' : '☆  Guardar'}
        </Text>
      </Pressable>
    </View>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  hero: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  heroLetter: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.accent,
  },
  info: {
    gap: SPACING.sm,
  },
  genreBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  genreBadgeText: {
    ...TYPOGRAPHY.label,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    ...TYPOGRAPHY.h2,
  },
  id: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginTop: SPACING.sm,
  },
  metaBlock: {
    gap: 2,
    marginTop: SPACING.xs,
  },
  metaLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaValue: {
    ...TYPOGRAPHY.body,
  },
  saveButton: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: 'auto',
  },
  saveButtonActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  saveButtonPressed: {
    opacity: 0.7,
  },
  saveButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  saveButtonTextActive: {
    color: COLORS.background,
  },
});
