import React from 'react';
import { View } from 'react-native';

const Spacer = ({ multiple, children }) => {
  return (
    <View style={{margin: 5*multiple}}>{children}</View>
  );
};

Spacer.defaultProps = {
  multiple: 1
}

export default Spacer;