import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {View} from '../components/Themed';
import {EmotionsEnums} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface EmotionsTypes {
  emotion: number;
  setEmotion: Function;
}
export default function Emotions({setEmotion, emotion}: EmotionsTypes) {

  return (
    <View style={styles.emotionsContainer}>
      <TouchableOpacity
        style={
          emotion === EmotionsEnums.Love
            ? styles.emotionContainerFocused
            : styles.emotionContainer
        }
        onPress={() => setEmotion(EmotionsEnums.Love)}>
        <View style={styles.emotionSecondaryContainer}>
          <MaterialIcons
            name="emoticon-kiss-outline"
            size={32}
            color={emotion === EmotionsEnums.Love ? '#fff' : '#000'}
          />
          <Text
            style={
              emotion === EmotionsEnums.Love
                ? styles.emotionLabelFocused
                : styles.emotionLabel
            }>
            Love
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          emotion === EmotionsEnums.Joy
            ? styles.emotionContainerFocused
            : styles.emotionContainer
        }
        onPress={() => setEmotion(EmotionsEnums.Joy)}>
        <View style={styles.emotionSecondaryContainer}>
          <MaterialIcons
            name="emoticon-excited-outline"
            size={32}
            color={emotion === EmotionsEnums.Joy ? '#fff' : '#000'}
          />
          <Text
            style={
              emotion === EmotionsEnums.Joy
                ? styles.emotionLabelFocused
                : styles.emotionLabel
            }>
            Joy
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          emotion === EmotionsEnums.Neutral
            ? styles.emotionContainerFocused
            : styles.emotionContainer
        }
        onPress={() => setEmotion(EmotionsEnums.Neutral)}>
        <View style={styles.emotionSecondaryContainer}>
          <MaterialIcons
            name="emoticon-neutral-outline"
            size={32}
            color={emotion === EmotionsEnums.Neutral ? '#fff' : '#000'}
          />
          <Text
            style={
              emotion === EmotionsEnums.Neutral
                ? styles.emotionLabelFocused
                : styles.emotionLabel
            }>
            Neutral
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          emotion === EmotionsEnums.Anger
            ? styles.emotionContainerFocused
            : styles.emotionContainer
        }
        onPress={() => setEmotion(EmotionsEnums.Anger)}>
        <View style={styles.emotionSecondaryContainer}>
          <MaterialIcons
            name="emoticon-angry-outline"
            size={32}
            color={emotion === EmotionsEnums.Anger ? '#fff' : '#000'}
          />
          <Text
            style={
              emotion === EmotionsEnums.Anger
                ? styles.emotionLabelFocused
                : styles.emotionLabel
            }>
            Anger
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          emotion === EmotionsEnums.Sadness
            ? styles.emotionContainerFocused
            : styles.emotionContainer
        }
        onPress={() => setEmotion(EmotionsEnums.Sadness)}>
        <View style={styles.emotionSecondaryContainer}>
          <MaterialIcons
            name="emoticon-sad-outline"
            size={32}
            color={emotion === EmotionsEnums.Sadness ? '#fff' : '#000'}
          />
          <Text
            style={
              emotion === EmotionsEnums.Sadness
                ? styles.emotionLabelFocused
                : styles.emotionLabel
            }>
            Sadness
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          emotion === EmotionsEnums.Fear
            ? styles.emotionContainerFocused
            : styles.emotionContainer
        }
        onPress={() => setEmotion(EmotionsEnums.Fear)}>
        <View style={styles.emotionSecondaryContainer}>
          <MaterialIcons
            name="emoticon-frown-outline"
            size={32}
            color={emotion === EmotionsEnums.Fear ? '#fff' : '#000'}
          />
          <Text
            style={
              emotion === EmotionsEnums.Fear
                ? styles.emotionLabelFocused
                : styles.emotionLabel
            }>
            Fear
          </Text>
        </View>
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
    flexWrap: 'wrap',
    // height: '50%',
  },
  emotionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    // backgroundColor: '#f9f9f9',
    opacity: 0.6,
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 2,
    // height: '20%',
    flexBasis: '30%',
    borderColor: '#000',
    padding: 10,
  },
  emotionContainerFocused: {
    opacity: 1,
    backgroundColor: '#343434',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    flexBasis: '30%',
    // borderColor: '#6728ff',
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
    color: '#fff',
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
