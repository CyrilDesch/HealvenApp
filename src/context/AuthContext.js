import createDataContext from '../context/createDataContext';
import trackerApi from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signup':
      return { ...state, token: action.payload, error: '', valid: false, verifToken: true};
    case 'signin':
      return { ...state, token: action.payload.token, error: '', valid: action.payload.valid, verifToken: true};
    case 'signout': 
      return { ...state, token: null, valid: true, verifToken: true}
    case 'add_error':
      return { ...state, error: action.payload};
    case 'remove_error':
      return { ...state, error: ''};
    case 'no_token': 
      return { ...state, verifToken: true, token: null }
    case 'valid_user':
      return { ...state, valid: true }
    default:
      return state;
  };
};

const removeError = (dispatch) => () => {
  dispatch({type: 'remove_error'});
};

const signup = (dispatch) => async ({ pseudo, password, saveUser }) => {
  try {
    const resp = await trackerApi.post('/signup', {pseudo, password});
    await AsyncStorage.setItem('token', resp.data.token);
    saveUser(resp.data.returnUser);
    dispatch({type: 'signup', payload: resp.data.token});
  } catch (err) {
    console.log(err)
    dispatch({type: 'add_error', payload: "Une erreur est survenue"});
  } 
};

const signin = (dispatch) => async ({ pseudo, password, saveUser }) => {
  try {
    const resp = await trackerApi.post('/signin', {pseudo, password});
    await AsyncStorage.setItem('token', resp.data.token);
    saveUser(resp.data.returnUser);
    dispatch({type: 'signin', payload: {token: resp.data.token, valid: resp.data.returnUser.valid}});
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
      dispatch({type: 'signin', payload: {token: token, valid: resp.data.returnUser.valid}});
    } catch(err) {
      console.log(err);
    }
  } else {
    dispatch({type: 'no_token'});
  }
}

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    dispatch({type: 'signout'});
  } catch (err) {
    console.log(err);
  }
}

const validUser = (dispatch) => () => {
  dispatch({type: 'valid_user'});
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signup, signout, removeError, tryLocalSignIn, validUser },
  { verifToken: false, token: null, error: '', valid: true }
);