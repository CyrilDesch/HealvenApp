import { Directory, File, Paths } from 'expo-file-system';

import createDataContext from './createDataContext';
import { readJSON, writeJSON, StorageKeys } from '../lib/storage';

export type Gender = 'homme' | 'femme' | '';

export interface UserProfile {
  name: string;
  dateOfBirth: Date | null;
  gender: Gender;
  poids: string;
  idProfilImage: string;
}

interface UserState extends UserProfile {
  isConfigured: boolean;
}

/** Shape actually written to disk (dates are serialized as ISO strings). */
interface StoredUserProfile extends Omit<UserProfile, 'dateOfBirth'> {
  dateOfBirth: string | null;
}

type UserAction = { type: 'load' | 'save'; payload: UserState };

const defaultState: UserState = {
  name: '',
  dateOfBirth: null,
  gender: '',
  poids: '',
  idProfilImage: '',
  isConfigured: false,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'load':
    case 'save':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

/** Copies a freshly picked image (usually a cache uri) into permanent app storage. */
const persistProfileImage = (uri: string): string => {
  const dir = new Directory(Paths.document, 'profile');
  if (!dir.exists) {
    dir.create({ intermediates: true });
  }
  const extension = /\.(\w+)$/.exec(uri)?.[1] ?? 'jpg';
  const dest = new File(dir, `avatar-${Date.now()}.${extension}`);
  new File(uri).copy(dest);
  return dest.uri;
};

const loadUser = (dispatch: React.Dispatch<UserAction>) => async () => {
  const stored = await readJSON<StoredUserProfile>(StorageKeys.user);
  if (!stored) return;
  dispatch({
    type: 'load',
    payload: {
      ...stored,
      dateOfBirth: stored.dateOfBirth ? new Date(stored.dateOfBirth) : null,
      isConfigured: true,
    },
  });
};

const saveUser = (dispatch: React.Dispatch<UserAction>) => async (profile: UserProfile) => {
  let idProfilImage = profile.idProfilImage;
  if (idProfilImage) {
    try {
      idProfilImage = persistProfileImage(idProfilImage);
    } catch (err) {
      console.log(err);
    }
  }

  const toStore: StoredUserProfile = {
    ...profile,
    idProfilImage,
    dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.toISOString() : null,
  };
  await writeJSON(StorageKeys.user, toStore);

  dispatch({
    type: 'save',
    payload: { ...profile, idProfilImage, isConfigured: true },
  });
};

export const { Provider, Context } = createDataContext(userReducer, { loadUser, saveUser }, defaultState);
