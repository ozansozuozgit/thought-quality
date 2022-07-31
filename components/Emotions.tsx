import React, {useState} from 'react';
import Sad from '../assets/images/sad.svg';
import Mad from '../assets/images/mad.svg';
import Neutral from '../assets/images/neutral.svg';
import Happy from '../assets/images/happy.svg';
import Joy from '../assets/images/joy.svg';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {View} from '../components/Themed';
import {EmotionsEnums} from '../types';

interface EmotionsTypes {
  emotion: number;
  setEmotion: Function;
}
export default function Emotions({setEmotion, emotion}: EmotionsTypes) {
  return (
    <View style={styles.emotionsContainer}>
      <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <Sad
          width={40}
          height={40}
          style={[
            styles.emotionSVG,
            {opacity: emotion === EmotionsEnums.Sad ? 1 : 0.6},
          ]}
          onPress={() => setEmotion(EmotionsEnums.Sad)}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Mad
          width={40}
          height={40}
          style={[
            styles.emotionSVG,
            {opacity: emotion === EmotionsEnums.Mad ? 1 : 0.6},
          ]}
          onPress={() => setEmotion(EmotionsEnums.Mad)}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Neutral
          width={40}
          height={40}
          style={[
            styles.emotionSVG,
            {opacity: emotion === EmotionsEnums.Neutral ? 1 : 0.6},
          ]}
          onPress={() => setEmotion(EmotionsEnums.Neutral)}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Happy
          width={40}
          height={40}
          style={[
            styles.emotionSVG,
            {opacity: emotion === EmotionsEnums.Happy ? 1 : 0.6},
          ]}
          onPress={() => setEmotion(EmotionsEnums.Happy)}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Joy
          width={40}
          height={40}
          style={[
            styles.emotionSVG,
            {opacity: emotion === EmotionsEnums.Joy ? 1 : 0.6},
          ]}
          onPress={() => setEmotion(EmotionsEnums.Joy)}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emotionsContainer: {
    // width:'80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  emotionSVG: {
    opacity: 0.7,
  },
});
