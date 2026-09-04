import React from 'react';
import { Animated, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

interface CounterProps {
  style?: StyleProp<ViewStyle>;
  animValue: Animated.Value;
  text: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
}

const Counter = ({ style, animValue, text, iconName }: CounterProps) => {
  const spin = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View style={style}>
      <AnimatedSvg
        style={[styles.circleRotating, { transform: [{ rotate: spin }] }]}
        origin={[200, 200]}
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <Circle
          stroke="#ffffffb3"
          cx="200"
          cy="200"
          r="175"
          strokeDasharray="274"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      </AnimatedSvg>
      <Ionicons name={iconName} color="white" size={wp(8)} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circleRotating: {
    width: wp(30),
    height: wp(30),
    position: 'absolute',
  },
  text: {
    padding: wp(1),
    paddingVertical: wp(2),
    color: 'white',
    fontSize: wp(3.5),
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default Counter;
