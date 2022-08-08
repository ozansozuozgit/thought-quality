import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {View} from '../components/Themed';
import {EmotionsEnums} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Emotion from '../components/Emotion';
interface EmotionsTypes {
  emotion: number;
  setEmotion: Function;
}
export default function Emotions({setEmotion, emotion}: EmotionsTypes) {
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
    // alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    // height: '30%',
    // padding:'2%'
  },
  emotionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    backgroundColor: '#fdfdfd4f',
    // backgroundColor: '#f9f9f9',
    // opacity: 0.5,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    // height: '20%',
    flexBasis: '30%',
    borderColor: '#000',
    padding: 10,
  },
  emotionContainerFocused: {
    opacity: 1,
    backgroundColor: '#fdfdfd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    flexBasis: '30%',
    borderColor: '#343434',
    padding: 10,
  },
  emotionLabel: {
    marginTop: 5,
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  emotionLabelFocused: {
    marginTop: 5,
    color: '#343434',
    fontSize: 15,
    fontWeight: 'bold',
  },
  emotionImage: {
    height: 32,
    width: 32,
  },
  emotionSecondaryContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
