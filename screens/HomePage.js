import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import { dummyData } from "../constants";
import TimelineCard from "../components/TimelineCard";
import { useNavigation } from "@react-navigation/native";
import BookContainer from "../components/BookContainer";
import CardButton from "../components/Card";
import CustomLinearGradient from "../components/CustomLinearGradient";
import { useCustomFonts } from "../components/useCustomFonts";
import { theme } from "../theme";

const { width, height } = Dimensions.get("window");

const HomePage = () => {
  const navigation = useNavigation();
  const fontsLoaded = useCustomFonts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for demonstration purposes
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay time as needed
  }, []);

  const handleReadMore = (item) => {
    navigation.navigate("DetailScreen", { item });
  };

  const bookStoreRoute = () => {
    navigation.navigate("Books");
  };

  if (!fontsLoaded) {
    return null; // You might display a loading indicator here
  }

  return (
    <FlatList
      style={styles.container}
      data={dummyData}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <>
          <StatusBar style={"light"} />
          <CustomLinearGradient style={styles.gradient}>
            <Header />
            <View style={{ marginHorizontal: 10, marginVertical: 9 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "900",
                  fontFamily: "Roboto-Bold",
                  color: "white",
                }}
              >
                My Favorites
              </Text>
            </View>
            <CardButton />
          </CustomLinearGradient>
          <View style={{ marginHorizontal: 20, flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "900",
                fontFamily: "Roboto-Bold",
                color: "black",
                marginTop: 20,
              }}
            >
              Latest Books By Pastor Korede Komaiya
            </Text>

            <TouchableOpacity
              style={{
                marginTop: 20,
                positive: "relative",
                left: 56,
              }}
              onPress={bookStoreRoute}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  fontFamily: "Roboto-Bold",
                  color: "black",
                  marginHorizontal : Platform.OS == "android" ? -15 : 0,
                }}
              >
                See More
              </Text>
            </TouchableOpacity>
          </View>

          <BookContainer />

          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "900",
                fontFamily: "Roboto-Bold",
                color: "black",
              }}
            >
              Church Timeline Updates
            </Text>
          </View>
        </>
      }
      renderItem={({ item }) => (
        <TimelineCard
          key={item.id}
          title={item.title}
          clapsCount={item.claps}
          details={item.details}
          avatarsImage={item.avatars}
          imageSource={item.imageSource}
          onReadMore={() => handleReadMore(item)}
        />
      )}
      ListFooterComponent={
        <ActivityIndicator size="large" color={theme.red} style={{ margin: 20 }} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
});

export default HomePage;
