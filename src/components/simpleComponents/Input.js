import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Input = ({ style, label, value, onChangeText, secureTextEntry }) => {
  return(
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={[styles.textInput, style]} 
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

Input.defaultProps = {
  style: {},
  label: 'default',
  value: 'Give a state text',
  secureTextEntry: false,
  onChangeText: () => console.log('default'),
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(4),
    marginBottom: hp(1),
    color: '#4e6a86',
  },
  textInput: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(4.5),
    paddingVertical: wp(4),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: 'gray',
    color: '#13385e',
    backgroundColor: '#f1f3fd',
  }
});

export default Input;

