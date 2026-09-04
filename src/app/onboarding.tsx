import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBarConfigUser from '../components/HeaderBarConfigUser';
import ProfileSettingForm from '../components/ProfileSettingForm';

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderBarConfigUser title="Information" />
        <ProfileSettingForm showWeight showImage showName showDate showGender />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fe9b18',
  },
});

export default OnboardingScreen;
