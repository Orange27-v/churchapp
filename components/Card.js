import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CardButton() {
  
  return (
    <View>
      <Cards />
    </View>
  );
}

const Cards = () => {

  const handleHomePress = () => {
    // Handle Search card press
    console.log("Search card pressed");
  };

  const handleNotificationsPress = () => {
    // Handle Notifications card press
    console.log("Notifications card pressed");
  };

  const handleProfilePress = () => {
    // Handle Profile card press
    console.log("Profile card pressed");
  };


  return (
    <View style={styles.mainContainer}>
      <View style={styles.containerCard}>
        <TouchableOpacity style={styles.card} onPress={handleHomePress}>
          <Ionicons name="earth-outline" size={30} color="white" />
          <Text style={styles.cardText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} >
          <Ionicons name="md-radio" size={30} color="white" />
          <Text style={styles.cardText}>Live Stream</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleNotificationsPress}>
          <Ionicons name="ios-card-outline" size={30} color="white" />
          <Text style={styles.cardText}>Giving</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleProfilePress}>
          <Ionicons name="md-calendar-outline" size={30} color="white" />
          <Text style={styles.cardText}>Events</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerCard}>
        <TouchableOpacity style={styles.card} onPress={handleProfilePress}>
          <Ionicons name="book-outline" size={30} color="white" />
          <Text style={styles.cardText}>Devotional</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleHomePress}>
          <Ionicons name="play-circle-outline" size={30} color="white" />
          <Text style={styles.cardText}>Media Library</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={handleNotificationsPress}
        >
          <Ionicons name="ios-location-outline" size={30} color="white" />
          <Text style={styles.cardText}>Locations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleProfilePress}>
          <Ionicons name="ios-library-outline" size={30} color="white" />
          <Text style={styles.cardText}>e-Books</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 2,
    marginBottom: 25,
  },

  containerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingTop: 4,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 252, 253, 0.28)",
    paddingVertical: 16,
    borderRadius: 2,
    marginHorizontal: 2,
    // shadowColor: "black",
    shadowOffset: { width: 10, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 4,
  },
  cardText: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
  },
});
