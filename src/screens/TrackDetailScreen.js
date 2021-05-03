import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { Context as TrackContext } from '../context/TrackContext';


const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const track = state.find(item => item._id === navigation.getParam('_id'));
  return (
    <View>
      <Text>TrackDetailScreen</Text>
      <Text>{track.name}</Text>
      <MapView
        style={{
          height: Dimensions.get("window").width * 0.7,
          width: Dimensions.get("window").width,
          alignSelf: 'center'
        }}
        initialRegion={{
          ...track.locations[0].coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <Polyline coordinates={track.locations.map(item => item.coords)} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default TrackDetailScreen;