import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {View} from '../components/Themed';
import {SessionType} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {limitCharacter} from '../utils/utils';

export default function Session({session}: any) {
  const {emotion, note, date} = session;
  let iconName = 'circle-outline';
  let iconColor = '#000';
  if (emotion === 'Love') {
    iconName = 'emoticon-kiss-outline';
    iconColor = '#9f4fbd';
  } else if (emotion === 'Joy') {
    iconName = 'emoticon-excited-outline';
    iconColor = '#4f8af6';
  } else if (emotion === 'Neutral') {
    iconName = 'emoticon-neutral-outline';
    iconColor = '#15ad01';
  } else if (emotion === 'Anger') {
    iconName = 'emoticon-angry-outline';
    iconColor = '#fff000';
  } else if (emotion === 'Sadness') {
    iconName = 'emoticon-sad-outline';
    iconColor = '#ff8c00';
  } else if (emotion === 'Fear') {
    iconName = 'emoticon-frown-outline';
    iconColor = '#fc3a00';
  }
  return (
    <TouchableOpacity style={styles.sessionContainer}>
      <Text style={styles.date}>{date}</Text>
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
  );
}

const styles = StyleSheet.create({
  sessionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // width: '95%',
    borderColor: '#343434',
    borderWidth: 1,
    padding: 20,
    marginTop: 15,
    borderRadius: 10,
    // backgroundColor: '#343434',
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: '#343434',
  },
  date: {
    // textAlign: 'right',
    // alignSelf: 'flex-end',
    fontSize: 12,
    position: 'absolute',
    right: '5%',
    zIndex: 1,
    top: 5,
  },
  icon: {
    // flex: 0.1,
    width: '15%',
  },
  note: {
    // flex: 0.6,
    width: '90%',
    fontSize: 15,
  },
});
