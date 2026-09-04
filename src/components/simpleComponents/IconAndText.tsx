import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

interface IconAndTextProps {
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  iconSize: number;
  text: string;
  style?: StyleProp<ViewStyle>;
}

const IconAndText = ({ iconName, iconSize, text, style }: IconAndTextProps) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons color="white" name={iconName} size={wp(iconSize)} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: wp(0.4),
  },
  text: {
    marginLeft: wp(1),
    color: 'white',
    fontSize: wp(3.5),
    fontFamily: 'Montserrat-Medium',
  },
});

export default IconAndText;
