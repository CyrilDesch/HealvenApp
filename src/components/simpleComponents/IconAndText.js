import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const IconAndText = ({ iconName, iconSize, text, style }) => {
  return(
    <View style={[styles.container, style]}>
      <Icon color="white" name={iconName} size={wp(iconSize)} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: wp(0.4)
  },
  text: {
    marginLeft: wp(1),
    color: 'white',
    fontSize: wp(3.5),
    fontFamily: 'Montserrat-Medium',
  }
});

export default IconAndText;