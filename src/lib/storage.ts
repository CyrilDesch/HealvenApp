import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Small JSON wrapper around AsyncStorage. Healven is fully local now (no
 * backend), so this is the only persistence layer for the user profile and
 * the run history.
 */
export const StorageKeys = {
  user: '@healven/user',
  tracks: '@healven/tracks',
} as const;

export async function readJSON<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeJSON<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
