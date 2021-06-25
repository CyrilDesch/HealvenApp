import React, { useContext, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';
import Input from '../components/simpleComponents/Input';
import Spacer from './Spacer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import generalStyles from '../generalStyles';
import ChangeImageProfile from './formComponent/ChangeImageProfile';
import DatePicker from './formComponent/DatePicker';
import ButtonSelector from './formComponent/ButtonSelector';
import { Context as UserContext } from '../context/UserContext';
import { Context as AuthContext } from '../context/AuthContext';
import SubmitButton from './formComponent/SubmitButton';

const ProfileSettingForm = ({ showImage, showName, showDate, showGender, showWeight }) => {
  const { validUser } = useContext(AuthContext);
  const { state, updateUser } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(state.name);
  const [errorName, setErrorName] = useState('');
  const [date, setDate] = useState(state.dateOfBirth);
  const [errorDate, setErrorDate] = useState('');
  const [weight, setWeight] = useState(state.poids);
  const [errorWeight, setErrorWeight] = useState('');
  const [gender, setGender] = useState(state.gender);
  const [errorGender, setErrorGender] = useState('');
  const [inSubmit, setInSubmit] = useState(false);

  const validForm = () => {
    let valid = true;
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
    if(!weight && weight > 30 && weight < 200){
      setErrorWeight("Veuillez entrez un poids valide");
      valid = false;
    } else {
      setErrorWeight('');
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
    <KeyboardAvoidingView style={styles.container}>
      <Spacer />
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
            label="Prénom / Nom" 
            autoCapitalize="words"
            value={name} 
            onChangeText={setName} 
            error={errorName}
          /> 
          <Spacer multiple={1.5}/>
        </>
      : null}

      {showWeight ?
        <>
          <Input 
            disable={inSubmit} 
            style={generalStyles.input} 
            label="Poids (kg)"
            keyboardType="number-pad"
            value={weight} 
            onChangeText={setWeight} 
            error={errorWeight}
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
      <SubmitButton
        isInSubmit={inSubmit}
        onSubmit={async() => {
          if(validForm()){
            setInSubmit(true);
            try {
              await updateUser({name, dateOfBirth: date, gender, idProfilImage: image, poids: weight});
              validUser();
            } catch {
              setInSubmit(false);
            }
          }
        }}
        submitText="Valider"
      />
      <Spacer multiple={3} />
    </KeyboardAvoidingView>
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
    alignItems: 'center',
  },
  buttonSubmit: {
    paddingVertical: wp(4),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    borderWidth: 1,
    backgroundColor: '#fe9b18',
  },
  textSubmit: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
    color: 'white',
  },
});

export default ProfileSettingForm;