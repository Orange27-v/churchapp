import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomLinearGradient from "../components/CustomLinearGradient";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { bookData } from "../constants";
import AuthButton from "../components/AutoButton";

const BookScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState(""); // State for search text

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

  const handleSearch = (text) => {
    setSearchText(text);
    // Add your search logic here, e.g., filtering data based on the search text
  };

  // Function to render two cards at a time
  const renderTwoCards = ({ item }) => {
    const truncatedDescription =
      item.Description.length > 100
        ? `${item.Description.substring(0, 100)}...`
        : item.Description;

    return (
      <View>
        <View style={styles.cardContainer}>
          <TouchableOpacity key={item.id} onPress={() => handleRoute(item)}>
            <Image source={item.image} style={styles.bookImageTwo} />
          </TouchableOpacity>

          <View style={styles.bookDetails}>
            <Text style={styles.bookTitle}>{item.text}</Text>
            <Text style={styles.bookDescription}>{truncatedDescription}</Text>

            <AuthButton
              text="Get Ebook"
              onPress={() => {
                // Add your button functionality here
                console.log(`Button pressed for book ${item.text}`);
              }}
              backgroundColor="#b60b2e"
            />
          </View>

          <View style={styles.separator} />
        </View>
      </View>
    );
  };

  // Header component
  const renderHeader = () => {
    return (
      <View>
        <CustomLinearGradient style={styles.gradient}>
          <View>
            <Header />
          </View>
          <SearchBar
            placeholder="Search Books By Pastor Korede Komaiya"
            onChangeText={handleSearch}
          />
        </CustomLinearGradient>

        <View>
          <View
            style={{
              marginHorizontal: -5,
              padding: 15,
              marginVertical: 8,
              marginTop: -5,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "900",
                fontFamily: "Roboto-Bold",
                color: "black",
              }}
            >
              My Books
            </Text>
          </View>

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
                  style={styles.bookImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            marginHorizontal: -5,
            padding: 15,
            marginVertical: 8,
            marginTop: -5,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "900",
              fontFamily: "Roboto-Bold",
              color: "black",
            }}
          >
            Latest Books By Pastor Korede Komaiya
          </Text>
        </View>
      </View>
    );
  };

  // Footer component
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#b60b2e" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={bookData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTwoCards}
        ListHeaderComponent={renderHeader} // Add a header
        ListFooterComponent={renderFooter} // Add a footer
      />
    </View>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  gradient: {
    justifyContent: "center",
    height: 180,
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

  // bookImage: {
  //   resizeMode: "cover",
  //   marginBottom: 8,
  //   borderRadius: 10,
  // },

  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  cardContainer: {
    flex: 1,
    flexDirection: "row", // Arrange image and details side by side
    marginHorizontal: 8,
    marginBottom: 16,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  bookImage: {
    width: Platform.OS === "android" ? 160 : 162,
    resizeMode: "cover",
    borderRadius: 10,
    height: 215,
    width: 155,
  },
  bookImageTwo: {
    resizeMode: "cover",
    borderRadius: 10,
    height: 225,
    width: 165,
  },
  bookDetails: {
    flex: 1,
    marginLeft: 8,
    marginTop: 15,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bookDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "blue", // Customize the button color
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  separator: {
    borderBottomWidth: 20,
    borderBottomColor: "#000000",
    marginVertical: 8,
  },
  footer: {
    marginTop: 3,
    marginVertical: 80,
    alignItems: "center", // Center the ActivityIndicator horizontally
  },
  loadingText: {
    // marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: "#b60b2e", // Customize the text color
  },
});
