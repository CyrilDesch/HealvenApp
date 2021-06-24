import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AuthForm from '../../components/AuthForm';
import NavLink from '../../components/NavLink';
import { Context as AuthContext } from '../../context/AuthContext';

const SignupScreen = () => {
  const {state, signup, removeError} = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={hp(3)}
      enableAutomaticScroll
      enableOnAndroid>
      <AuthForm 
        errorMessage={state.error} 
        headerMessage="INSCRIPTION"
        submitText="S'inscrire"
        onSubmitAuth={signup} 
        cleaner={removeError}
      />
      <NavLink
        routeName="Signin"
        text="Ou connectez-vous"
        cleaner={removeError}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: '#fe9b18',
    paddingTop: hp(10)
  }
});

export default SignupScreen;