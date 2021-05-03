import React, { useState, useContext } from 'react';
import { TextInput, Button, StyleSheet, Text } from 'react-native';
import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
  const { state: { recording, locations, name }, startRecording, stopRecording, changeName } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Text style={styles.text}>Nom de l'enregistrement</Text>
        <TextInput
          style={styles.textInput} 
          placeholder="Entrer un nom" 
          value={name}
          onChangeText={changeName}
        />
      </Spacer>
      <Spacer>
        {recording ? (
          <Button title="Arrêter" onPress={stopRecording} />
        ) : (
          <Button title="Enregistrer" onPress={startRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button title="Sauvegarder" onPress={saveTrack} />
        ) : null}
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    paddingVertical: 5,
    marginHorizontal: 20,
    borderBottomWidth: 0.2,
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default TrackForm;