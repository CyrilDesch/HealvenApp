import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, View, type ScrollView } from 'react-native';
import MapView, { AnimatedRegion, MarkerAnimated, Polyline } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Context as LocationContext } from '../context/LocationContext';
import mapStyle from '../lib/mapStyle';

const delta = 0.003;

interface MapProps {
  show: boolean;
  scrollRef: React.RefObject<ScrollView | null>;
}

const Map = ({ show, scrollRef }: MapProps) => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);
  const [showRecenter, setShowRecenter] = useState(false);
  const map = useRef<MapView>(null);
  const [heightValue] = useState(() => new Animated.Value(0));
  const [coordinate] = useState(
    new AnimatedRegion({
      latitude: currentLocation!.coords.latitude,
      longitude: currentLocation!.coords.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    }),
  );

  const animateRecenter = (duration: number) => {
    const markerCoord = {
      latitude: currentLocation!.coords.latitude,
      longitude: currentLocation!.coords.longitude,
    };
    const regionCoord = {
      ...markerCoord,
      latitudeDelta: delta,
      longitudeDelta: delta,
    };

    map.current?.animateToRegion(regionCoord, duration);
  };

  useEffect(() => {
    const markerCoord = {
      latitude: currentLocation!.coords.latitude,
      longitude: currentLocation!.coords.longitude,
    };

    const duration = 800;

    if (!showRecenter) {
      animateRecenter(800);
    }

    coordinate
      .timing({
        ...markerCoord,
        duration,
        useNativeDriver: false,
      } as any)
      .start();
  }, [currentLocation]);

  useEffect(() => {
    const node = scrollRef.current;
    if (!show && node) {
      node.setNativeProps({ scrollEnabled: false });
      node.scrollTo({ y: 0 });
      Animated.timing(heightValue, {
        toValue: 0,
        duration: 200,
        delay: 10,
        useNativeDriver: false,
      }).start(() => {
        node.setNativeProps({ scrollEnabled: true });
      });
    } else if (node) {
      heightValue.setValue(hp(100));
      setTimeout(() => node.scrollToEnd(), 1);
    }
  }, [show]);

  return (
    <Animated.View style={{ height: heightValue }}>
      <MapView
        ref={map}
        provider="google"
        style={{
          width: wp(100),
          height: hp(100) - wp(35),
          marginTop: wp(35),
          alignSelf: 'center',
        }}
        initialRegion={{ ...currentLocation!.coords, longitudeDelta: delta, latitudeDelta: delta }}
        onTouchMove={() => {
          if (!showRecenter) setShowRecenter(true);
        }}
        customMapStyle={mapStyle}
        showsIndoors={false}
        showsBuildings={false}
        showsScale={false}
        showsCompass={false}
        showsPointsOfInterests={false}
        showsMyLocationButton={false}
      >
        <MarkerAnimated coordinate={coordinate as any}>
          <View style={styles.markerWalkingBackground}>
            <View style={styles.markerWalking}>
              <FontAwesome5 name="walking" size={wp(5)} color="white" />
            </View>
          </View>
        </MarkerAnimated>
        <Polyline coordinates={locations.map((location) => location.coords)} />
      </MapView>

      {showRecenter && show ? (
        <Pressable
          style={styles.recenterButton}
          onPress={() => {
            setShowRecenter(false);
            animateRecenter(500);
          }}
        >
          <FontAwesome5 name="location-arrow" size={wp(4)} color="#1f1f1f" />
        </Pressable>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  recenterButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: wp(5),
    bottom: wp(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  markerWalking: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#f91941',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerWalkingBackground: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: 'rgba(249,25,65,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
