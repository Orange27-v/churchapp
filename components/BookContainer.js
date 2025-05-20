import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { bookData } from "../constants";

const BookContainer = ({ customHeight, customWidth }) => {
  const navigation = useNavigation();

  const routeDetails = () => {
    navigation.navigate("PdfReader");
  };

  const pdfViewRoute = (item) => {
    navigation.navigate("Purchase", { item });
  };

  const handleRoute = (item) => {
    const navigateTo = item.status === 0 ? pdfViewRoute : routeDetails;
    navigateTo(item);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {bookData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => handleRoute(item)}
          >
            <Image
              source={item.image} // Replace this with the actual image source
              // style={[styles.bookImage, {height: customHeight}]}
              style={[
                styles.bookImage,
                { height: customHeight || 200, width: customWidth || 125 },
              ]}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollViewContent: {
    flexDirection: "row",
  },
  itemContainer: {
    // width: Platform.OS === "android" ? 145 : 145,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
    // elevation: 5, // Add elevation (shadow for Android)
    // shadowColor: "#000", // Shadow color (for iOS)
    // shadowOpacity: 0.2, // Shadow opacity (for iOS)
    // shadowOffset: { width: 0, height: 2 }, // Shadow offset (for iOS)
    // borderRadius: 10,
  },

  bookImage: {
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 10,
  },

  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookContainer;
