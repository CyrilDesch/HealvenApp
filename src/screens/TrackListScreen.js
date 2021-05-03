import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Context as TrackContext } from '../context/TrackContext';

const TrackListScreen = ({navigation}) => {
  const { state, fetchTrack } = useContext(TrackContext);

  useEffect(() => { 
    fetchTrack();
  }, []);

  return (
    <View>
      <Text>TrackListScreen</Text>
      <FlatList 
        data={state}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('TrackDetail', { _id: item._id })}>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default TrackListScreen;