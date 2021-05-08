import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SignupScreen from './src/screens/Auth/SignupScreen';
import SigninScreen from './src/screens/Auth/SigninScreen';
import UserConfigScreen from './src/screens/Auth/UserConfigScreen';
import AccountScreen from './src/screens/AccountScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import WaitAuthScreen from './src/screens/Auth/WaitAuthScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { Provider as TrackProvider } from './src/context/TrackContext';
import { Provider as UserProvider } from './src/context/UserContext';
import * as Font from 'expo-font';

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

const signStackNavigator = createStackNavigator({
  Signup: SignupScreen,
  Signin: SigninScreen,
  UserConfig: UserConfigScreen,
});

const bottomBarNavigator = createBottomTabNavigator({
  Track: createStackNavigator({
    TrackList: TrackListScreen,
    TrackDetail: TrackDetailScreen
  }),
  TrackCreate: TrackCreateScreen,
  Account: AccountScreen
});

const switchNavigator = createSwitchNavigator({
  WaitAuth: WaitAuthScreen,
  loginFlow: signStackNavigator,
  mainFlow: bottomBarNavigator,
});

const App = createAppContainer(switchNavigator);
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
              <App ref={setNavigator} />
            </TrackProvider>  
          </LocationProvider>
        </UserProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};
