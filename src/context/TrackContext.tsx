import type { LocationObject } from 'expo-location';

import createDataContext from './createDataContext';
import { generateId, readJSON, writeJSON, StorageKeys } from '../lib/storage';

export interface Track {
  id: string;
  locations: LocationObject[];
  speedMoy: number;
  /** ISO string - when the recording started. */
  date: string;
  /** ISO string used as a duration: its epoch value is the elapsed time in ms. */
  time: string;
  distance: number;
}

type TrackAction = { type: 'load'; payload: Track[] };

const trackReducer = (state: Track[], action: TrackAction): Track[] => {
  switch (action.type) {
    case 'load':
      return action.payload;
    default:
      return state;
  }
};

const loadTracks = (dispatch: React.Dispatch<TrackAction>) => async () => {
  const stored = (await readJSON<Track[]>(StorageKeys.tracks)) ?? [];
  dispatch({ type: 'load', payload: [...stored].reverse() });
};

const createTrack =
  (dispatch: React.Dispatch<TrackAction>) =>
  async (locations: LocationObject[], speedMoy: number, date: Date, time: Date, distance: number) => {
    try {
      const stored = (await readJSON<Track[]>(StorageKeys.tracks)) ?? [];
      const track: Track = {
        id: generateId(),
        locations,
        speedMoy,
        date: date.toISOString(),
        time: time.toISOString(),
        distance,
      };
      const updated = [...stored, track];
      await writeJSON(StorageKeys.tracks, updated);
      dispatch({ type: 'load', payload: [...updated].reverse() });
    } catch (err) {
      console.log(err);
    }
  };

export const { Context, Provider } = createDataContext(trackReducer, { loadTracks, createTrack }, []);
