import React from 'react';
import { View, StyleSheet } from 'react-native';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const songs = [
    'https://themastersplace.org/assets/products/audios/Wisdom%20For%20Marital%20Success%20Pt.%202%20By%20Pst.%20KK%2020-08-23.mp3',
    'https://themastersplace.org/assets/products/audios/Wisdom%20For%20Marital%20Success%20Pt.%202%20By%20Pst.%20KK%2020-08-23.mp3',
    // Add more song URLs as needed
  ];

  return (
    <View style={styles.container}>
      <AudioPlayer songs={songs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
