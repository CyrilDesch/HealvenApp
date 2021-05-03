import React, { useContext, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, StyleSheet } from 'react-native';
import Spacer from '../components/Spacer';
import generalStyles from '../generalStyles';
import Map from '../components/Map';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context as LocationContext } from '../context/LocationContext'; 
import useLocation from '../hooks/useLocation';
import { withNavigationFocus } from 'react-navigation';
import TrackForm from '../components/TrackForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const TrackCreateScreen = ({ isFocused }) => {
  const { addLocation, state: { recording } } = useContext(LocationContext);
  const callback = useCallback((location) => {
    addLocation(location, recording);
  }, [recording]);
  const [err] = useLocation(isFocused || recording, callback);
  
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Spacer>
          <Text style={generalStyles.screenTitle}>TrackCreateScreen</Text>
        </Spacer>
        <Map />
        {err === '' ? null : (
          <TouchableOpacity onPress={requestPermission}>
            <Text style={generalStyles.clickableText}>{err}</Text>
          </TouchableOpacity>
        )}
        <TrackForm />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);