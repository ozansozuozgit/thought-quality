import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {View} from '../components/Themed';
import {SessionType} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {limitCharacter} from '../utils/utils';
import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';
import {useNavigation} from '@react-navigation/native';

export default function Session({session, allowSwipe = true}: any) {
  const navigation = useNavigation();
  const {emotionName = '', note = '', createdAt = ''} = session;

  let iconName = 'circle-outline';
  let iconColor = '#000';
  if (emotionName === 'Love') {
    iconName = 'emoticon-kiss-outline';
    iconColor = '#9f4fbd';
  } else if (emotionName === 'Joy') {
    iconName = 'emoticon-excited-outline';
    iconColor = '#4f8af6';
  } else if (emotionName === 'Neutral') {
    iconName = 'emoticon-neutral-outline';
    iconColor = '#15ad01';
  } else if (emotionName === 'Anger') {
    iconName = 'emoticon-angry-outline';
    iconColor = '#fc3a00';
  } else if (emotionName === 'Sadness') {
    iconName = 'emoticon-sad-outline';
    iconColor = '#ff8c00';
  } else if (emotionName === 'Fear') {
    iconName = 'emoticon-frown-outline';
    iconColor = '#c53723';
  }

  return (
    <AppleStyleSwipeableRow allowSwipe={allowSwipe}>
      <TouchableOpacity
        style={styles.sessionContainer}
        onPress={() => {
          navigation.navigate(
            'SessionView' as never,
            {
              emotionName: emotionName ?? '',
              createdAt: createdAt ?? '',
              note: note ?? '',
              iconName: iconName ?? '',
              iconColor: iconColor ?? '',
            } as never,
          );
        }}>
        <Text style={styles.date}>{createdAt}</Text>
        <View style={styles.infoContainer}>
          <MaterialIcons
            name={iconName}
            size={32}
            color={iconColor}
            style={styles.icon}
          />
          <Text style={styles.note}>{limitCharacter(note, 40)}</Text>
        </View>
      </TouchableOpacity>
    </AppleStyleSwipeableRow>
  );
}

const styles = StyleSheet.create({
  sessionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#343434',
    borderWidth: 1,
    padding: 20,
    // marginTop: 15,
    borderRadius: 10,
    backgroundColor: '#fdfdfd4f',
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  date: {
    fontSize: 12,
    position: 'absolute',
    right: '5%',
    zIndex: 1,
    top: 5,
  },
  icon: {
    width: '15%',
  },
  note: {
    width: '90%',
    fontSize: 15,
  },
});
