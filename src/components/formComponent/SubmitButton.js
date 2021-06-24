import React from 'react';
import { View, StyleSheet, Text, Pressable, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SubmitButton = ({ onSubmit, submitText, isInSubmit }) => {
  return (
    <View style={styles.inline}>
      <View style={styles.empty} />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.text}>{submitText}</Text>
      </Pressable>
      <View style={styles.empty}>
        {isInSubmit ? <ActivityIndicator size="large" color="black"/> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    borderRadius: wp(5)
  },
  text: {
    color: "white",
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(4.5),
    textAlign: 'center',
    paddingVertical: wp(2.5),
    paddingHorizontal: wp(10)
  },
  inline: {
    flexDirection: 'row'
  }, 
  empty: {
    width: wp(10),
    paddingLeft: wp(10),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SubmitButton;