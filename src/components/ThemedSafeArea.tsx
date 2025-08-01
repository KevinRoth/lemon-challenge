import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ThemedSafeArea = ({ children, className }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }} className={`flex-1 ${className}`}>
      {children}
    </View>
  );
};

export default ThemedSafeArea;
