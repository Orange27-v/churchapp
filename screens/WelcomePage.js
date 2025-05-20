import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useCustomFonts } from '../components/useCustomFonts'; // Adjust the path accordingly
import { theme } from "../theme/index";
import { data } from "../constants";

import {
  Dimensions,
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Animated,
  Text,
} from "react-native";
import AuthButton from "../components/AutoButton";

const { width, height } = Dimensions.get("window");

const android = Platform.OS === "android";


const Item = ({ image }) => (
  <ImageBackground source={image} style={styles.item}>
    {/* Add any additional content or components over the image background */}
  </ImageBackground>
);

const ScrollDot = ({ index, currentIndex }) => {
  const dotStyle = {
    width: index === currentIndex ? 30 : 10,
    height: 8,
    borderRadius: 3,
    marginHorizontal: 5,
    backgroundColor:
    index === currentIndex ? "#b60b2e" : "rgba(255, 255, 255, 0.5)",
  };

  return <View style={dotStyle} />;
};

const WelcomePage = () => {
  const navigation = useNavigation();

  const fontsLoaded = useCustomFonts();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef(null);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  const onScrollEnd = (event) => {
    const { contentOffset } = event.nativeEvent;
    const scrollIndex = Math.floor(contentOffset.x / width);
    const lastIndex = data.length - 1;

    if (scrollIndex === lastIndex + 1) {
      // Scrolled to the virtual image right after the last real image
      // Snap back to the initial background image
      const newOffset = 0;
      scrollRef.current.scrollToOffset({ offset: newOffset, animated: true });
      setCurrentIndex(0);
    } else {
      setCurrentIndex(scrollIndex);
    }
  };

  if (!fontsLoaded) {
    return null; // You might display a loading indicator here
  }

  const renderItem = ({ item }) => <Item image={item.image} />;

  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />

      <FlatList
        ref={scrollRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          onScroll(event);
        }}
        onMomentumScrollEnd={(event) => {
          onScrollEnd(event);
        }}
        scrollEventThrottle={16}
        snapToInterval={width}
        decelerationRate="fast"
      />

      <View style={styles.overlay}>
        <LinearGradient
          colors={["#000", "rgba(0, 0, 0, 0.5)"]}
          start={{ x: 1.0, y: 0.5 }}
          end={{ x: 0.5, y: 0.5 }}
          style={styles.gradient}
        >
          <View>
            <Text style={styles.headerText}>Our Mission</Text>
            <Text style={styles.headerInfo}>
              To Reform, Rebuild and Restore humanity and the planet earth back
              to glory, honour and dignity by raising influencers
            </Text>
          </View>

          <AuthButton
            text="Login"
            onPress={() => navigation.navigate('Login')}
            backgroundColor="#b60b2e"
          />

          <AuthButton
            text="Register"
            onPress={() => navigation.navigate('Register')} 
            backgroundColor="#b60b2e"
          />

        </LinearGradient>
      </View>

      <View style={styles.scrollDots}>
        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <ScrollDot key={index} index={index} currentIndex={currentIndex} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "transparent",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    height: height*0.40,
  },

  item: {
    width: width,
    height: height + (android ? 50 : 0),
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    alignSelf: "center",
  },
  scrollDots: {
    position: "absolute",
    top: height / 2 - 15, // Adjust the positioning as needed
    left: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height*0.1,
  },
  headerText: {
    fontSize: 20,
    color: theme.white,
    fontWeight: "bold",
    fontFamily: "OpenSans",
  },
  headerInfo: {
    fontSize: 15,
    color: theme.white,
    fontWeight: "bold",
    marginBottom: 15,
    fontFamily: "OpenSans",
  },
});

export default WelcomePage;
