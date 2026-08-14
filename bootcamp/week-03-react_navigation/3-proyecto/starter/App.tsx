// App.tsx
// Punto de entrada principal de la app "Radio Comunitaria".
// NavigationContainer envuelve toda la navegación de la app.

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation/RootNavigator';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
