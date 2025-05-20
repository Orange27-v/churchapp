import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const DetailsScreen = ({ route }) => {

  const navigation = useNavigation();

  //   const route = useRoute();
  const { item } = route.params;

  const [buttonColor, setButtonColor] = useState("gray");

  const changeColor = () => {
    setButtonColor((prevColor) => (prevColor === "gray" ? "red" : "gray"));
  };

  return (
    <View style={styles.container}>
      <StatusBar style={"light"} />
      <Image source={item.imageSource} style={styles.ImageContainer} />

      <SafeAreaView style={styles.detailContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.leftBack}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.heartButton} onPress={changeColor}>
          <AntDesign name="heart" size={24} color={buttonColor} />
        </TouchableOpacity>
      </SafeAreaView>

      <View>
        <View style={styles.videoContainer}>
          <WebView
            source={{
              uri: "https://www.youtube.com/embed/R3jIz_VkAi8?si=PSdIOb_nnMWH4rNp&amp;controls=0",
            }}
            style={styles.videoPlayer}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageContainer: {
    height: 280,
    width: "100%",
    objectFit: "fill",
    justifyContent: "center",
    alignContent: "center",
  },
  detailContainer: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    marginTop: -10,
  },
  leftBack: {
    backgroundColor: "rgba(255, 255, 255, 2)",
    padding: 10,
    borderRadius: 100,
    marginTop: Platform.OS == "android" ? 45 : 0,
    marginLeft: 20,
  },

  heartButton: {
    backgroundColor: "rgba(255, 255, 255, 2)",
    padding: 10,
    borderRadius: 100,
    marginTop: Platform.OS == "android" ? 45 : 0,
    marginRight: 20,
  },
  videoContainer: {
    marginTop: 5,
    height: 250,
    width: "100%",
    padding: 10,
  },
  videoPlayer: {
    borderRadius: 10,
  },
  
});
