import React, { type ReactNode } from 'react';
import { View } from 'react-native';

interface SpacerProps {
  multiple?: number;
  children?: ReactNode;
}

const Spacer = ({ multiple = 1, children }: SpacerProps) => {
  return <View style={{ margin: 5 * multiple }}>{children}</View>;
};

export default Spacer;
