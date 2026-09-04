import React from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
} from 'react-native';
import generalStyles from '../../styles/generalStyles';

interface InputProps {
  style?: StyleProp<TextStyle>;
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  disable?: boolean;
  onSubmit?: () => void;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
}

const Input = ({
  style,
  label = 'default',
  value = 'Give a state text',
  onChangeText,
  secureTextEntry = false,
  error = '',
  disable = false,
  onSubmit,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: InputProps) => {
  return (
    <View>
      <Text style={generalStyles.text}>{label}</Text>
      <TextInput
        editable={!disable}
        style={[generalStyles.textInput, style, disable ? generalStyles.disable : null]}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmit}
      />
      {error !== '' ? <Text style={generalStyles.error}>{error}</Text> : null}
    </View>
  );
};

export default Input;
