import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Input from '../components/simpleComponents/Input';
import Spacer from './Spacer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from "react-native-expo-image-cache";
import { token, baseURL } from '../api/tracker';
import generalStyles from '../generalStyles';

const ProfileSettingForm = ({ imageProfile, name, dateOfBirth, gender, email, password }) => {

  const imageProfileView =
    <View>
      {token !== '' ? <Image style={styles.imageProfile} resizeMode="contain" {...{uri: baseURL + '/image?id=' + '1619803735074-bezkoder-unnamed.png' + `&token=${token}`, options: {method: 'GET'}}} /> : null }
      <View style={styles.iconCameraContainer}>
        <Icon name="camera" size={wp(5)} color="#8598f9" />
      </View>
    </View>;

  const dateOfBirthView =
    <View>
      <Text>Test3</Text>
    </View>;

  const genderView =
    <View>
      <Text>Test4</Text>
    </View>;

  const emailView =
    <View>
      <Text>Test5</Text>
    </View>;

  const passwordView =
    <View>
      <Text>Test6</Text>
    </View>;
  
  return (
    <View style={styles.container}>
      <Spacer multiple={4}>
        {imageProfile ? imageProfileView : null}
      </Spacer>
      <Spacer multiple={3} />
        {name ? <Input style={generalStyles.input} label="Nom" value="Cyril Deschamps" /> : null}
      <Spacer />
        {dateOfBirth ? <Input style={generalStyles.input} label="Date de naissance" value="19/06/2002" /> : null}
      <Spacer />
        {gender ? <Input style={generalStyles.input} label="Genre" value="Homme" /> : null}
      <Spacer />
        {email ? emailView : null}
      <Spacer/>
        {password ? passwordView : null}
      <Spacer />
        <Button title="Valider" />
    </View>
  );
};

ProfileSettingForm.defaultProps = {
  imageProfile: false,
  name: false,
  dateOfBirth: false,
  gender: false,
  email: false,
  password: false
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'red'
  },
  logo: {
    width: wp(40),
    height: wp(40),
    alignSelf: 'center',
  },
  imageProfile: {
    width: wp(25), 
    height: wp(25), 
    borderRadius: wp(3),
    borderColor: 'white',
    borderWidth: wp(0.2),
    backgroundColor: '#d9dffc',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  iconCameraContainer: {
    position: 'absolute',
    right: -wp(3.5),
    bottom: -wp(3.5),
    padding: wp(1.5),
    backgroundColor: '#d9dffc',
    borderRadius: wp(2),
    borderColor: 'white',
    borderWidth: wp(0.6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
});

export default ProfileSettingForm;