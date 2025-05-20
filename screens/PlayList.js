// Playlist.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { songs } from "../constants";
import CustomLinearGradient from "../components/CustomLinearGradient";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { theme, utils } from "../theme";

const { width, height } = Dimensions.get("window");

export default function PlayList({ navigation }) {
  const handleSongPress = (song) => {
    navigation.navigate("Music", { song });
  };

  const handleSearch = (text) => {
    setSearchText(text);
    // Add your search logic here, e.g., filtering data based on the search text
  };

  // Header component
  const renderHeader = () => {
    return (
      <CustomLinearGradient style={styles.gradient}>
        <View>
          <Header />
        </View>

        <SearchBar
          placeholder="Search Message By Pastor Korede Komaiya"
          onChangeText={handleSearch}
        />
      </CustomLinearGradient>
    );
  };

  // Footer component
  const renderFooter = () => {
    return <View style={styles.footer}></View>;
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => handleSongPress(item)}
        style={styles.songItem}
      >
        <Image source={{ uri: item.coverArtURI.uri }} style={styles.coverArt} />
        <View style={styles.songDetails}>
          <Text style={styles.songTitle}>{item.title}</Text>
          {/* <Text style={styles.artist}>{item.artist}</Text> */}
          {/* <Text style={styles.songURI}>{item.uri}</Text> */}
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={songs}
      numColumns={3}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader} // Add a header
      ListFooterComponent={renderFooter} // Add a footer
    />
  );
}

const styles = StyleSheet.create({
 
  gradient: {
    justifyContent: "center",
    height: 180,
  },

  cardContainer: {
    flexDirection:'row',
    marginHorizontal: 4,
    borderRadius: 3,
  },

  
  songItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: Platform.OS === "android" ? 112 : 122,
    height: 200,
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
  },
  coverArt: {
    width: 50,
    height: 50,
    marginTop: 50,
  },
  songDetails: {
    // flex: 1,
  },
  songTitle: {
    fontSize: 18,
    justifyContent: "center",
    textAlign: "center",
  },
  artist: {
    fontSize: 16,
    color: "black",
  },
  songURI: {
    fontSize: 12,
    color: "gray",
  },
  footer: {
    marginTop: 90,
  },
});
