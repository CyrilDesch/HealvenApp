import type { LocationObject } from 'expo-location';

import createDataContext from './createDataContext';

export interface LocationState {
  recording: boolean;
  recordDate: Date | null;
  locations: LocationObject[];
  currentLocation: LocationObject | null;
  speed: number;
  speedMoy: number;
}

export type LocationAction =
  | { type: 'add_location'; payload: LocationObject }
  | { type: 'add_current_location'; payload: LocationObject }
  | { type: 'start_recording' }
  | { type: 'stop_recording' }
  | { type: 'reset' };

export const defaultLocationState: LocationState = {
  recording: false,
  recordDate: null,
  locations: [],
  currentLocation: null,
  speed: 0,
  speedMoy: 0,
};

export const locationReducer = (state: LocationState, action: LocationAction): LocationState => {
  switch (action.type) {
    case 'add_location': {
      const speed = (action.payload.coords.speed ?? 0) * 3.6;
      let speedMoy = state.speedMoy;
      if (state.speedMoy !== 0) {
        speedMoy = (state.speedMoy + speed / state.locations.length) / (1 + 1 / state.locations.length);
      } else if (speed > 1) {
        speedMoy = speed;
      }
      if (speed > 1) {
        return { ...state, locations: [...state.locations, action.payload], speed, speedMoy };
      }
      return { ...state, speed: 0 };
    }
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };
    case 'start_recording':
      return { ...state, recording: true, recordDate: new Date() };
    case 'stop_recording':
      return { ...state, recording: false };
    case 'reset':
      return { ...state, locations: [], speed: 0, speedMoy: 0, recordDate: null };
    default:
      return state;
  }
};

const startRecording = (dispatch: React.Dispatch<LocationAction>) => () => {
  dispatch({ type: 'start_recording' });
};

const stopRecording = (dispatch: React.Dispatch<LocationAction>) => () => {
  dispatch({ type: 'stop_recording' });
};

const addLocation =
  (dispatch: React.Dispatch<LocationAction>) => (location: LocationObject, recording: boolean) => {
    if (recording) {
      dispatch({ type: 'add_location', payload: location });
    }
    dispatch({ type: 'add_current_location', payload: location });
  };

const reset = (dispatch: React.Dispatch<LocationAction>) => () => {
  dispatch({ type: 'reset' });
};

export const { Provider, Context } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, reset },
  defaultLocationState,
);
