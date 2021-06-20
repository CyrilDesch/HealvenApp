import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Counter = ({ style, animValue, text, iconName }) => {
  return(
    <View style={style}>
      <AnimatedSvg rotation={animValue} origin={[200, 200]} style={styles.circleRotating} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
        <Circle
          stroke="#ffffffb3" cx="200" cy="200" r="175" strokeDasharray="274" strokeWidth="10" strokeLinecap="round" fill="none" 
        />
      </AnimatedSvg>
      <Icon name={iconName} color="white" size={wp(8)} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circleRotating: {
    width: wp(30),
    height: wp(30),
    position: 'absolute'
  },
  text: {
    padding: wp(1),
    paddingVertical: wp(2),
    color: "white",
    fontSize: wp(3.5),
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
  }
});

export default Counter;