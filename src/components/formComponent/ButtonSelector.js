import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native';
import generalStyles from '../../generalStyles';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const ButtonSelector = ({ state, setState, label, value, text, error, disable }) => {
  return(
    <View>
      <Text style={generalStyles.text}>{label}</Text>
      <View style={styles.container}>
        <Pressable
          style={[styles.button, disable ? generalStyles.disable : null]}
          disabled={state == value[0] || disable}
          onPressIn={() => setState(value[0])}>
          <BouncyCheckbox
            size={25}
            text={text[0]}
            disableBuiltInState
            isChecked={state == value[0]}
            fillColor="black"
            disabled
            unfillColor="#f6f6f6"
            iconStyle={{borderColor: 'black'}}
            textStyle={styles.text}
          />
        </Pressable>
        <Pressable
          style={[styles.button, disable ? generalStyles.disable : null]}
          disabled={state == value[1] || disable}
          onPressIn={() => setState(value[1])}>
          <BouncyCheckbox
            size={25}
            text={text[1]}
            disableBuiltInState
            isChecked={state == value[1]}
            fillColor="black"
            disabled
            unfillColor="#f6f6f6"
            iconStyle={{borderColor: 'black'}}
            textStyle={styles.text}
          />
        </Pressable>
      </View>
      {error != "" ? <Text style={generalStyles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: wp(38),
    paddingVertical: wp(4),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#f6f6f6',
  },
  text: {
    textDecorationLine: 'none',
    fontSize: wp(4),
    fontFamily: 'Montserrat-Medium',
    color: 'black',
  },
  container: {
    width: wp(80),
    flexDirection: "row",
    justifyContent: "space-between"
  },
});

export default ButtonSelector;