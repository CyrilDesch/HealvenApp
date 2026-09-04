import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateId, readJSON, writeJSON } from './storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  jest.requireActual('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('generateId', () => {
  it('returns a non-empty string', () => {
    expect(typeof generateId()).toBe('string');
    expect(generateId().length).toBeGreaterThan(0);
  });

  it('never generates the same id twice in a row', () => {
    const ids = new Set(Array.from({ length: 50 }, () => generateId()));
    expect(ids.size).toBe(50);
  });
});

describe('readJSON / writeJSON', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('round-trips an object through storage', async () => {
    const value = { name: 'Cyril', poids: '80', tracks: [1, 2, 3] };
    await writeJSON('some-key', value);
    await expect(readJSON('some-key')).resolves.toEqual(value);
  });

  it('returns null when the key is missing', async () => {
    await expect(readJSON('missing-key')).resolves.toBeNull();
  });

  it('returns null instead of throwing on corrupted JSON', async () => {
    await AsyncStorage.setItem('broken-key', '{not valid json');
    await expect(readJSON('broken-key')).resolves.toBeNull();
  });

  it('overwrites a previous value for the same key', async () => {
    await writeJSON('key', { count: 1 });
    await writeJSON('key', { count: 2 });
    await expect(readJSON('key')).resolves.toEqual({ count: 2 });
  });
});
