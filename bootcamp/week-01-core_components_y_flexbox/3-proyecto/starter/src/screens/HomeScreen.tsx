// ============================================================
// SCREEN: HomeScreen
// ============================================================
// Pantalla principal: header con el nombre del dominio
// y lista de tarjetas usando ScrollView.
// ============================================================

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Program } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_PROGRAMS } from '../data/mockData';

export function HomeScreen(): React.JSX.Element {
  const DOMAIN_TITLE = 'Radio Comunitaria';
  const DOMAIN_SUBTITLE = 'Programación semanal';

  /**
   * Handles program card press.
   * For now, just logs the program name. In week-03 we'll add navigation.
   */
  function handleItemPress(program: Program): void {
    console.log('Programa seleccionado:', program.name);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
        <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
      </View>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_PROGRAMS.map((program) => (
          <ItemCard
            key={program.id}
            program={program}
            onPress={handleItemPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1117',
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8b949e',
    marginTop: 4,
  },

  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});