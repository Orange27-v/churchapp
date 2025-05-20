import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons"; // Import Expo Feather icons
import { theme } from "../theme";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {
  BookOpenIcon,
  ChatBubbleBottomCenterTextIcon,
  HomeIcon,
  PlayCircleIcon,
} from "react-native-heroicons/outline";

const iconStyles = {
  container: {
    alignItems: "center",
    justifyContent: "space-around",
    width: 70,
    height: 50,
    borderRadius: 2,
    flexDirection: "column",
    position: "relative",
    bottom: Platform.OS === "android" ? 20 : 12,
  },
  text: {
    fontSize: 9, // Adjust the font size as needed
    color: theme.bleched,
    marginTop: 0, // Add spacing between the icon and text if needed
    fontWeight: "700",
  },
};

// Custom icon component for the "Page" tab
export const PageIcon = ({ color, text }) => (
  <View style={iconStyles.container}>
    <HomeIcon size={34} color={color} style={{ fontWeight: 20 }} />
    <Text style={iconStyles.text}>{text}</Text>
  </View>
);

// Custom icon component for the "About" tab
export const AboutIcon = ({ color, text }) => (
  <View style={iconStyles.container}>
    <BookOpenIcon size={34} color={color} style={{ fontWeight: 20 }} />
    <Text style={iconStyles.text}>{text}</Text>
  </View>
);

// Custom icon component for the "News" tab
export const NewsIcon = ({ color, text }) => {
  return (
    <View style={iconStyles.container}>
      <PlayCircleIcon  color={color}   size={34}  />
      <Text style={iconStyles.text}>{text}</Text>
    </View>
  );
};

// Custom icon component for the "Watch" tab
export const PlayIcon = ({ color, text }) => (
  <View style={iconStyles.container}>
    <Ionicons name="ios-tv-outline" size={34} color={color} />
    <Text style={iconStyles.text}>{text}</Text>
  </View>
);
export const ChatIcon = ({ color, text }) => (
  <View style={iconStyles.container}>
    <ChatBubbleBottomCenterTextIcon  size={34} color={color} />
    <Text style={iconStyles.text}>{text}</Text>
  </View>
);
