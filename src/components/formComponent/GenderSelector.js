import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native';
import generalStyles from '../../generalStyles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const GenderSelector = ({ gender, setGender }) => {
  return(
    <View>
      <Text style={generalStyles.text}>Genre de naissance</Text>
      <View style={styles.genderContainer}>
        <Pressable
          style={styles.buttonGender}
          disabled={gender == 'homme'}
          onPressIn={() => setGender('homme')}>
          <BouncyCheckbox
            size={25}
            text="Homme"
            disableBuiltInState
            isChecked={gender == 'homme'}
            fillColor="#13385e"
            disabled
            unfillColor="#FFFFFF"
            iconStyle={{borderColor: '#13385e'}}
            textStyle={styles.textGender}
          />
        </Pressable>
        <Pressable
          style={styles.buttonGender}
          disabled={gender == 'femme'}
          onPressIn={() => setGender('femme')}>
          <BouncyCheckbox
            size={25}
            text="Femme"
            disableBuiltInState
            isChecked={gender == 'femme'}
            fillColor="#13385e"
            disabled
            unfillColor="#FFFFFF"
            iconStyle={{borderColor: '#13385e'}}
            textStyle={styles.textGender}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGender: {
    width: wp(38),
    paddingVertical: wp(4),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#f1f3fd',
  },
  textGender: {
    textDecorationLine: 'none',
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
    color: '#13385e',
  },
  genderContainer: {
    width: wp(80),
    flexDirection: "row",
    justifyContent: "space-between"
  },
});

export default GenderSelector;