import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text } from 'react-native'; 
import Spacer from '../components/Spacer';
import generalStyles from '../generalStyles';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Spacer>
        <Text style={generalStyles.screenTitle}>Votre compte</Text>
      </Spacer>
      <Spacer>
        <Button title="Se déconnecter" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AccountScreen;