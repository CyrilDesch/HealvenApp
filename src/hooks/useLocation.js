import { useEffect, useState } from 'react';
import * as TaskManager from 'expo-task-manager';
import { requestForegroundPermissionsAsync, requestBackgroundPermissionsAsync, Accuracy, startLocationUpdatesAsync, hasStartedLocationUpdatesAsync, stopLocationUpdatesAsync, watchPositionAsync } from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

let uCallback;

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error)
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    if(uCallback)
      uCallback(locations[locations.length - 1])
    // do something with the locations captured in the background
  }
});

export default (shouldTrack, callback) => {
  const [err, setErr] = useState('');
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const { granted: granted1 } = await requestForegroundPermissionsAsync();
        const { granted: granted2 } = await requestBackgroundPermissionsAsync();
        if (!granted1 && !granted2) {
          throw new Error('Not authorized');
        }
        uCallback = callback;
        await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          foregroundService: {
            notificationTitle: 'Healven',
            notificationBody: 'Course en cours'
          },
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 0
          }
        );
      } catch (err) {
        setErr('Veuillez accepter la localisation');
      }
    };

    if(shouldTrack) {
      requestPermission();
    } 

    return () => {
      if (shouldTrack) {
        stopLocationUpdatesAsync(LOCATION_TASK_NAME)
      }
    };
  }, [shouldTrack, callback]);

  return [err];
}



