import React, {useContext, useCallback, useRef, useState, useEffect} from 'react';
import { Animated, View, Text, StyleSheet, Pressable } from 'react-native';
import RecordCard from '../components/RecordCard';
import HeaderMenu from '../components/HeaderMenu';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import Spacer from '../components/Spacer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const { addLocation, state: { recording, currentLocation } } = useContext(LocationContext);
  const locationCallback = useCallback((location) => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation(navigation.isFocused || currentLocation.coords.speed !== 0, locationCallback);
  const scrollView = useRef(null);
  const [animation, setAnimation] = useState(false);
  const translation = useRef(new Animated.Value(0)).current;

  const callbackMap = () => {
    if(!animation) {
      setAnimation(true);
    } else {
      setAnimation(false);
    }
  }

  useEffect(() => {
    if(animation){
      scrollView.current.scrollToEnd();
    } else {
      scrollView.current.scrollTo({y: 0});
    }
  }, [animation]);
  
  return(
    <View>
      <HeaderMenu />
      <Animated.ScrollView
        scrollEnabled={!animation}
        ref={scrollView}s
        style={{transform: [{translateY: translation}]}}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Accueil</Text>
        <Spacer multiple={4} />
        <View style={styles.cardContainer}>
          <RecordCard title="Card 1" />
          <RecordCard title="Card 2" />
        </View>
        {currentLocation ?
          <Map show={animation} />
        : null}
      </Animated.ScrollView>
      <Pressable style={styles.header_third_line_button} onPress={callbackMap}>
        {/* Bouton header ici pour bonne affichage*/}
        {animation ? 
          <Icon name="home" color="white" size={wp(8)} />
        :
          <>
            <Text style={styles.header_third_line_button_title}>Afficher</Text>
            <Text style={styles.header_third_line_button_title}>Carte</Text>
          </>
        }  
      </Pressable>
      <StatusBar style="dark" />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(7),
    color: '#000000',
    marginLeft: wp(10),
    paddingTop: wp(72),
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'center'
  },
  header_third_line_button: {
    textAlign: 'center',
    position: "absolute",
    top: wp(56),
    left: wp(66),
    zIndex: 2,
    width: wp(24),
    height: wp(24),
    backgroundColor: '#000000',
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