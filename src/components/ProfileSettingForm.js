import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import Input from '../components/simpleComponents/Input';
import Spacer from './Spacer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import generalStyles from '../generalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChangeImageProfile from './formComponent/ChangeImageProfile';
import DatePicker from './formComponent/DatePicker';
import GenderSelector from './formComponent/GenderSelector';
import { Context as UserContext } from '../context/UserContext';

const ProfileSettingForm = ({ showImage, showName, showDate, showGender, callback }) => {
  const { state, updateUser } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(state.name);
  const [date, setDate] = useState(state.dateOfBirth);
  const [gender, setGender] = useState(state.gender);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      enableAutomaticScroll
      enableOnAndroid
      scrollEnabled={false}>
      <Spacer multiple={3}/>

      {showImage ?
        <>
          <ChangeImageProfile defaultImageId={state.idProfilImage} image={image} setImage={setImage} /> 
          <Spacer multiple={3} />
        </>
      : null}

      {showName ?
        <>
          <Input style={generalStyles.input} label="Nom" value={name} onChangeText={setName} /> 
          <Spacer multiple={1.5}/>
        </>
      : null}

      {showDate ? 
        <>
          <DatePicker label="Date de naissance" date={date} setDate={setDate} />
          <Spacer multiple={1.5}/>
        </>
      : null}
      
      {showGender ? 
        <>
          <GenderSelector gender={gender} setGender={setGender} />
          <Spacer multiple={1.5}/>
        </>
      : null}

      <Spacer multiple={2} />
      <Pressable style={styles.buttonSubmit} onPress={async() => {
        await updateUser({name, dateOfBirth: date, gender, idProfilImage: image});
        callback();
      }}>
        <Text style={styles.textSubmit}>Valider</Text>
      </Pressable>
      <Spacer multiple={3} />
    </KeyboardAwareScrollView>
  );
};

ProfileSettingForm.defaultProps = {
  showImage: false,
  showName: false,
  showDate: false,
  showGender: false
};

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    alignItems: 'center',
  },
  buttonSubmit: {
    paddingVertical: wp(4),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    borderWidth: 1,
    backgroundColor: '#13385e',
  },
  textSubmit: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
});

export default ProfileSettingForm;