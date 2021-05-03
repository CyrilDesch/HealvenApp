import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const generalStyles = StyleSheet.create({
  screenTitle: {
    fontSize: 30,
  },
  clickableText : {
    textAlign: 'center',
    fontSize: 15,
    color: 'dodgerblue'
  },
  input: {
    width: wp(80),
  }
});

export default generalStyles;