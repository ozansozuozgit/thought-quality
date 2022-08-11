import React from 'react';
import {StyleSheet, View} from 'react-native';
// import {View} from '../components/Themed';
import Emotion from '../components/Emotion';

export default function Emotions() {
  const emotions: Array<{name: string; icon: string; quality: number}> = [
    {name: 'Love', icon: 'emoticon-kiss-outline', quality: 6},
    {name: 'Joy', icon: 'emoticon-excited-outline', quality: 5},
    {name: 'Neutral', icon: 'emoticon-neutral-outline', quality: 4},
    {name: 'Anger', icon: 'emoticon-angry-outline', quality: 3},
    {name: 'Sadness', icon: 'emoticon-sad-outline', quality: 2},
    {name: 'Fear', icon: 'emoticon-frown-outline', quality: 1},
  ];
  return (
    <View style={styles.emotionsContainer}>
      {emotions.map(emotion => (
        <Emotion emotion={emotion} key={emotion.quality} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  emotionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});
