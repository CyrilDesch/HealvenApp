import React, { useContext, useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import Input from '../components/simpleComponents/Input';
import Spacer from './Spacer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import generalStyles from '../generalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ChangeImageProfile from './formComponent/ChangeImageProfile';
import DatePicker from './formComponent/DatePicker';
import ButtonSelector from './formComponent/ButtonSelector';
import { Context as UserContext } from '../context/UserContext';

const ProfileSettingForm = ({ showImage, showName, showDate, showGender, callback }) => {
  const { state, updateUser } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(state.name);
  const [errorName, setErrorName] = useState('');
  const [date, setDate] = useState(state.dateOfBirth);
  const [errorDate, setErrorDate] = useState('');
  const [gender, setGender] = useState(state.gender);
  const [errorGender, setErrorGender] = useState('');
  const [inSubmit, setInSubmit] = useState(false);

  const validForm = () => {
    valid = true;
    if(name.length < 4){
      setErrorName("Entrez un nom d'au moins 4 caractères");
      valid = false;
    } else {
      setErrorName('');
    }
    if(!date){
      setErrorDate("Veuillez sélectionner une date");
      valid = false;
    } else {
      setErrorDate('');
    }
    if(gender == ''){
      setErrorGender("Veuillez sélectionner un genre");
      valid = false;
    } else {
      setErrorGender('');
    }

    return valid;
  }

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
          <ChangeImageProfile 
            disable={inSubmit} 
            defaultImageId={state.idProfilImage} 
            image={image} 
            setImage={setImage} 
          /> 
          <Spacer multiple={3} />
        </>
      : null}

      {showName ?
        <>
          <Input 
            disable={inSubmit} 
            style={generalStyles.input} 
            label="Nom" 
            value={name} 
            onChangeText={setName} 
            error={errorName}
          /> 
          <Spacer multiple={1.5}/>
        </>
      : null}

      {showDate ? 
        <>
          <DatePicker
            disable={inSubmit}
            label="Date de naissance" 
            date={date} 
            setDate={setDate} 
            error={errorDate} 
          />
          <Spacer multiple={1.5}/>
        </>
      : null}
      
      {showGender ? 
        <>
          <ButtonSelector
            disable={inSubmit}
            label="Genre de naissance"
            value={['homme', 'femme']}
            text={['Homme', 'Femme']}
            state={gender} 
            setState={setGender} 
            error={errorGender} 
          />
          <Spacer multiple={1.5}/>
        </>
      : null}

      <Spacer multiple={2} />
      <Pressable style={styles.buttonSubmit} onPress={async() => {
        if(validForm()){
          setInSubmit(true);
          try {
            await updateUser({name, dateOfBirth: date, gender, idProfilImage: image});
            callback();
          } catch {
            setInSubmit(false);
          }
        }
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