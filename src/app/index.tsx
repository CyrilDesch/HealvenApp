import React, { useCallback, useContext, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, type ScrollView } from 'react-native';
import { Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import HeaderMenu from '../components/HeaderMenu';
import RecordCard from '../components/RecordCard';
import ListCard from '../components/ListCard';
import Map from '../components/Map';
import Spacer from '../components/Spacer';
import { Context as UserContext } from '../context/UserContext';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';

const HomeScreen = () => {
  const { state: user } = useContext(UserContext);
  const {
    addLocation,
    state: { recording, currentLocation },
  } = useContext(LocationContext);
  const locationCallback = useCallback(
    (location: Parameters<typeof addLocation>[0]) => {
      addLocation(location, recording);
    },
    [recording],
  );
  const [animation, setAnimation] = useState(false);
  useLocation(recording || !currentLocation || animation, locationCallback);
  const scrollView = useRef<React.ComponentRef<typeof Animated.ScrollView>>(null);
  const [translation] = useState(() => new Animated.Value(0));

  if (!user.isConfigured) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View>
      <HeaderMenu />
      <Animated.ScrollView
        scrollEnabled={!animation}
        ref={scrollView}
        style={{ transform: [{ translateY: translation }] }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Accueil</Text>
        <Spacer multiple={3} />
        <View style={styles.cardsContainer}>
          <RecordCard style={styles.cardContainer} />
          <ListCard style={styles.cardContainer} />
        </View>
        {currentLocation ? (
          <Map show={animation} scrollRef={scrollView as unknown as React.RefObject<ScrollView | null>} />
        ) : null}
      </Animated.ScrollView>
      <Pressable style={styles.header_third_line_button} onPress={() => setAnimation(!animation)}>
        {animation ? (
          <Ionicons name="home" color="white" size={wp(8)} />
        ) : (
          <>
            <Text style={styles.header_third_line_button_title}>Afficher</Text>
            <Text style={styles.header_third_line_button_title}>Carte</Text>
          </>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(7),
    color: '#000000',
    marginLeft: wp(10),
    paddingTop: wp(65),
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardContainer: {
    width: wp(90),
    height: hp(30),
    marginBottom: wp(8),
    backgroundColor: '#fe9b18',
    borderRadius: wp(5),
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  header_third_line_button: {
    textAlign: 'center',
    position: 'absolute',
    top: wp(47),
    left: wp(66),
    zIndex: 2,
    width: wp(24),
    height: wp(24),
    backgroundColor: '#000000',
    borderRadius: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 8,
  },
  header_third_line_button_title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3.5),
    color: 'white',
  },
});

export default HomeScreen;
