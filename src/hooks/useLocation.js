import { useEffect, useState } from 'react';
import { requestForegroundPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState('');
  useEffect(() => {
    let subscriber;
    const requestPermission = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error('Not authorized');
        }
        subscriber = await watchPositionAsync({
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10
          }, (location) => {
            callback(location);
          }
        );
      } catch (err) {
        setErr('Veuillez accepter la localisation');
      }
    };

    if(shouldTrack) {
      requestPermission();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if(subscriber){
        subscriber.remove();
      } 
    };
  }, [shouldTrack, callback]);

  return [err];
}