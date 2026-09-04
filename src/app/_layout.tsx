import React, { useContext, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Provider as UserProvider, Context as UserContext } from '../context/UserContext';
import { Provider as LocationProvider } from '../context/LocationContext';
import { Provider as TrackProvider, Context as TrackContext } from '../context/TrackContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <UserProvider>
          <LocationProvider>
            <TrackProvider>
              <RootNavigator />
            </TrackProvider>
          </LocationProvider>
        </UserProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { loadUser } = useContext(UserContext);
  const { loadTracks } = useContext(TrackContext);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [fontsLoaded] = useFonts({
    'Montserrat-Black': require('../../assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Thin': require('../../assets/fonts/Montserrat-Thin.ttf'),
  });

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([loadUser(), loadTracks()]);
      } finally {
        setBootstrapped(true);
      }
    })();
  }, []);

  const ready = fontsLoaded && bootstrapped;

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
        <Stack.Screen name="track/[id]" options={{ headerShown: true, title: 'Parcours' }} />
      </Stack>
    </>
  );
}
