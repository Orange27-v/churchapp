import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AuthLink = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.link} onPress={onPress}>
      <Text style={styles.linkText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
  },
  linkText: {
    color: '#000',
    fontSize: 16,
  },
});

export default AuthLink;
