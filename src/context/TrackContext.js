import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const TrackReducer = (state, action) => {
  switch (action.type){
    case 'fetch_track': {
      return action.payload.reverse();
    }
    default:
      return state;
  };
};

const fetchTrack = dispatch => async() => {
  const response = await trackerApi.get('/tracks');
  dispatch({ type: 'fetch_track', payload: response.data})
};

const createTrack = dispatch => async(locations, speedMoy, date, time, distance) => {
  try {
    await trackerApi.post('/tracks', {locations, speedMoy, date, time, distance});
    const response = await trackerApi.get('/tracks');
    dispatch({ type: 'fetch_track', payload: response.data})
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  TrackReducer,
  { fetchTrack, createTrack },
  []
);