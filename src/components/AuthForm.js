import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import generalStyles from '../generalStyles';
import Spacer from './Spacer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Input from './simpleComponents/Input';
import { Context as UserContext } from '../context/UserContext';
import SubmitButton from './formComponent/SubmitButton';

const AuthForm = ({ errorMessage, headerMessage, submitText, onSubmitAuth, cleaner }) => {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [insubmit, setInSubmit] = useState(false);
  const { saveUser } = useContext(UserContext);

  useEffect(() => {
    if(errorMessage)
      setInSubmit(false);
  }, [errorMessage])

  const handleSubmit = () => {
    cleaner();
    setInSubmit(true);
    onSubmitAuth({pseudo, password, saveUser});
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.logo} resizeMode="contain" source={require('../../assets/logo.png')} />
      <Spacer />
      <Text style={generalStyles.screenTitle}>{headerMessage}</Text>
      <View style={styles.bar} />
      <Spacer multiple={3} />
      <Input
        disable={insubmit}
        style={generalStyles.input}
        label="Pseudo" 
        value={pseudo} 
        onChangeText={setPseudo} 
      />
      <Spacer />
      <Input
        disable={insubmit}
        style={generalStyles.input}
        secureTextEntry
        label="Mot de passe" 
        value={password}
        onSubmit={handleSubmit}
        onChangeText={setPassword}
      />
      {errorMessage ? <Text style={generalStyles.error}>{errorMessage}</Text> : null}
      <Spacer multiple={3}>
        <SubmitButton onSubmit={handleSubmit} submitText={submitText} isInSubmit={insubmit} />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logo: {
    width: wp(40),
    height: wp(40),
    alignSelf: 'center',
  },
  bar: {
    width: wp(40),
    marginTop: wp(1),
    borderBottomColor: 'black',
    borderBottomWidth: wp(0.3)
  },
  button: {
    backgroundColor: "black",
    borderRadius: wp(5)
  },
  text: {
    color: "white",
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(4.5),
    textAlign: 'center',
    padding: wp(4),
  },
  inline: {
    flexDirection: 'row'
  }, 
  empty: {
    width: wp(10),
    paddingLeft: wp(10),
    height: wp(15),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AuthForm;