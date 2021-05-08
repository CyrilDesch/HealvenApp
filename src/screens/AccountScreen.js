import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text } from 'react-native'; 
import Spacer from '../components/Spacer';
import generalStyles from '../generalStyles';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as UserContext } from '../context/UserContext';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  const { state } = useContext(UserContext);
  return (
    <SafeAreaView>
      <Spacer>
        <Text style={generalStyles.screenTitle}>Votre compte</Text>
      </Spacer>
      <Spacer>
        <Text style={generalStyles.text}>Votre nom: {state.name}</Text>
      </Spacer>
      <Spacer>
        <Text style={generalStyles.text}>Votre genre: {state.gender}</Text>
      </Spacer>
      <Spacer>
        <Text style={generalStyles.text}>Votre email: {state.email}</Text>
      </Spacer>
      <Spacer>
        <Text style={generalStyles.text}>Votre date de naissance: {state.dateOfBirth ? state.dateOfBirth.toLocaleDateString() : null}</Text>
      </Spacer>
      <Spacer>
        <Button title="Se déconnecter" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;