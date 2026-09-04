import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface HeaderBarConfigUserProps {
  title: string;
  onPressBack?: boolean;
}

const HeaderBarConfigUser = ({ title, onPressBack }: HeaderBarConfigUserProps) => {
  return (
    <View style={styles.container}>
      {onPressBack ? <AntDesign style={styles.icon} name="arrow-left" size={wp(8)} color="#002851" /> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

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
    textAlign: 'center',
  },
  icon: {
    marginTop: 4,
    marginLeft: wp(5),
  },
});

export default HeaderBarConfigUser;
