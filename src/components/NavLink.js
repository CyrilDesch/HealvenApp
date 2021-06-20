import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import generalStyles from '../generalStyles';
import { useNavigation } from '@react-navigation/native';

const NavLink = ({ routeName, text, cleaner }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate(routeName);
      if (cleaner) {
        cleaner();
      }}
    }>
      <Text style={generalStyles.clickableText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default NavLink;