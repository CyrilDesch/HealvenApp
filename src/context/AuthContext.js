import createDataContext from '../context/createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signup':
      return { ...state, token: action.payload, error: ''};
    case 'signin':
      return { ...state, token: action.payload, error: ''};
    case 'signout': 
      return { ...state, token: null}
    case 'add_error':
      return { ...state, error: action.payload};
    case 'remove_error':
      return { ...state, error: ''};
    default:
      return state;
  };
};

const removeError = (dispatch) => () => {
  dispatch({type: 'remove_error'});
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const resp = await trackerApi.post('/signup', {email, password});
    await AsyncStorage.setItem('token', resp.data.token);
    dispatch({type: 'signup', payload: resp.data.token});
    navigate('TrackList');
  } catch (err) {
    dispatch({type: 'add_error', payload: "Une erreur est survenue"});
  } 
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const resp = await trackerApi.post('/signin', {email, password});
    await AsyncStorage.setItem('token', resp.data.token);
    dispatch({type: 'signin', payload: resp.data.token});
    navigate('TrackList');
  } catch (err) {
    console.log(err);
    dispatch({type: 'add_error', payload: "Une erreur est survenue"});
  } 
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token){
    dispatch({type: 'signin', token});
    navigate('TrackList');
  } else {
    navigate('Signup');
  }
}

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    navigate('Signin');
  } catch (err) {
    console.log(err);
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, removeError, tryLocalSignIn },
  { token: null, error: '' }
);