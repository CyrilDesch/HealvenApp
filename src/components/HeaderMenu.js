import React, { useContext } from 'react';
import { Context as UserContext } from '../context/UserContext';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image as CacheImage } from 'react-native-expo-image-cache';
import { token, baseURL } from '../api/tracker';
import {default as IconMaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {default as IconFontAwesome5} from 'react-native-vector-icons/FontAwesome5';
import Spacer from './Spacer';
import { useNavigation } from '@react-navigation/native';

const HeaderMenu = () => {
  const { state } = useContext(UserContext);
  const navigation = useNavigation();
  const metre = 10;
  return(
    <View style={styles.container}>
      <Svg style={styles.svp_path}>
        <Path
          d="M 0 0 H 13 v 7.6 Q 12.2 7.7 12.2 8.6 C 11.9 11.6 8.4 11.4 8.1 8.7 Q 7.9 7.7 6.7 7.7 H 3 Q 0 7.6 0 4.6 V 0"
          fill="white"
          scale={wp(100)/13}
        />
      </Svg>
      <Spacer multiple={2} />
      <View style={styles.header_first_line_container}>
        {state.idProfilImage != "" ?
          <CacheImage
            style={styles.profilImage} 
            resizeMode="contain"
            {...{uri: baseURL + '/image?id=' + state.idProfilImage + `&token=${token}`, options: {method: 'GET'}}} />
        :
          <Image style={styles.profilImage} source={require('../../assets/default_profile_pic.png')} /> 
        }
        <View style={styles.header_first_line_text_container}>
          <Text style={styles.header_first_line_text_title1}>Bonjour</Text>
          <Text style={styles.header_first_line_text_title2}>{state.name}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Account')}>
          <IconMaterialIcons size={wp(9)} style={styles.header_first_line_icon} name="blur-on" />
        </Pressable>
      </View>
      <View style={styles.header_second_line_container}>
        <View style={styles.header_second_line_walk_count}>
          <IconFontAwesome5 color="white" size={wp(5)} style={styles.header_second_line_walk_count_icon} name="walking" />
          <Text style={styles.header_second_line_walk_count_title1}>{metre}</Text>
          <Text style={styles.header_second_line_walk_count_title2}>{metre > 1 ? "mètres" : "mètre"}</Text>
        </View>
        <View style={styles.header_second_line_text_container}>
          <Text style={styles.header_second_line_text_title}>Vitesse actuelle:  <Text style={styles.bold}>14.5 km/h</Text></Text>
          <Text style={styles.header_second_line_text_title}>Vitesse moyenne:  <Text style={styles.bold}>16.8 km/h</Text></Text>
          <Text style={styles.header_second_line_text_title}>Calories brûlés:  <Text style={styles.bold}>150 kcal</Text></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1
  },
  svp_path: {
    width: wp(100), 
    height: hp(100),
    position: 'absolute'
  },
  header_first_line_container: {
    width: wp(100), 
    height: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilImage : {
    width: wp(12), 
    height: wp(12),
    borderRadius: wp(7),
    backgroundColor: '#4e6a86',
    marginLeft: wp(6)
  },
  header_first_line_text_container: {
    width: wp(64),
    marginLeft: wp(3.5),
    marginTop: wp(1)
  },
  header_first_line_text_title1: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp(3),
    color: 'gray',
  },
  header_first_line_text_title2: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp(4.25),
    color: 'black',
  },
  header_second_line_container: {
    height: wp(30),
    flexDirection: 'row',
  },
  header_second_line_walk_count: {
    marginLeft: wp(5.5),
    marginTop: wp(2),
    width: wp(28),
    height: wp(28),
    backgroundColor: '#fe9b18',
    borderRadius: wp(14),
    justifyContent: 'center',
    alignItems: 'center'
  },
  header_second_line_walk_count_title1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(5),
    color: 'white',
  },
  header_second_line_walk_count_title2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3.5),
    color: 'white',
  },
  header_second_line_text_container: {
    marginTop: wp(1.2),
    marginLeft: wp(5),
    height: wp(28),
    justifyContent: 'center',
  },
  header_second_line_text_title: {
    padding: wp(0.5),
    fontFamily: 'Montserrat-Regular',
    fontSize: wp(4),
    color: 'black',
  },
  bold: {
    fontFamily: 'Montserrat-SemiBold'
  }
});

export default HeaderMenu;