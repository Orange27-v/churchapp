import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioPlayer({ songs }) {
  const [sound, setSound] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    // Load the initial song
    loadSound();

    return () => {
      // Unload the sound when the component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSongIndex]);

  const loadSound = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: songs[currentSongIndex] }
    );

    setSound(newSound);
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const playNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  return (
    <View>
      <Text>{songs[currentSongIndex]}</Text>
      <Button title="Play" onPress={playSound} />
      <Button title="Pause" onPress={pauseSound} />
      <Button title="Next" onPress={playNextSong} />
    </View>
  );
}
