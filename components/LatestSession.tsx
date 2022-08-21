import React, {useState, useEffect} from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {View} from '../components/Themed';
import {SessionType} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {limitCharacter, returnIcon, convertMsToHM} from '../utils/utils';
import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useAppSelector} from '../app/hooks';
import {firestoreGetDataCreatedBefore} from '../utils/utils';

export default function LatestSession() {
  const navigation = useNavigation();

  const user = useAppSelector(state => state.user);
  const [latestSession, setLatestSession] = useState<SessionType | null>({
    emotionName: 'Love',
    createdAt: new Date(),
    note: '',
  });
  const [iconDetails, setIconDetails] = useState<{
    iconName: string;
    iconColor: string;
  }>({iconName: 'circle-outline', iconColor: '#fff'});

  async function fetchLatestSession() {
    const endDate = new Date(new Date().setDate(new Date().getDate() - 7));
    if (!user.uid?.length) return;
    console.log('user.uid', user.uid);
    const querySnapshot: any = await firestoreGetDataCreatedBefore(
      user.uid ?? '',
      endDate,
      1,
    );
    if (!querySnapshot.length) {
      setLatestSession({});
      return;
    }
    setLatestSession(querySnapshot[0]);
    const {iconName, iconColor} = returnIcon(querySnapshot[0].emotionName);

    setIconDetails({iconName, iconColor});
  }

  useEffect(() => {
    fetchLatestSession();
  }, []);

  useEffect(() => {
    fetchLatestSession();
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      fetchLatestSession();
    }, []),
  );

  const dateIsToday = () => {
    let now = +new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    let sessionCreatedToday =
      now - latestSession?.createdAtMilliSeconds < oneDay;
    if (sessionCreatedToday) {
      return convertMsToHM(now - latestSession?.createdAtMilliSeconds) ?? '';
    }
    return latestSession?.createdAt?.toString() ?? '';
  };

  return (
    <View style={styles.container}>
      <AppleStyleSwipeableRow allowSwipe={false}>
        {latestSession && (
          <TouchableOpacity
            style={styles.sessionContainer}
            onPress={() => {
              navigation.navigate(
                'SessionView' as never,
                {
                  emotionName: latestSession.emotionName ?? '',
                  createdAt: latestSession.createdAt ?? '',
                  note: latestSession.note ?? '',
                  iconName: iconDetails.iconName ?? '',
                  iconColor: iconDetails.iconColor ?? '',
                  sessionID: latestSession.sessionID ?? '',
                } as never,
              );
            }}>
            <Text style={styles.date}>{dateIsToday()}</Text>
            <View style={styles.infoContainer}>
              <MaterialIcons
                name={iconDetails.iconName}
                size={32}
                color={iconDetails.iconColor}
                style={styles.icon}
              />
              <Text style={styles.note}>
                {limitCharacter(
                  latestSession?.note ?? 'Create your first session! :)',
                  40,
                )}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </AppleStyleSwipeableRow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {width: '90%', marginLeft: '5%', marginTop: -15},
  sessionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c7edfc',
    // borderWidth: 1,
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
    width: '15%',
  },
  note: {
    width: '90%',
    fontSize: 15,
    color: '#000',
  },
});
