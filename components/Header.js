import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons from the library

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarContainer}>
        <Image
          source={require("../assets/image/avatar.jpg")} // Replace with the actual path to your avatar image
          style={styles.avatar}
        />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.notificationContainer}>
        <Ionicons name="notifications-outline" size={34} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between", // Change to space-between to evenly space the TouchableOpacity components
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 50,
    marginBottom: 30,
  },
  avatarContainer: {
    marginRight: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notificationContainer: {
    marginLeft: 16,
  },
});

export default Header;
