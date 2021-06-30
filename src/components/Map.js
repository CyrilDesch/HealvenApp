import React, { useContext, useState, useRef, useEffect } from 'react';
import { Animated, StyleSheet, Pressable, Text, View } from 'react-native';
import MapView, { AnimatedRegion, Marker, Polyline } from 'react-native-maps';
import { Context as LocationContext } from '../context/LocationContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {default as IconFontAwesome5} from 'react-native-vector-icons/FontAwesome5';

const delta = 0.003;

const Map = ({ show, scrollRef }) => {
  const { state: { currentLocation, locations } } = useContext(LocationContext);
  const [showRecenter, setShowRecenter] = useState(false);
  const map = useRef(null);
  const heightValue = useRef(new Animated.Value(0)).current;
  const [coordinate, setCoordinate] = useState(
    new AnimatedRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0
    })
  );

  animateRecenter = (duration) => {
    const markerCoord = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude
    }
    const regionCoord = {
      ...markerCoord,
      latitudeDelta: delta,
      longitudeDelta: delta
    };
  
    map.current.animateToRegion(regionCoord, duration);
  }
  
  useEffect(() => {
    const markerCoord = {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude
    }
    
    const duration = 800;

    if(!showRecenter){
      animateRecenter(800);
    }
    
    coordinate.timing({
      ...markerCoord,
      duration,
      useNativeDriver: false
    }).start();
  }, [currentLocation]);

  useEffect(() => {
    if(!show){
      scrollRef.setNativeProps({scrollEnabled: false})
      scrollRef.scrollTo({y: 0})
      Animated.timing(heightValue, {
        toValue: 0,
        duration: 200,
        delay: 10,
        useNativeDriver: false
      }).start(() => scrollRef.setNativeProps({scrollEnabled: true}));
    } else {
      heightValue.setValue(hp(100));
      setTimeout(() => scrollRef.scrollToEnd(), 1)
    }
  }, [show])

  return(
    <Animated.View style={{height: heightValue}}>
      <MapView
        ref={map}
        provider="google"
        style={{
          width: wp(100),
          height: hp(100)-wp(35),
          marginTop: wp(35),
          alignSelf: 'center'
        }}
        initialRegion={{...currentLocation.coords, longitudeDelta: delta, latitudeDelta: delta}}
        onTouchMove={() => {
          if(!showRecenter)
            setShowRecenter(true);
        }}
        customMapStyle={mapStyle}
        showsIndoors={false}
        showsBuildings={false}
        showsScale={false}
        showsCompass={false}
        showsPointsOfInterest={false}
        showsMyLocationButton={false}
      >
        <Marker.Animated
          coordinate={coordinate}
        >
          <View style={styles.markerWalkingBackground}>
            <View style={styles.markerWalking}>
              <IconFontAwesome5 name="walking" size={wp(5)} color="white" />
            </View>
          </View>
        </Marker.Animated>
        <Polyline coordinates={locations.map(location => location.coords)} />
      </MapView>

      {showRecenter && show ? 
        <Pressable style={styles.recenterButton} onPress={() => {
          setShowRecenter(false);
          animateRecenter(500);
        }}>
          <IconFontAwesome5 name="location-arrow" size={wp(4)} color="#1f1f1f" />
        </Pressable>
      : null}
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
    shadowColor: "#000",
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
    alignItems: 'center'
  },
  markerWalkingBackground: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: 'rgba(249,25,65,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e1e1e1"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#9fd575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#00aaff"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]

export default Map;