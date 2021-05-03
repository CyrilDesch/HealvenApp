import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { Context as AuthContext } from '../../context/AuthContext';
import NavLink from '../../components/NavLink';

const SigninScreen = () => {
  const { state, signin, removeError } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm 
        errorMessage={state.error} 
        headerMessage="Connexion" 
        submitText="Se connecter"
        onSubmitAuth={signin}
      />
      <NavLink
        routeName="Signup"
        text="Ou inscrivez-vous"
        cleaner={removeError}
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50
  },
  changeScreenLink : {
    textAlign: 'center',
    fontSize: 15,
    color: 'dodgerblue'
  }
});

export default SigninScreen;