import { Animated, Easing } from 'react-native';
import React from 'react';
import { useAnimation } from '../hooks/useAnimation';

interface Props {
  children: React.ReactNode;
  className?: string;
}
const ThemedAnimatedTranslateTop = ({ children, className }: Props) => {
  const { animatedTop, fadeIn, animatedOpacity, startMovingTopPosition } =
    useAnimation();

  React.useEffect(() => {
    fadeIn({});

    startMovingTopPosition({
      easing: Easing.bounce,
      duration: 700,
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity: animatedOpacity,
        transform: [{ translateY: animatedTop }],
      }}
      className={className}
    >
      {children}
    </Animated.View>
  );
};

export default ThemedAnimatedTranslateTop;
