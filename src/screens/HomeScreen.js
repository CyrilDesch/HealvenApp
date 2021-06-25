import React, {useContext, useCallback, useRef, useState, useEffect} from 'react';
import { Animated, View, Text, StyleSheet, Pressable } from 'react-native';
import RecordCard from '../components/RecordCard';
import ListCard from '../components/ListCard';
import HeaderMenu from '../components/HeaderMenu';
import Map from '../components/Map';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import Spacer from '../components/Spacer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';


const HomeScreen = ({ navigation }) => {
  const { addLocation, state: { recording, currentLocation } } = useContext(LocationContext);
  const locationCallback = useCallback((location) => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation(navigation.isFocused && recording || !currentLocation || currentLocation && currentLocation.coords.speed > 1 || animation, locationCallback);
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
        ref={scrollView}
        style={{transform: [{translateY: translation}]}}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Accueil</Text>
        <Spacer multiple={3} />
        <View style={styles.cardsContainer}>
          <RecordCard style={styles.cardContainer} />
          <ListCard style={styles.cardContainer} />
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
    </View>
  )
}


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
    flexWrap: "wrap",
    justifyContent: 'center'
  },
  cardContainer: {
    width: wp(90),
    height: hp(30),
    marginBottom: wp(8),
    backgroundColor: '#fe9b18',
    borderRadius: wp(5),
    shadowColor: "#000",
    justifyContent:'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  header_third_line_button: {
    textAlign: 'center',
    position: "absolute",
    top: wp(47),
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
  },
});

export default HomeScreen;