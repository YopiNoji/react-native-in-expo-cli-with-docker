// core
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// components & theme
import { Spinner, NativeBaseProvider } from "native-base"
import useCachedResources from './hooks/useCachedResources';
import { theme } from './theme';
import { useColorScheme } from 'react-native';

// navigation
import Navigation from './navigation';

// redux & persister
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from './lib/redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const mode = useColorScheme();
  // Changing initialColorMode to 'dark' or 'light' or system(mode)
  theme.config.initialColorMode = mode
  return (
    <NativeBaseProvider theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate loading={<Spinner size="lg" />} persistor={persistor}>
          <SafeAreaProvider>
          {!isLoadingComplete && 
              <Spinner size="lg" />
          }
          {isLoadingComplete && 
            <>
              <Navigation theme={theme} />
              <StatusBar />
            </>
          }
          </SafeAreaProvider>
        </PersistGate>
      </ReduxProvider>
    </NativeBaseProvider>
  );
}
