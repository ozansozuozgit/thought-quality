import React, {useState, useEffect} from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {View} from '../components/Themed';
import {SessionType} from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {limitCharacter, returnIcon} from '../utils/utils';
import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '../app/hooks';
import {firestoreGetDataCreatedBefore} from '../utils/utils';

export default function LatestSession() {
  const navigation = useNavigation();

  const user = useAppSelector(state => state.user);
  const [latestSession, setLatestSession] = useState<SessionType | null>({
    emotionName: '',
    createdAt: new Date(),
    note: '',
  });
  const [iconDetails, setIconDetails] = useState<{
    iconName: string;
    iconColor: string;
  }>({iconName: 'circle-outline', iconColor: '#fff'});

  async function fetchLatestSession() {
    const endDate = new Date(new Date().setDate(new Date().getDate() - 7));
    const querySnapshot: any = await firestoreGetDataCreatedBefore(
      user.uid ?? '',
      endDate,
      1,
    );
    setLatestSession(querySnapshot[0]);
    const {iconName, iconColor} = returnIcon(querySnapshot[0].emotionName);

    setIconDetails({iconName, iconColor});
  }

  useEffect(() => {
    fetchLatestSession();
  }, []);

  useEffect(() => {
    fetchLatestSession();
  }, [user?.latestSessionToggle]);

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
                } as never,
              );
            }}>
            <Text style={styles.date}>
              {latestSession?.createdAt?.toString() ?? ''}
            </Text>
            <View style={styles.infoContainer}>
              <MaterialIcons
                name={iconDetails.iconName}
                size={32}
                color={iconDetails.iconColor}
                style={styles.icon}
              />
              <Text style={styles.note}>
                {limitCharacter(latestSession?.note ?? '', 40)}
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
    color:'#000'
  },
  icon: {
    width: '15%',
  },
  note: {
    width: '90%',
    fontSize: 15,
    color:'#000'
  },
});
