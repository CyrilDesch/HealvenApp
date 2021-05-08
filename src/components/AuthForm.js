import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Button } from 'react-native';
import generalStyles from '../generalStyles';
import Spacer from './Spacer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Input from './simpleComponents/Input';
import { Context as UserContext } from '../context/UserContext';

const AuthForm = ({ errorMessage, headerMessage, submitText, onSubmitAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { saveUser } = useContext(UserContext);
  
  return (
    <View style={styles.container}>
      <Image style={styles.logo} resizeMode="contain" source={require('../../assets/logo.png')} />
      <Spacer />
      <Text style={generalStyles.screenTitle}>{headerMessage}</Text>
      <Spacer multiple={3} />
      <Input
        style={generalStyles.input}
        label="Email" 
        value={email} 
        onChangeText={setEmail} 
      />
      <Spacer />
      <Input
        style={generalStyles.input}
        secureTextEntry
        label="Mot de passe" 
        value={password} 
        onChangeText={setPassword}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <Spacer>
        <Button title={submitText} onPress={() => onSubmitAuth({email, password, saveUser})} />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  },
  logo: {
    width: wp(40),
    height: wp(40),
    alignSelf: 'center',
  }
});

export default AuthForm;