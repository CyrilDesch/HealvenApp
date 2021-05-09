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

const signup = (dispatch) => async ({ email, password, saveUser }) => {
  try {
    const resp = await trackerApi.post('/signup', {email, password});
    await AsyncStorage.setItem('token', resp.data.token);
    saveUser(resp.data.returnUser);
    dispatch({type: 'signup', payload: resp.data.token});
    navigate('UserConfig');
  } catch (err) {
    dispatch({type: 'add_error', payload: "Une erreur est survenue"});
  } 
};

const signin = (dispatch) => async ({ email, password, saveUser }) => {
  try {
    const resp = await trackerApi.post('/signin', {email, password});
    await AsyncStorage.setItem('token', resp.data.token);
    saveUser(resp.data.returnUser);
    dispatch({type: 'signin', payload: resp.data.token});
    if(!resp.data.returnUser.valid){
      navigate('UserConfig');
    } else {
      navigate('Home');
    }
  } catch (err) {
    dispatch({type: 'add_error', payload: "Une erreur est survenue"});
  } 
};

const tryLocalSignIn = (dispatch) => async ({ saveUser }) => {
  const token = await AsyncStorage.getItem('token');
  if (token){
    try {
      const resp = await trackerApi.get('/user');
      saveUser(resp.data.returnUser);
      dispatch({type: 'signin', token});
      if(!resp.data.returnUser.valid){
        navigate('UserConfig');
      } else {
        navigate('Home');
      }
    } catch(err) {
      console.log(err);
      navigate('Signup');
    }
  } else {
    navigate('Signup');
  }
}

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
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