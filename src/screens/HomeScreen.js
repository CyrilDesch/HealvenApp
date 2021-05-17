import React, {useContext, useCallback, useRef, useState, useEffect} from 'react';
import { Animated, View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Card from '../components/Card';
import { ScrollView } from 'react-native';
import HeaderMenu from '../components/HeaderMenu';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext'; 
import useLocation from '../hooks/useLocation';
import Spacer from '../components/Spacer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = ({ navigation }) => {
  const { addLocation, state: { recording, currentLocation } } = useContext(LocationContext);
  const callback = useCallback((location) => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation((navigation.isFocused && animation) || !currentLocation, callback);
  const insets = useSafeAreaInsets();
  const scrollView = useRef(null);
  const [animation, setAnimation] = useState(false);
  const translation = useRef(new Animated.Value(0)).current;

  const callbackMap = () => {
    if(!animation){
      setAnimation(true);
    } else {
      setAnimation(false);
    }
  }

  useEffect(() => {
    if(animation){
      scrollView.current.scrollToEnd();
    } else {
      scrollView.current.scrollTo({y: 0, });
    }
  }, [animation]);
  
  return(
    <View>
      <HeaderMenu insets={insets} />
      <Animated.ScrollView
        scrollEnabled={!animation}
        ref={scrollView}
        style={{transform: [{translateY: translation}]}}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Accueil</Text>
        <Spacer multiple={4} />
        <View style={styles.cardContainer}>
          <Card title="Card 1" />
          <Card title="Card 2" />
          <Card title="Card 3" />
          <Card title="Card 4" />
          <Card title="Card 5" />
          <Card title="Card 6" />
          <Card title="Card 7" />
        </View>
        {currentLocation ?
          <Map show={animation} />
        : null}
      </Animated.ScrollView>
      {/* Pour que le bouton soit utilisable et bien placé */}
      <Pressable style={styles.header_third_line_button} onPress={callbackMap}>
        <Text style={styles.header_third_line_button_title}>Exercice</Text>
      </Pressable>
      <StatusBar style="dark" />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(7),
    color: '#1f1f1f',
    marginLeft: wp(10),
    paddingTop: wp(72),
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap"
  },
  header_third_line_button: {
    position: "absolute",
    top: wp(56),
    left: wp(66),
    zIndex: 2,
    width: wp(24),
    height: wp(24),
    backgroundColor: '#1f1f1f',
    borderRadius: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
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
  }
});

export default HomeScreen;