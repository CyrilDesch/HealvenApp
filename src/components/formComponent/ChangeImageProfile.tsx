import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ChangeImageProfileProps {
  defaultImageId?: string;
  image: string | null;
  setImage: (uri: string) => void;
  disable?: boolean;
}

const ChangeImageProfile = ({ defaultImageId = '', image, setImage, disable = false }: ChangeImageProfileProps) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  return (
    <Pressable disabled={disable} onPress={pickImage}>
      {!image && defaultImageId ? (
        <Image style={styles.imageProfile} contentFit="contain" source={{ uri: defaultImageId }} />
      ) : null}

      {!image && !defaultImageId ? (
        <View style={styles.imageProfileContainer}>
          <Image style={styles.imageProfileWrapped} source={require('../../../assets/images/default_profile_pic.png')} />
        </View>
      ) : null}

      {image ? (
        <View style={styles.imageProfileContainer}>
          <Image style={styles.imageProfileWrapped} source={{ uri: image }} />
        </View>
      ) : null}

      <View style={styles.iconCameraContainer}>
        <FontAwesome name="camera" size={wp(5)} color="#fe9b18" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageProfile: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(3),
    borderColor: 'white',
    borderWidth: wp(0.2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  imageProfileContainer: {
    borderRadius: wp(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
});

export default ChangeImageProfile;
