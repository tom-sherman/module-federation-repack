import React from 'react';
import { Text } from "react-native";

export default function FederatedText({children, ...props}) {
  return <Text {...props}>I'm federated: {children}</Text>
}
