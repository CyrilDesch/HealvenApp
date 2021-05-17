import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Card = ({title}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(38),
    height: hp(30),
    marginBottom: wp(10),
    marginLeft: wp(8),
    backgroundColor: '#1f1f1f',
    borderRadius: wp(5),
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(5),
    color: 'white',
    marginBottom: hp(5)
  }
});

export default Card;