// Dynamic config instead of app.json, so the Google Maps API key can come from
// an untracked .env file instead of being hardcoded and committed to git.
// Expo CLI loads .env automatically - see .env.example for the expected variable.
const googleMapsApiKeyAndroid = process.env.GOOGLE_MAPS_API_KEY_ANDROID;

if (!googleMapsApiKeyAndroid) {
  console.warn(
    'GOOGLE_MAPS_API_KEY_ANDROID is not set (see .env.example) - the map screens will show a blank map.',
  );
}

export default {
  expo: {
    name: 'Healven',
    slug: 'Healven',
    version: '1.2.3',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'healven',
    userInterfaceStyle: 'light',
    android: {
      package: 'com.cyrild69.healven2',
      versionCode: 0,
      adaptiveIcon: {
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundColor: '#fe9b18',
      },
      predictiveBackGestureEnabled: false,
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          backgroundColor: '#fe9b18',
          image: './assets/images/splash.png',
          imageWidth: 200,
          resizeMode: 'contain',
        },
      ],
      [
        'expo-location',
        {
          locationWhenInUsePermission:
            "Healven a besoin de votre position pour enregistrer le tracé de votre parcours de course.",
        },
      ],
      [
        'expo-image-picker',
        {
          photosPermission: "Healven a besoin d'accéder à vos photos pour définir votre photo de profil.",
        },
      ],
      [
        'react-native-maps',
        {
          androidGoogleMapsApiKey: googleMapsApiKeyAndroid,
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 36,
            targetSdkVersion: 36,
            minSdkVersion: 24,
          },
        },
      ],
      '@react-native-community/datetimepicker',
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
