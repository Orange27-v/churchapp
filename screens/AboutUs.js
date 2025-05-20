import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import moment from 'moment';
import Slider from '@react-native-community/slider';

// Import the audioURI constant from the external file
import { audioURI } from '../constants';

export default function MusicPlay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [position, setPosition] = useState(0); // Position of the audio in seconds
  const [duration, setDuration] = useState(0); // Total duration of the audio in seconds

  useEffect(() => {
    // Update the duration when the audio is loaded
    if (sound) {
      sound.getStatusAsync().then((status) => {
        setDuration(status.durationMillis / 1000);
      });
    }
  }, [sound]);

  useEffect(() => {
    // Update the position of the audio every second
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
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      const { sound } = await Audio.Sound.createAsync({
        uri: audioURI, // Use the imported audioURI constant
      });
      setSound(sound);
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
  }

  function formatTime(timeInSeconds) {
    return moment.utc(timeInSeconds * 1000).format('mm:ss');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.songName}>Song Name</Text>
      <Slider
        style={styles.slider}
        value={position}
        maximumValue={duration}
        minimumTrackTintColor="#009688"
        maximumTrackTintColor="#999999"
        thumbTintColor="#009688"
        onSlidingComplete={(value) => sound.setPositionAsync(value * 1000)}
      />
      <Text style={styles.timer}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>
      {/* <View style={styles.controls}>
        {isPlaying ? (
          <>
            <Button title="Pause" onPress={pauseSound} />
            <Button title="Stop" onPress={stopSound} />
          </>
        ) : (
          <Button title="Play" onPress={playSound} />
        )}
      </View> */}
       <View style={styles.controls}>
        {isPlaying && (
          <>
            <Button title="Pause" onPress={pauseSound} />
            <Button title="Stop" onPress={stopSound} />
          </>
        )}
        {!isPlaying && <Button title="Play" onPress={playSound} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  songName: {
    fontSize: 24,
    marginBottom: 20,
  },
  slider: {
    width: '80%',
    marginBottom: 20,
  },
  timer: {
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
