import React, { useContext } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import MapView, { Circle, Polyline } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
  const { state: { currentLocation, locations } } = useContext(LocationContext);
  
  if(!currentLocation){
    return <ActivityIndicator color="blue" size="large" style={{marginTop: Dimensions.get("window").width * 0.1}} />
  }

  return(
    <MapView 
      style={{
        height: Dimensions.get("window").width * 0.7,
        width: Dimensions.get("window").width,
        alignSelf: 'center'
      }}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Circle 
        center={currentLocation.coords} 
        radius={30}
        strokeColor="rgba(158, 158, 255, 1)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline coordinates={locations.map(location => location.coords)} />
    </MapView>
  );
};

const styles = StyleSheet.create({

});

export default Map;