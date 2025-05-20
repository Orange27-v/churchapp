import {
  StyleSheet,
  View,
  Animated,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../theme";

const TimelineCard = ({
  title,
  imageSource,
  details,
  maxLines = 3,
  onReadMore,
  clapsCount,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [buttonColor, setButtonColor] = useState("gray");
  const [zoomAnimation] = useState(new Animated.Value(1));
  const [zoomedIn, setZoomedIn] = useState(false);
  const [clickSound, setClickSound] = useState(new Audio.Sound());

  useEffect(() => {
    async function loadClickSound() {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sound/mouse.wav")
      );
      setClickSound(sound);
    }
    loadClickSound();

    return () => {
      if (clickSound) {
        clickSound.unloadAsync();
      }
    };
  }, []);

  const changeColor = async () => {
    setButtonColor((prevColor) => (prevColor === "gray" ? "red" : "gray"));
    const toValue = zoomedIn ? 1 : 1.3; // Toggle between 1 and 1.3 scale values

    Animated.timing(zoomAnimation, {
      toValue: toValue,
      duration: 50,
      useNativeDriver: true,
    }).start();

    setZoomedIn(!zoomedIn);

    if (clickSound) {
      await clickSound.replayAsync();
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onReadMore}
      style={styles.container}
    >
      <Image source={imageSource} style={styles.image} />
      <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
        <TouchableOpacity style={styles.heartButton} onPress={changeColor}>
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{ scale: zoomAnimation }],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="hand-clap"
              size={24}
              color={buttonColor}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.subtitleWrapper}></View>
        <Text
          style={[
            styles.detailStyle,
            { maxHeight: expanded ? "120%" : 21 * maxLines },
          ]}
          numberOfLines={expanded ? undefined : maxLines}
        >
          {details}
        </Text>
        {details.length > 18 * maxLines && (
          <TouchableOpacity onPress={onReadMore}>
            <Text style={styles.readMore}>
              {expanded ? "Read Less" : "Read More..."}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.clapStyles}>
          <Text style={styles.clapText}>{`${clapsCount} Claps`}</Text>
        </View>
      </View>

      <View style={styles.avatarContainer}>
        {/* <Image source={avatarsImage} style={styles.avatar} /> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "fill",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imagePlaceholder: {
    width: "100%",
    height: 180,
    // Add any other styling you want for the placeholder
  },

  heartButton: {
    backgroundColor: "rgba(255, 255, 255, 2)",
    padding: 7,
    borderRadius: 50,
    position: "absolute",
    top: -50,
    right: 15,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    zIndex: 92,
  },

  textContainer: {
    padding: 25,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "700",
  },
  subtitleWrapper: {
    borderBottomWidth: 1,
    width: "auto",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  detailStyle: {
    marginTop: 5,
    fontSize: 15,
    textAlign: "justify",
    letterSpacing: 0.01,
    lineHeight: 20.5,
  },

  readMore: {
    color: theme.red,
    marginTop: 5,
    fontWeight: "500",
  },
  clapStyles: {
    alignSelf: "flex-end",
  },
  claspText: {
    fontSize: 20,
    fontWeight: "bold",
    
  },

  // avatarContainer: {
  //   flexDirection: "row",
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   borderRadius: 100,
  //   overflow: "hidden",
  //   margin: 5,
  //   zIndex: 1,
  // },
  // avatar: {
  //   width: 30,
  //   height: 30,
  //   borderRadius: 100,
  //   borderWidth: 2,
  //   borderColor: "#000",
  //   marginLeft: -10,
  // },
});

export default TimelineCard;
