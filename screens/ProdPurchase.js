import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground, // Import ImageBackground
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import CustomLinearGradient from "../components/CustomLinearGradient";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";
import BookContainer from "../components/BookContainer";
import AuthButton from "../components/AutoButton";
import { Feather } from "@expo/vector-icons"; // Import the icon you want to use

const { width, height } = Dimensions.get("window");

const ProdPurchase = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const item = route.params?.item;

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={item.image} // Replace with your background image source
        style={styles.backgroundImage}
      >
        <CustomLinearGradient style={styles.gradient}>
          <View style={styles.CompContainer}>
            <Header />
          </View>
          <SafeAreaView
            style={{
              flex: 1, // Use flex: 1 to occupy the entire available space
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.cardContainer}>
              <Image style={styles.bookImage} source={item.image} />
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {item.text}
              </Text>
            </View>

            <View style={styles.card}>
              <View style={styles.section}>
                <Text style={styles.sectionTextTop}>4.5</Text>
                <Text style={styles.sectionText}>rating</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTextTop}>190</Text>
                <Text style={styles.sectionText}>Numbers of Pages</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTextTop}>Eng</Text>
                <Text style={styles.sectionText}>Lang</Text>
              </View>
            </View>
          </SafeAreaView>
        </CustomLinearGradient>
      </ImageBackground>

      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          marginTop: 80,
          width: "auto",
          // height:40,
        }}
      >
        <View>
          <Text
            style={{
              width: 380,
              fontWeight: "400",
              padding: 10,
              letterSpacing: 0.8,
              fontSize: 16,
              color:'#000',
              textAlign: "justify",
            }}
          >
            {item.Description}
          </Text>
        </View>
        <View style={{ padding: 20 }}>
          <AuthButton text="Get Ebook" backgroundColor="#b60b2e" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProdPurchase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  gradient: {
    justifyContent: "center",
    padding: 8,
    height: 550,
  },
  CompContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: Platform.OS === "android" ? 150 : 125,
    height: 200, // Adjust the height to accommodate both image and text
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Platform.OS === "android" ? 18 : 30,
    zIndex: 999,
    borderRadius: 3,
    marginVertical: 50,
    backgroundColor: "lightgray", // Card background color
    borderRadius: 3,
    elevation: 3, // Card elevation (for Android)
    shadowColor: "#000", // Shadow color (for iOS)
    shadowOpacity: 10.9, // Shadow opacity (for iOS)
    shadowRadius: 10, // Shadow radius (for iOS)
  },
  backgroundImage: {
    flex: 1, // Ensure it covers the entire screen
    resizeMode: "cover", // Cover the entire container
    height: 500,
  },
  bookImage: {
    width: Platform.OS === "android" ? 160 : 165,
    height: 250,
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 5,
  },
  card: {
    backgroundColor: "rgba(112, 11, 46, 0.4)",
    borderRadius: 10, // Rounded corners
    padding: 20, // Spacing inside the card
    flexDirection: "row", // Arrange sections horizontally
    justifyContent: "space-between", // Space sections evenly
    alignItems: "center", // Center items vertically
    elevation: 3, // Card elevation (for Android)
    shadowColor: "#000", // Shadow color (for iOS)
    shadowOpacity: 10.2, // Shadow opacity (for iOS)
    shadowRadius: 3, // Shadow radius (for iOS)
    marginTop: 15,
    marginVertical: 15,
    width: 365, // Set the desired width here
  },
  section: {
    alignItems: "center", // Center items horizontally within sections
  },
  sectionTextTop: {
    fontSize: 18, // Adjust text size as needed
    fontWeight: "bold",
    color: "white",
  },
  sectionText: {
    fontSize: 14, // Adjust text size as needed
    color: "white",
  },
});
