import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LoadingAnimation = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/ladinganimation.gif')} 
        style={styles.gif}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 430,
    height: 932,
  },
});

export default LoadingAnimation;