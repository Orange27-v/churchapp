import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import CustomLinearGradient from "../components/CustomLinearGradient";
import { Video } from "expo-av";
import { theme } from "../theme";
import { videoUrl } from "../constants";
import { useFocusEffect } from "@react-navigation/native";

const LiveTv = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoPlayer = useRef(null);

  const handleLoadEnd = () => {
    setIsVideoLoaded(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isVideoLoaded) {
        videoPlayer.current.replayAsync(); // Replay the video if it was loaded before
      } else {
        // Load the video
        videoPlayer.current.loadAsync({ uri: videoUrl }).then(() => {
          videoPlayer.current.playAsync();
        });
      }

      // Pause the video when the screen loses focus
      return () => {
        if (isVideoLoaded) {
          videoPlayer.current.pauseAsync();
        }
      };
    }, [isVideoLoaded])
  );

  return (
    <View style={styles.container}>
      <CustomLinearGradient style={styles.gradient}>
        <View style={styles.CompContainer}>
          <Header/>
        </View>
      </CustomLinearGradient>
      {!isVideoLoaded ? ( // Show ActivityIndicator while the video is loading
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.red} />
          <Text style={styles.loadingText}>Master's television Loading...</Text>
        </View>
      ) : null}
      <View style={styles.videoContainer}>
        <Video
          ref={videoPlayer}
          source={{ uri: videoUrl }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          isLooping
          onReadyForDisplay={handleLoadEnd}
        />
      </View>
    </View>
  );
};

export default LiveTv;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -80,
  },
  video: {
    width: 350,
    height: 200,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    color: theme.red,
    fontWeight: "700",
    fontSize: 13,
  },
});
