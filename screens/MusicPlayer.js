import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import moment from "moment";
import { theme } from "../theme";

export default function Music({ route, navigation }) {
  const { song } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state



  useEffect(() => {
    if (sound) {
      sound.getStatusAsync().then((status) => {
        setDuration(status.durationMillis / 1000);
        setIsLoading(false); // Set isLoading to false when audio is loaded
      });
    }
  }, [sound]);



  useEffect(() => {
    return () => {
      if (sound) {
        sound.stopAsync();
      }
      setIsPlaying(false);
    };
  }, [sound]);




  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        setPosition(status.positionMillis / 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, sound]);


  async function playSound() {
    if (sound) {
      // Check if a song is already playing
      if (isPlaying) {
        await sound.stopAsync(); // Stop the currently playing song
      }
      await sound.playAsync(); // Play the new song
      setIsPlaying(false);
    } else {
      const { sound } = await Audio.Sound.createAsync({
        uri: song.uri,
      });
      setSound(sound);
      setIsLoading(false);
      await sound.playAsync();
      setIsPlaying(true);
    }
  }
  

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }

    navigation.goBack();
  }

  function formatTime(timeInSeconds) {
    return moment.utc(timeInSeconds * 1000).format("mm:ss");
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      playSound();
    }, 1000); // Delay playback for 5 seconds
    return () => clearTimeout(delay);
  }, []);

  return (
    <View style={styles.container}>
       {isLoading ? (
        <ActivityIndicator size="large" color={theme.red} />
      ) : (

       <>
      <Image source={{ uri: song.coverArtURI.uri }} style={styles.coverArt} />
      <Text style={styles.songTitle}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>
     
        <React.Fragment>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor={theme.red}
            maximumTrackTintColor="#000000"
            thumbTintColor={theme.red}
            onValueChange={(value) => {
              setPosition(value);
            }}
            onSlidingComplete={async (value) => {
              if (sound) {
                await sound.setPositionAsync(value * 1000);
              }
            }}
          />
          <Text style={styles.currentTime}>
            {formatTime(position)} / {formatTime(duration)}
          </Text>
         
            <View style={styles.controlButtons}>
            <TouchableOpacity onPress={playSound} style={styles.playPauseButton}>
                <Text style={styles.backButtonText}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={pauseSound} style={styles.playPauseButton}>
                <Text style={styles.playPauseButtonText}>Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={stopSound} style={styles.playPauseButton}>
                <Text style={styles.backButtonText}>Stop</Text>
              </TouchableOpacity>

            
            </View>
         
        </React.Fragment>
        </> 
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  coverArt: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  songTitle: {
    fontSize: 24,
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    marginBottom: 10,
  },
  slider: {
    width: "80%",
  },
  currentTime: {
    marginTop: 10,
  },
  controlButtons: {
    justifyContent: "space-between",
    alignContent:'center',
    flexDirection: "row",
    marginTop: 20,
    gap:20,
  },
  playPauseButton: {
    backgroundColor: theme.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
   
  },
  playPauseButtonText: {
    color: "white",
  },
  backButton: {
    backgroundColor: theme.red,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButtonText: {
    color: "white",
  },
});
