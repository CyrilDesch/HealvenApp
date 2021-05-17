import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileSettingForm from '../../components/ProfileSettingForm';
import HeaderBar from '../../components/HeaderBar';
import { ScrollView } from 'react-native-gesture-handler';

const UserConfigScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderBar title="Information" />
        <ProfileSettingForm  
           showImage
           showName
           showDate
           showGender
           callback={() => navigation.navigate('Home')}
        />
      </ScrollView>
    </View>
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