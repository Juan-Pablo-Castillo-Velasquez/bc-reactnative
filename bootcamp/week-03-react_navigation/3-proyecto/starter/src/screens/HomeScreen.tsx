// src/screens/HomeScreen.tsx
// Pantalla de lista — muestra todos los programas de la radio comunitaria.
// Al presionar un programa navega al DetailScreen pasando los params.

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeList'
>;

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  /**
   * Navega al DetailScreen pasando los datos del programa seleccionado.
   */
  function handleItemPress(item: Item): void {
    navigation.navigate('HomeDetail', {
      id: item.id,
      name: item.name,
      host: item.host,
      schedule: item.schedule,
      sponsor: item.sponsor,
      genre: item.genre,
    });
  }

  function renderItem({ item }: { item: Item }): React.JSX.Element {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        onPress={() => handleItemPress(item)}
        testID={`item-${item.id}`}
      >
        <View style={styles.genreBadge}>
          <Text style={styles.genreBadgeText}>{item.genre}</Text>
        </View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>🎙️ {item.host}</Text>
          <Text style={styles.metaText}>🕐 {item.schedule}</Text>
        </View>
        <Text style={styles.chevron}>{'›'}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Programación</Text>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay programas disponibles</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.sm,
  },
  list: {
    padding: SPACING.base,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: {
    opacity: 0.7,
    backgroundColor: COLORS.surfaceAlt,
  },
  genreBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    marginBottom: SPACING.xs,
  },
  genreBadgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.accent,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  itemDescription: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.sm,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.textMuted,
  },
  chevron: {
    position: 'absolute',
    right: SPACING.base,
    top: '50%',
    fontSize: TYPOGRAPHY.size.xl,
    color: COLORS.textMuted,
  },
  separator: {
    height: SPACING.sm,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.textMuted,
    marginTop: SPACING.xxl,
  },
});
