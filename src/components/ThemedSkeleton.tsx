import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";

interface ThemedSkeletonProps {
  width: number;
  height: number;
  className?: string;
}

const ThemedSkeleton: React.FC<ThemedSkeletonProps> = ({
  width,
  height,
  className,
}) => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopAnimation = () => {
      Animated.sequence([
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]).start(() => {
        loopAnimation();
      });
    };

    loopAnimation();
  }, [animatedOpacity]);

  return (
    <Animated.View
      className={className}
      style={{
        backgroundColor: "#2C2C310D",
        borderRadius: 8,
        width,
        height,
        opacity: animatedOpacity,
      }}
    />
  );
};

export default ThemedSkeleton;
