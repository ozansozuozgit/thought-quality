import React from 'react';

import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
// import {View} from '../components/Themed';
import {EmotionsEnums} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {setEmotion} from '../features/user/userSlice';
import {Keyboard} from 'react-native';

export default function Emotions({emotion}: any) {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const {name, icon, quality} = emotion;

  const emotionHandler = (name: string, quality: number) => {
    Keyboard.dismiss(); // To make thoughts textarea unfocus
    dispatch(setEmotion({name, quality}));
  };
  return (
    <TouchableOpacity
      style={
        user.emotion?.name === name
          ? [styles.emotionContainer, {backgroundColor: '#C386C7'}]
          : styles.emotionContainer
      }
      onPress={() => emotionHandler(name, quality)}>
      <View style={styles.emotionSecondaryContainer}>
        <MaterialIcons
          name={icon}
          size={32}
          color={user.emotion?.name === name ? '#FFFFFF' : '#32353C'}
        />
        <Text
          style={
            user.emotion?.name === name
              ? [styles.emotionLabel, {color: '#FFFFFF'}]
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
    marginTop: 15,
    borderRadius: 12,
    // borderWidth: 1,
    borderColor: 'grey',
    // backgroundColor: '#e8f0fe',
    backgroundColor: '#8AA4F4',
    width: '30%',
    padding: 10,
  },
  emotionLabel: {
    marginTop: 5,
    color: '#32353C',
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
