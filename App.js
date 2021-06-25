import React, { useContext, useEffect, useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Context as AuthContext } from './src/context/AuthContext';
import { Context as UserContext } from './src/context/UserContext';
import { Image, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import SignupScreen from './src/screens/Auth/SignupScreen';
import SigninScreen from './src/screens/Auth/SigninScreen';
import UserConfigScreen from './src/screens/Auth/UserConfigScreen';
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
import TrackMapScreen from './src/screens/TrackMapScreen';

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

const App = () => {

  const { tryLocalSignIn, state: auth } = useContext(AuthContext);
  const { saveUser } = useContext(UserContext);

  useEffect(() => {
    tryLocalSignIn({ saveUser });
  }, []);

  if(!auth.verifToken){
    return (
      <View style={{backgroundColor: "#fe9b18"}}>
        <Image style={{ height: hp(100), width: wp(100) }} source={require("./assets/splash.png")} />
      </View>
    )
  }

  return(
    <NavigationContainer ref={navigationRef}>
      <AppStackNavigator.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}
      >
        {auth.token ? (
          auth.valid ? (
            <>
              <AppStackNavigator.Screen 
                name="Home"
                component={HomeScreen}
              />
              <AppStackNavigator.Screen
                name="TrackMap"
                component={TrackMapScreen}
                options={{headerShown: true}}
              />
            </>
          ) : (
            <AppStackNavigator.Screen
              name="UserConfig"
              component={UserConfigScreen}
            />
        )) : (
          <>
            <AppStackNavigator.Screen
              name="Signup"
              component={SignupScreen}
            />
            <AppStackNavigator.Screen
              name="Signin"
              component={SigninScreen}
            />
          </>
        )}
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
