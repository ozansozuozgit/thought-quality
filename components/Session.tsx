import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';
import {View} from '../components/Themed';
import {SessionType} from '../types';
import {convertMsToHM, limitCharacter, returnIcon} from '../utils/utils';

export default function Session({session, allowSwipe = true}: any) {
  const navigation = useNavigation();
  const {
    emotionName = '',
    note = '',
    createdAt = '',
    createdAtMilliSeconds = '',
    sessionID = '',
    whatUserIsDoing = ''
  } = session;

  const {iconName, iconColor} = returnIcon(emotionName);

  const dateIsToday = () => {
    let now = +new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    let sessionCreatedToday = now - createdAtMilliSeconds < oneDay;
    if (sessionCreatedToday) {
      return convertMsToHM(now - createdAtMilliSeconds);
    }
    return createdAt;
  };

  return (
    <AppleStyleSwipeableRow allowSwipe={allowSwipe} sessionID={sessionID}>
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
              sessionID: sessionID ?? '',
              whatUserIsDoing : whatUserIsDoing ?? ''
            } as never,
          );
        }}>
        <Text style={styles.date}>{dateIsToday()}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.icon}>
            <MaterialIcons
              name={iconName}
              size={32}
              color={iconColor}
              // style={styles.icon}
            />
          </View>
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
    backgroundColor: '#e6f5fb',
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
    color: '#000',
  },
  icon: {
    // width: '15%',
    backgroundColor: 'transparent',
    marginRight: '2%',
    borderRadius: 20,
  },
  note: {
    width: '90%',
    fontSize: 15,
    color: '#000',
  },
});
