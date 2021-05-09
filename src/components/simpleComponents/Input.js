import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import generalStyles from '../../generalStyles';

const Input = ({ style, label, value, onChangeText, secureTextEntry, error, disable }) => {
  return(
    <View>
      <Text style={generalStyles.text}>{label}</Text>
      <TextInput
        editable={!disable}
        style={[generalStyles.textInput, style, disable ? generalStyles.disable : null]} 
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
      />
      {error != "" ? <Text style={generalStyles.error}>{error}</Text> : null}
    </View>
  );
}

Input.defaultProps = {
  style: {},
  label: 'default',
  value: 'Give a state text',
  secureTextEntry: false,
  onChangeText: () => console.log('default'),
  error: '',
  disable: false,
};

export default Input;

