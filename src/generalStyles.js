import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const generalStyles = StyleSheet.create({
  screenTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 30,
  },
  clickableText : {
    textAlign: 'center',
    fontSize: 15,
    color: 'dodgerblue'
  },
  input: {
    width: wp(80),
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(4),
    marginBottom: hp(1),
    color: '#4e6a86',
  },
  textInput: {
    fontFamily: 'Montserrat-Medium',
    width: wp(80),
    fontSize: wp(4.2),
    paddingVertical: wp(4),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: 'gray',
    color: '#13385e',
    backgroundColor: '#f1f3fd',
  },
  disable: {
    backgroundColor: '#E3E4EE',
  },
  error: {
    marginTop: hp(0.5),
    fontFamily: 'Montserrat-Regular',
    fontSize: wp(3.5),
    color: 'red',
  }
});

export default generalStyles;