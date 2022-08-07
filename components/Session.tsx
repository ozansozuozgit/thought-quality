import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {View} from '../components/Themed';
import {SessionType} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {limitCharacter, returnIcon} from '../utils/utils';
import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';
import {useNavigation} from '@react-navigation/native';

export default function Session({session, allowSwipe = true}: any) {
  const navigation = useNavigation();
  const {emotionName = '', note = '', createdAt = ''} = session;

  const {iconName, iconColor} = returnIcon(emotionName);

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
    marginTop: 15,
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
