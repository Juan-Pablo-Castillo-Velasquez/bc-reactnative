// ============================================================
// COMPONENT: ItemCard
// ============================================================
// Tarjeta reutilizable para mostrar un programa de la radio.
// Este componente se renderiza por cada item en HomeScreen.
// ============================================================

import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Program } from '../types';

interface ItemCardProps {
  program: Program;
  onPress: (program: Program) => void;
}

export function ItemCard({ program, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(program)}
    >
      <Image
        source={{ uri: program.imageUri }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{program.name}</Text>
        <Text style={styles.cardHost}>Conducido por {program.host}</Text>
        <Text style={styles.cardSchedule}>{program.schedule}</Text>
        <Text style={styles.cardSponsor}>Patrocina: {program.sponsor}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  cardPressed: {
    opacity: 0.8,
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardBody: {
    padding: 16,
    gap: 4,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardHost: {
    fontSize: 14,
    color: '#8b949e',
  },
  cardSchedule: {
    fontSize: 13,
    color: '#58a6ff',
  },
  cardSponsor: {
    fontSize: 12,
    color: '#8b949e',
    marginTop: 2,
  },
});