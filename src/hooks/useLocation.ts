import { useEffect, useState } from 'react';
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  type LocationObject,
  type LocationSubscription,
} from 'expo-location';

export default function useLocation(
  shouldTrack: boolean,
  callback: (location: LocationObject) => void,
): [string] {
  const [err, setErr] = useState('');

  useEffect(() => {
    let subscriber: LocationSubscription | undefined;

    const requestPermission = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error('Not authorized');
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 0,
          },
          (location) => {
            callback(location);
          },
        );
      } catch {
        setErr('Veuillez accepter la localisation');
      }
    };

    if (shouldTrack) {
      requestPermission();
    } else {
      subscriber?.remove();
      subscriber = undefined;
    }

    return () => {
      subscriber?.remove();
    };
  }, [shouldTrack, callback]);

  return [err];
}
