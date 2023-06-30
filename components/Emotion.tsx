import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setEmotion} from '../features/user/userSlice';
import {getEmotionCategory} from '../utils/utils';

const Emotions = ({emotion}: any) => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [active, setActive] = useState<boolean>(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('');
  const {name, icon, quality} = emotion;

  const emotionCategory = getEmotionCategory(name);

  const emotionHandler = (nameSelected: string, qualitySelected: number) => {
    Keyboard.dismiss(); // To make thoughts textarea unfocus
    dispatch(setEmotion({name: nameSelected, quality: qualitySelected}));
  };

  useEffect(() => {
    setSelectedEmotion(name);
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.emotionContainer,
        {
          backgroundColor:
            user.emotion?.name === name ||
            emotionCategory.includes(user.emotion?.name || '')
              ? '#e6f5fb'
              : 'transparent',
        },
      ]}
      onPress={() => {
        setSelectedEmotion(name);
        emotionHandler(name, quality);
      }}
      onLongPress={() => setActive(true)}>
      <View style={styles.emotionSecondaryContainer}>
        <MaterialIcons
          name={icon}
          size={32}
          color={
            user.emotion?.name === name ||
            emotionCategory.includes(user.emotion?.name || '')
              ? '#343434'
              : '#fff'
          }
        />
        <Text
          style={[
            styles.emotionLabel,
            {
              color:
                user.emotion?.name === name ||
                emotionCategory.includes(user.emotion?.name || '')
                  ? '#343434'
                  : '#fff',
            },
          ]}>
          {selectedEmotion}
        </Text>
      </View>
      <Menu opened={active}>
        <MenuTrigger />
        <MenuOptions>
          {emotionCategory.map((emotionName: string) => (
            <MenuOption
              key={emotionName}
              text={emotionName}
              onSelect={() => {
                setSelectedEmotion(emotionName);
                setActive(false);
                emotionHandler(emotionName, 0);
              }}
            />
          ))}
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  emotionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    marginTop: 15,
    borderRadius: 12,
    borderColor: 'grey',
    backgroundColor: 'transparent',
    width: '30%',
    padding: 10,
  },
  emotionLabel: {
    marginTop: 5,
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  emotionSecondaryContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default Emotions;
