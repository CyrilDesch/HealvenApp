import createDataContext from '../context/createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_location': {
      const speed = action.payload.coords.speed * 3.6;
      let speedMoy;
      if(state.speedMoy != 0){
        speedMoy = (state.speedMoy + (speed/(state.locations.length)))/(1+1/state.locations.length);
      }
      else if (speed > 1)
        speedMoy = speed;
      if(speed > 1)
        return { ...state, locations: [...state.locations, action.payload], speed, speedMoy };
      else
        return { ...state, speed: 0 };
    }
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };
    case 'start_recording':
      return { ...state, recording: true, recordDate: new Date() };
    case 'stop_recording':
      return { ...state, recording: false };
    case 'reset':
      return { ...state, locations: [], speed: 0, speedMoy: 0, recordDate: null };
    default:
      return state;
  };
};

const startRecording = dispatch => () => {
  dispatch({ type: 'start_recording' });
};

const stopRecording = dispatch => () => {
  dispatch({ type: 'stop_recording'});
};

const addLocation = dispatch => (location, recording) => {
  if (recording) {
    dispatch({ type: 'add_location', payload: location });
  }
  dispatch({ type: 'add_current_location', payload: location });
};

const reset = dispatch => () => {
  dispatch({ type: 'reset' });
};

export const { Provider, Context } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, reset },
  { recording: false, recordDate: null, locations: [], currentLocation: null, speed: 0, speedMoy: 0 }
);