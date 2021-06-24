import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { token, baseURL } from '../../api/tracker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image as CacheImage } from "react-native-expo-image-cache";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ChangeImageProfile = ({ defaultImageId, image, setImage, disable }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };
  
  return(
    <Pressable disabled={disable} onPress={pickImage}>

      {!image && defaultImageId && defaultImageId != "" ? 
        <CacheImage style={styles.imageProfile} resizeMode="contain" {...{uri: baseURL + '/image?id=' + defaultImageId + `&token=${token}`, options: {method: 'GET'}}} /> 
      : null}

      {!image && (!defaultImageId || defaultImageId == "") ?
        <View style={styles.imageProfileContainer}>
          <Image style={styles.imageProfileWrapped} source={require('../../../assets/default_profile_pic.png')} /> 
        </View>
      : null }

      {image ?
        <View style={styles.imageProfileContainer}>
          <Image style={styles.imageProfileWrapped} source={{ uri: image }} />
        </View>
      : null }

      <View style={styles.iconCameraContainer}>
        <Icon name="camera" size={wp(5)} color="#fe9b18" />
      </View>
    </Pressable>
  );
}

ChangeImageProfile.defaultProps = {
  defaultImage: null,
}

const styles = StyleSheet.create({
  imageProfile: {
    width: wp(25), 
    height: wp(25), 
    borderRadius: wp(3),
    borderColor: 'white',
    borderWidth: wp(0.2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  imageProfileContainer: {
    borderRadius: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  },
  imageProfileWrapped: {
    width: wp(25), 
    height: wp(25), 
    borderRadius: wp(3),
    borderColor: 'white',
    borderWidth: wp(0.4),
    backgroundColor: '#ffe2bc',
  },
  iconCameraContainer: {
    position: 'absolute',
    right: -wp(3.5),
    bottom: -wp(3.5),
    padding: wp(1.5),
    backgroundColor: '#ffe2bc',
    borderRadius: wp(2),
    borderColor: 'white',
    borderWidth: wp(0.6),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13,
  }
});

export default ChangeImageProfile;