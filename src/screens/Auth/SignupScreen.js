import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import NavLink from '../../components/NavLink';
import { Context as AuthContext } from '../../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const {state, signup, removeError} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm 
        errorMessage={state.error} 
        headerMessage="INSCRIPTION"
        submitText="S'inscrire"
        onSubmitAuth={signup} 
      />
      <NavLink
        routeName="Signin"
        text="Ou connectez-vous"
        cleaner={removeError}
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50
  }
});

export default SignupScreen;