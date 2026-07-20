import React, { useRef } from 'react';
import { Animated, Pressable, PressableProps, StyleProp, ViewStyle, Platform } from 'react-native';

interface AnimatedPressableProps extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
}

const AnimatedPressableComponent = Animated.createAnimatedComponent(Pressable);

export function AnimatedPressable({ children, style, scaleTo = 0.97, onPress, ...props }: AnimatedPressableProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: scaleTo,
      useNativeDriver: Platform.OS !== 'web',
      speed: 20,
      bounciness: 5,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: Platform.OS !== 'web',
      speed: 20,
      bounciness: 5,
    }).start();
  };

  return (
    <AnimatedPressableComponent 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut} 
      onPress={onPress}
      style={[style, { transform: [{ scale }] }]}
      {...props}
    >
      {children}
    </AnimatedPressableComponent>
  );
}
