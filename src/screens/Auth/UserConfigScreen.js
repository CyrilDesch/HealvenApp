import React from 'react';
import { StyleSheet } from 'react-native';
import ProfileSettingForm from '../../components/ProfileSettingForm';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderBar from '../../components/HeaderBar';
import { ScrollView } from 'react-native-gesture-handler';

const UserConfigScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <HeaderBar title="Information" />
        <ProfileSettingForm  
           showImage
           showName
           showDate
           showGender
           callback={() => navigation.navigate('TrackList')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

UserConfigScreen.navigationOptions = () => {
  return {
    headerShown: false,
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