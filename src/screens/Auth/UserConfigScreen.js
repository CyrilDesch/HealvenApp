import React, { useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Context as AuthContext } from '../../context/AuthContext';
import ProfileSettingForm from '../../components/ProfileSettingForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../../components/HeaderBar';

const UserConfigScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Information" />
      <ProfileSettingForm 
        imageProfile 
        name 
        dateOfBirth
        gender
      />
    </SafeAreaView>
  );
};

UserConfigScreen.navigationOptions = () => {
  return {
    title: 'Information',
    headerShown: true,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  changeScreenLink : {
    textAlign: 'center',
    fontSize: 15,
    color: 'dodgerblue'
  }
});

export default UserConfigScreen;