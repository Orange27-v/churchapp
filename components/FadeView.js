import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';


const FadeInView = ({ children }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        {
          iterations: -1, // -1 indicates infinite loop
        }
      );
  
      animation.start();
  
      return () => {
        animation.stop();
      };
    }, [fadeAnim]);
  
    return (
      <Animated.View
        style={[
          styles.fadeInView,
          {
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.05, 1.05],
                }),
              },
            ],
            opacity: fadeAnim,
          },
        ]}
      >
        {children}
      </Animated.View>
    );
  };
  
  export default FadeInView;

  const styles = StyleSheet.create({
    fadeInView: {
        alignItems: 'center',
      },
  })