import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");


const ImageBackgroundComponent = ({ image }) => (
  <ImageBackground source={image} style={styles.item}>
    {/* Add any additional content or components over the image background */}
  </ImageBackground>
);

export default ImageBackgroundComponent;

const styles = StyleSheet.create({
  item: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + (Platform.OS === "android" ? 50 : 0),
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    alignSelf: "center",
  },
});
