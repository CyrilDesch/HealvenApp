import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const generalStyles = StyleSheet.create({
  screenTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(8),
  },
  clickableText : {
    textAlign: 'center',
    fontSize: wp(4),
    color: 'dodgerblue'
  },
  input: {
    width: wp(80),
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: wp(4),
    marginBottom: hp(1),
    color: 'black',
  },
  textInput: {
    fontFamily: 'Montserrat-Medium',
    width: wp(80),
    fontSize: wp(4.2),
    paddingVertical: wp(4),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    borderWidth: wp(0.3),
    borderColor: 'black',
    color: 'black',
    backgroundColor: '#f6f6f6',
  },
  disable: {
    backgroundColor: '#DADADA',
  },
  error: {
    marginTop: hp(0.5),
    fontFamily: 'Montserrat-Regular',
    fontSize: wp(3.5),
    color: 'red',
  }
});

export default generalStyles;