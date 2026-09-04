import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Input from './simpleComponents/Input';
import Spacer from './Spacer';
import ChangeImageProfile from './formComponent/ChangeImageProfile';
import DatePicker from './formComponent/DatePicker';
import ButtonSelector from './formComponent/ButtonSelector';
import SubmitButton from './formComponent/SubmitButton';
import { Context as UserContext, type Gender } from '../context/UserContext';
import generalStyles from '../styles/generalStyles';

interface ProfileSettingFormProps {
  showImage?: boolean;
  showName?: boolean;
  showDate?: boolean;
  showGender?: boolean;
  showWeight?: boolean;
}

const ProfileSettingForm = ({
  showImage = false,
  showName = false,
  showDate = false,
  showGender = false,
  showWeight = false,
}: ProfileSettingFormProps) => {
  const router = useRouter();
  const { state, saveUser } = useContext(UserContext);
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState(state.name);
  const [errorName, setErrorName] = useState('');
  const [date, setDate] = useState<Date | null>(state.dateOfBirth);
  const [errorDate, setErrorDate] = useState('');
  const [weight, setWeight] = useState(state.poids);
  const [errorWeight, setErrorWeight] = useState('');
  const [gender, setGender] = useState(state.gender);
  const [errorGender, setErrorGender] = useState('');
  const [inSubmit, setInSubmit] = useState(false);

  const validForm = () => {
    let valid = true;
    if (name.length < 4) {
      setErrorName("Entrez un nom d'au moins 4 caractères");
      valid = false;
    } else {
      setErrorName('');
    }
    if (!date) {
      setErrorDate('Veuillez sélectionner une date');
      valid = false;
    } else {
      setErrorDate('');
    }
    if (!weight && Number(weight) > 30 && Number(weight) < 200) {
      setErrorWeight('Veuillez entrez un poids valide');
      valid = false;
    } else {
      setErrorWeight('');
    }
    if (gender === '') {
      setErrorGender('Veuillez sélectionner un genre');
      valid = false;
    } else {
      setErrorGender('');
    }
    return valid;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Spacer />
      {showImage ? (
        <>
          <ChangeImageProfile disable={inSubmit} defaultImageId={state.idProfilImage} image={image} setImage={setImage} />
          <Spacer multiple={3} />
        </>
      ) : null}

      {showName ? (
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
          <Spacer multiple={1.5} />
        </>
      ) : null}

      {showWeight ? (
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
          <Spacer multiple={1.5} />
        </>
      ) : null}

      {showDate ? (
        <>
          <DatePicker disable={inSubmit} label="Date de naissance" date={date} setDate={setDate} error={errorDate} />
          <Spacer multiple={1.5} />
        </>
      ) : null}

      {showGender ? (
        <>
          <ButtonSelector
            disable={inSubmit}
            label="Genre de naissance"
            value={['homme', 'femme']}
            text={['Homme', 'Femme']}
            state={gender}
            setState={(value) => setGender(value as Gender)}
            error={errorGender}
          />
          <Spacer multiple={1.5} />
        </>
      ) : null}

      <Spacer multiple={2} />
      <SubmitButton
        isInSubmit={inSubmit}
        onSubmit={async () => {
          if (validForm()) {
            setInSubmit(true);
            try {
              await saveUser({ name, dateOfBirth: date, gender, idProfilImage: image ?? '', poids: weight });
              router.replace('/');
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default ProfileSettingForm;
