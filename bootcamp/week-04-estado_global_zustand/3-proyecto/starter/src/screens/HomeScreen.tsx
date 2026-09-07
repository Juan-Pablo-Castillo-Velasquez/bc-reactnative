// src/screens/HomeScreen.tsx
// Pantalla principal: lista de programas de la Radio Comunitaria,
// con navegación al detalle de cada uno.

import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type HomeScreenNavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeList'>;

// ============================================================
// SUB-COMPONENTE: ItemCard
// ============================================================
// Tarjeta de programa: género, nombre, descripción, presentador y horario.

interface ItemCardProps {
  item: Item;
  onPress: () => void;
}

function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
      testID={`item-card-${item.id}`}
    >
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailText}>{item.name.charAt(0)}</Text>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.genreBadge}>
          <Text style={styles.genreBadgeText}>{item.genre}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>🎙️ {item.host}</Text>
          <Text style={styles.metaText}>🕐 {item.schedule}</Text>
        </View>
      </View>

      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

// ============================================================
// PANTALLA: HomeScreen
// ============================================================

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavProp>();

  const items = ITEMS;

  const renderItem: ListRenderItem<Item> = ({ item }) => (
    <ItemCard
      item={item}
      onPress={() =>
        navigation.navigate('HomeDetail', {
          id: item.id,
          name: item.name,
          host: item.host,
          schedule: item.schedule,
          sponsor: item.sponsor,
          genre: item.genre,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <Text style={styles.sectionLabel}>
            {items.length} programa{items.length !== 1 ? 's' : ''} en la parrilla
          </Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay programas disponibles.</Text>
        }
      />
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
  },
  list: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  sectionLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  separator: {
    height: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  cardPressed: {
    opacity: 0.7,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.accent,
  },
  cardContent: {
    flex: 1,
    gap: SPACING.xs,
  },
  genreBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surface,
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
  cardTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  cardDescription: {
    ...TYPOGRAPHY.caption,
  },
  metaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  metaText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
  chevron: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textMuted,
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginTop: SPACING.xl,
    color: COLORS.textSecondary,
  },
});
