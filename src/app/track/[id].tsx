import React, { useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';
import MapView, { Polyline } from 'react-native-maps';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Context as TrackContext } from '../../context/TrackContext';
import mapStyle from '../../lib/mapStyle';

const TrackMapScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { state: tracks } = useContext(TrackContext);
  const track = tracks.find((item) => item.id === id);

  if (!track || track.locations.length === 0) {
    return null;
  }

  return (
    <MapView
      provider="google"
      style={{
        width: wp(100),
        height: hp(100),
        alignSelf: 'center',
      }}
      initialRegion={{ ...track.locations[0].coords, longitudeDelta: 0.005, latitudeDelta: 0.005 }}
      customMapStyle={mapStyle}
      showsIndoors={false}
      showsBuildings={false}
      showsScale={false}
      showsCompass={false}
      showsPointsOfInterests={false}
      showsMyLocationButton={false}
    >
      <Polyline coordinates={track.locations.map((location) => location.coords)} />
    </MapView>
  );
};

export default TrackMapScreen;
