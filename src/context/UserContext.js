import createDataContext from '../context/createDataContext';
import trackerApi, { baseURL } from '../api/tracker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'saveUser':
      return { ...state, ...action.payload };
    default:
      return state;
  };
};

const saveUser = (dispatch) => (user) => {
  if(typeof user.dateOfBirth == 'string'){
    user.dateOfBirth = new Date(user.dateOfBirth);
  }
  dispatch({ type: 'saveUser', payload: user});
};

const updateUser = (dispatch) => async(user) => {
  if (user.idProfilImage && user.idProfilImage != "") {
    try { 
      const token = await AsyncStorage.getItem('token');
      if(token && token != ""){
        const resp = await FileSystem.uploadAsync(
          baseURL + '/image', 
          user.idProfilImage, 
          {
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            httpMethod: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            fieldName: 'file'
          }
        );
        user.idProfilImage = resp.body;
      }
    } catch (err) {
      console.log(err);
    }
  }
  try {
    await trackerApi.post('/modifyUser', user);
    dispatch({ type: 'saveUser', payload: user});
  } catch (err) {
    console.log(err);
  } 
}

export const { Provider, Context } = createDataContext(
  userReducer,
  { saveUser, updateUser },
  { pseudo: '', name: '', dateOfBirth: null, gender: '', idProfilImage: '', poids: 0 }
);