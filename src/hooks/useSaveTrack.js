import { Context as TrackContext} from '../context/TrackContext';
import { Context as LocationContext} from '../context/LocationContext';
import { useContext } from 'react';
import { navigate } from '../navigationRef';

export default () => {
  
  const { state: { locations, name }, reset } = useContext(LocationContext);
  const { createTrack } = useContext(TrackContext);

  const saveTrack = async () => {
    await createTrack(locations, name);
    reset();
    navigate('TrackList');
  }

  return [saveTrack];
}