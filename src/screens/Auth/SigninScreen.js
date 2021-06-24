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
    extraScrollHeight={hp(3)}
    enableAutomaticScroll
    enableOnAndroid>
      <AuthForm 
        errorMessage={state.error} 
        headerMessage="CONNEXION" 
        submitText="Se connecter"
        onSubmitAuth={signin}
        cleaner={removeError}
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

const styles = StyleSheet.create({
  container: {
    height: hp(100),
    backgroundColor: '#fe9b18',
    paddingTop: hp(10)
  },
});

export default SigninScreen;