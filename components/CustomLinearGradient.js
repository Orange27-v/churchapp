import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const CustomLinearGradient = ({ children, style }) => {
  return (
    <LinearGradient
      colors={["rgba(182, 11, 46, 1)", "rgba(102, 0, 47, 0.74)"]}
      start={{ x: 1.1, y: 1.5 }}
      end={{ x: 0.5, y: 0.1 }}
      style={[styles.gradient, style]} // Merge the provided style with the default style
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    justifyContent: "center",
    // padding: 13,
    marginBottom:10,
   
  },
});

export default CustomLinearGradient;
