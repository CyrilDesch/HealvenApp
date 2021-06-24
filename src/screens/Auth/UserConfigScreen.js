import React from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ProfileSettingForm from '../../components/ProfileSettingForm';
import HeaderBarConfigUser from '../../components/HeaderBarConfigUser';
import { ScrollView } from 'react-native-gesture-handler';

const UserConfigScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderBarConfigUser title="Information" />
        <ProfileSettingForm
          showWeight
          showImage
          showName
          showDate
          showGender
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fe9b18'
  },
});

export default UserConfigScreen;