import type { LocationObject } from 'expo-location';
import { defaultLocationState, locationReducer, type LocationState } from './LocationContext';

const fakeLocation = (speedMs: number | null): LocationObject => ({
  coords: {
    latitude: 48.8566,
    longitude: 2.3522,
    altitude: 35,
    accuracy: 5,
    altitudeAccuracy: 5,
    heading: 0,
    speed: speedMs,
  },
  timestamp: Date.now(),
});

describe('locationReducer', () => {
  it('starts recording and stamps a record date', () => {
    const state = locationReducer(defaultLocationState, { type: 'start_recording' });
    expect(state.recording).toBe(true);
    expect(state.recordDate).toBeInstanceOf(Date);
  });

  it('stops recording without touching the accumulated locations', () => {
    const recording: LocationState = { ...defaultLocationState, recording: true, locations: [fakeLocation(2)] };
    const state = locationReducer(recording, { type: 'stop_recording' });
    expect(state.recording).toBe(false);
    expect(state.locations).toHaveLength(1);
  });

  it('resets locations, speed and speedMoy but leaves currentLocation alone', () => {
    const current = fakeLocation(2);
    const dirty: LocationState = {
      ...defaultLocationState,
      locations: [current],
      speed: 12,
      speedMoy: 10,
      recordDate: new Date(),
      currentLocation: current,
    };
    const state = locationReducer(dirty, { type: 'reset' });
    expect(state).toMatchObject({ locations: [], speed: 0, speedMoy: 0, recordDate: null });
    expect(state.currentLocation).toBe(current);
  });

  it('always tracks the current location regardless of speed', () => {
    const location = fakeLocation(0);
    const state = locationReducer(defaultLocationState, { type: 'add_current_location', payload: location });
    expect(state.currentLocation).toBe(location);
  });

  it('ignores a fix at or below 1 km/h: no point is kept and speed drops to 0', () => {
    // 0.2 m/s = 0.72 km/h, below the 1 km/h threshold
    const state = locationReducer(defaultLocationState, { type: 'add_location', payload: fakeLocation(0.2) });
    expect(state.locations).toHaveLength(0);
    expect(state.speed).toBe(0);
  });

  it('treats a missing speed reading as 0 and ignores the fix', () => {
    const state = locationReducer(defaultLocationState, { type: 'add_location', payload: fakeLocation(null) });
    expect(state.locations).toHaveLength(0);
    expect(state.speed).toBe(0);
  });

  it('keeps a fix above 1 km/h and sets it as the initial average speed', () => {
    // 2 m/s = 7.2 km/h
    const state = locationReducer(defaultLocationState, { type: 'add_location', payload: fakeLocation(2) });
    expect(state.locations).toHaveLength(1);
    expect(state.speed).toBeCloseTo(7.2);
    expect(state.speedMoy).toBeCloseTo(7.2);
  });

  it('folds a second fast fix into a running average speed', () => {
    const afterFirst = locationReducer(defaultLocationState, { type: 'add_location', payload: fakeLocation(2) });
    const afterSecond = locationReducer(afterFirst, { type: 'add_location', payload: fakeLocation(4) });
    expect(afterSecond.locations).toHaveLength(2);
    // speedMoy should move towards the new speed but not jump straight to it
    expect(afterSecond.speedMoy).toBeGreaterThan(afterFirst.speedMoy);
    expect(afterSecond.speedMoy).toBeLessThan(4 * 3.6);
  });
});
