import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedCard } from '../components/AnimatedCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { ProgressBar } from '../components/ProgressBar';
import { COLORS, SPACING } from '../theme';
import { SAMPLE_PROGRAMS } from '../data/programs';
import type { Item } from '../types';
import type { RootStackParamList } from '../navigation/types';

// Android requires this flag to enable LayoutAnimation.
// Must be called outside the component, at module level.
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props): React.JSX.Element {
  const [items, setItems] = useState<Item[]>(SAMPLE_PROGRAMS);

  // Un Animated.Value por programa, para la entrada en cascada (stagger).
  // Se pre-carga con los programas iniciales en valor 0; los que se agreguen
  // después (handleAddItem) obtienen su valor directamente en 1, ya que
  // LayoutAnimation se encarga de animar su aparición en el layout.
  const itemAnimsRef = useRef<Map<string, Animated.Value>>(
    new Map(SAMPLE_PROGRAMS.map(item => [item.id, new Animated.Value(0)])),
  );

  function getItemAnim(id: string): Animated.Value {
    let anim = itemAnimsRef.current.get(id);
    if (!anim) {
      anim = new Animated.Value(1);
      itemAnimsRef.current.set(id, anim);
    }
    return anim;
  }

  useEffect(() => {
    const anims = SAMPLE_PROGRAMS.map(item => getItemAnim(item.id));
    Animated.stagger(
      80,
      anims.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveItem = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      name: `Programa ${items.length + 1}`,
      description: 'Nuevo programa añadido a la parrilla de la radio',
      progress: Math.random(),
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(prev => [...prev, newItem]);
  };

  const renderItem = ({ item }: { item: Item }) => {
    const anim = getItemAnim(item.id);
    const animatedStyle = {
      opacity: anim,
      transform: [
        {
          translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }),
        },
      ],
    };

    return (
      <Animated.View style={animatedStyle}>
        <AnimatedCard
          onPress={() => navigation.navigate('Detail', { itemId: item.id })}
          style={styles.card}
        >
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          {item.progress !== undefined && (
            <ProgressBar
              progress={item.progress}
              label="Avance de temporada"
            />
          )}
          <AnimatedButton
            label="Eliminar"
            variant="success"
            onPress={() => handleRemoveItem(item.id)}
          />
        </AnimatedCard>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Programas</Text>
            <Text style={styles.subtitle}>{items.length} programas al aire</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <AnimatedButton label="+ Añadir programa" onPress={handleAddItem} />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  header: {
    marginBottom: SPACING.md,
  },
  title: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
  card: {
    gap: SPACING.sm,
  },
  itemName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  itemDescription: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  separator: {
    height: SPACING.md,
  },
  footer: {
    marginTop: SPACING.xl,
  },
});
