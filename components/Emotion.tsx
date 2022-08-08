import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {View} from '../components/Themed';
import {EmotionsEnums} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {setEmotion} from '../features/user/userSlice';

export default function Emotions({emotion}: any) {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const {name, icon, quality} = emotion;

  const emotionHandler = (name: string, quality: number) => {
    dispatch(setEmotion({name, quality}));
  };
  return (
    <TouchableOpacity
      style={
        user.emotion?.name === name
          ? styles.emotionContainerFocused
          : styles.emotionContainer
      }
      onPress={() => emotionHandler(name, quality)}>
      <View style={styles.emotionSecondaryContainer}>
        <MaterialIcons
          name={icon}
          size={32}
          color={user.emotion?.name === name ? '#343434' : '#000'}
        />
        <Text
          style={
            user.emotion?.name === name
              ? styles.emotionLabelFocused
              : styles.emotionLabel
          }>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  emotionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    backgroundColor: '#fdfdfd4f',
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    width: '30%',
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
    width: '30%',
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
