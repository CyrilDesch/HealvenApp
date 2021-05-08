import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import NavLink from '../../components/NavLink';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Spacer from '../../components/Spacer';
import { Context as AuthContext } from '../../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, removeError } = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView 
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      enableAutomaticScroll
      enableOnAndroid
      scrollEnabled={false}>
      <AuthForm 
        errorMessage={state.error} 
        headerMessage="Connexion" 
        submitText="Se connecter"
        onSubmitAuth={signin}
      />
      <Spacer />
      <NavLink
        routeName="Signup"
        text="Ou inscrivez-vous"
        cleaner={removeError}
      />
    </KeyboardAwareScrollView>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: hp(10),
  },
  changeScreenLink : {
    textAlign: 'center',
    fontSize: 15,
    color: 'dodgerblue'
  }
});

export default SigninScreen;