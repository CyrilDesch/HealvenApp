import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import generalStyles from '../generalStyles';

const NavLink = ({ navigation, routeName, text, cleaner }) => {
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

export default withNavigation(NavLink);