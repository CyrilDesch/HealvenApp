import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

const HeaderBarConfigUser = ({ title, onPressBack }) => {

  return(
    <View style={styles.container}>
      {onPressBack ? <Icon style={styles.icon} name="arrowleft" size={wp(8)} color="#002851" /> : null }
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: wp(5),
    height: hp(9),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    fontSize: wp(6),
    width: wp(100),
    color: 'black',
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center'
  },
  icon: {
    marginTop: 4,
    marginLeft: wp(5),
  }
});

export default HeaderBarConfigUser;