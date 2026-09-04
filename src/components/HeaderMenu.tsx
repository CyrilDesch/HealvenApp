import React, { useContext } from 'react';
import { Image as RNImage, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Context as UserContext } from '../context/UserContext';
import { Context as TrackContext } from '../context/TrackContext';
import Spacer from './Spacer';

const HeaderMenu = () => {
  const { state: user } = useContext(UserContext);
  const { state: tracks } = useContext(TrackContext);

  return (
    <View style={styles.container}>
      <Svg style={styles.svp_path} pointerEvents="none">
        <Path
          d="M 0 0 H 13 v 7.6 Q 12.2 7.7 12.2 8.6 C 11.9 11.6 8.4 11.4 8.1 8.7 Q 7.9 7.7 6.7 7.7 H 2 Q 0 7.6 0 5 V 0"
          fill="white"
          scale={wp(100) / 13}
        />
      </Svg>
      <Spacer multiple={2} />
      <View style={styles.header_first_line_container}>
        {user.idProfilImage ? (
          <Image style={styles.profilImage} contentFit="contain" source={{ uri: user.idProfilImage }} />
        ) : (
          <RNImage style={styles.profilImage} source={require('../../assets/images/default_profile_pic.png')} />
        )}
        <View style={styles.header_first_line_text_container}>
          <Text style={styles.header_first_line_text_title1}>Bonjour</Text>
          <Text style={styles.header_first_line_text_title2}>{user.name}</Text>
        </View>
      </View>
      <View style={styles.header_second_line_container}>
        <View style={styles.header_second_line_walk_count}>
          <Ionicons color="white" size={wp(5)} name={user.gender === 'homme' ? 'man' : 'woman'} />
          <Text style={styles.header_second_line_walk_count_title1}>{user.poids}</Text>
          <Text style={styles.header_second_line_walk_count_title2}>kg</Text>
        </View>
        <View style={styles.header_second_line_text_container}>
          <Text style={styles.header_second_line_text_title}>
            {tracks.length > 0 ? 'Dernière course: ' : ''}
            <Text style={styles.bold}>
              {tracks.length > 0 ? new Date(tracks[0].date).toLocaleDateString() : "A l'entrainement !"}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
  },
  svp_path: {
    width: wp(100),
    height: hp(100),
    top: -hp(5),
    position: 'absolute',
  },
  header_first_line_container: {
    width: wp(100),
    height: wp(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(7),
    backgroundColor: '#4e6a86',
    marginLeft: wp(6),
  },
  header_first_line_text_container: {
    width: wp(69),
    marginLeft: wp(3.5),
    marginTop: wp(1),
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
    flexDirection: 'row',
  },
  header_second_line_walk_count: {
    marginLeft: wp(5),
    marginTop: wp(1),
    width: wp(20),
    height: wp(20),
    backgroundColor: '#fe9b18',
    borderRadius: wp(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  header_second_line_walk_count_title1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: wp(4),
    color: 'white',
  },
  header_second_line_walk_count_title2: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(3.5),
    color: 'white',
  },
  header_second_line_text_container: {
    marginTop: wp(1),
    marginLeft: wp(5),
    height: wp(20),
    justifyContent: 'center',
  },
  header_second_line_text_title: {
    padding: wp(0.5),
    fontFamily: 'Montserrat-Regular',
    fontSize: wp(4),
    color: 'black',
  },
  bold: {
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default HeaderMenu;
