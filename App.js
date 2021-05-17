import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import SignupScreen from './src/screens/Auth/SignupScreen';
import SigninScreen from './src/screens/Auth/SigninScreen';
import UserConfigScreen from './src/screens/Auth/UserConfigScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import WaitAuthScreen from './src/screens/Auth/WaitAuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './src/navigationRef';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { Provider as UserProvider } from './src/context/UserContext';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

const fetchFonts = () => {
  return Font.loadAsync({
    'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    'Montserrat-ExtraLight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
  });
};

const AppStackNavigator = createStackNavigator();
const AuthStackNavigator = createStackNavigator();
const MainStackNavigator = createStackNavigator();

const Auth = () => {
  return(
    <AuthStackNavigator.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
      
    >
      <AuthStackNavigator.Screen
        name="WaitAuth"
        component={WaitAuthScreen}
      />
      <AuthStackNavigator.Screen
        name="Signup"
        component={SignupScreen}
      />
      <AuthStackNavigator.Screen
        name="Signin"
        component={SigninScreen}
      />
      <AuthStackNavigator.Screen
        name="UserConfig"
        component={UserConfigScreen}
      />
    </AuthStackNavigator.Navigator>
  );
}

const Main = () => {
  return(
    <MainStackNavigator.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}
    >
      <MainStackNavigator.Screen 
        name="Home"
        component={HomeScreen}
      />
      <MainStackNavigator.Screen 
        name="Account"
        component={AccountScreen}
      />
      <MainStackNavigator.Screen 
        name="TrackList"
        component={TrackListScreen}
      />
      <MainStackNavigator.Screen 
        name="TrackDetail"
        component={TrackDetailScreen}
      />
      <MainStackNavigator.Screen 
        name="TrackCreate"
        component={TrackCreateScreen}
      />
    </MainStackNavigator.Navigator>
  );
}

const App = () => {
  return(
    <NavigationContainer ref={navigationRef}>
      <AppStackNavigator.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}
      >
        <AppStackNavigator.Screen
          name="Auth"
          component={Auth}
        />
        <AppStackNavigator.Screen
          name="Main"
          component={Main}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return(
      <AppLoading 
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return(
    <SafeAreaProvider>
      <AuthProvider>
        <UserProvider>
          <LocationProvider>
            <TrackProvider>
              <App />
            </TrackProvider>  
          </LocationProvider>
        </UserProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};
