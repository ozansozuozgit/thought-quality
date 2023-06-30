import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppSelector} from '../app/hooks';
import AppleStyleSwipeableRow from '../components/AppleStyleSwipeableRow';
import {View} from '../components/Themed';
import {SessionType} from '../types';
import {
  convertMsToHM,
  firestoreGetDataCreatedBefore,
  limitCharacter,
  returnIcon,
} from '../utils/utils';

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

  const fetchLatestSession = async () => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 7);
    if (!user.uid) return;

    try {
      const querySnapshot: any = await firestoreGetDataCreatedBefore(
        user.uid,
        endDate,
        1,
      );

      if (!querySnapshot.length) {
        setLatestSession(null);
        return;
      }

      const session = querySnapshot[0];
      setLatestSession(session);

      const {iconName, iconColor} = returnIcon(session.emotionName);
      setIconDetails({iconName, iconColor});
    } catch (error) {
      console.log('Error fetching latest session:', error);
    }
  };

  useEffect(() => {
    fetchLatestSession();
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      fetchLatestSession();
    }, []),
  );

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    const now = new Date();
    const oneDay = 60 * 60 * 24 * 1000;

    if (now - date < oneDay) {
      return convertMsToHM(now - date) || '';
    }

    return date.toString() || '';
  };

  return (
    <View style={styles.container}>
      <AppleStyleSwipeableRow allowSwipe={false}>
        {latestSession && (
          <TouchableOpacity
            style={styles.sessionContainer}
            onPress={() =>
              navigation.navigate('SessionView', {
                emotionName: latestSession.emotionName ?? '',
                createdAt: latestSession.createdAt ?? '',
                note: latestSession.note ?? '',
                iconName: iconDetails.iconName ?? '',
                iconColor: iconDetails.iconColor ?? '',
                sessionID: latestSession.sessionID ?? '',
              } as any)
            }>
            <Text style={styles.date}>
              {formatDate(latestSession.createdAt)}
            </Text>
            <View style={styles.infoContainer}>
              <MaterialIcons
                name={iconDetails.iconName}
                size={32}
                color={iconDetails.iconColor}
                style={styles.icon}
              />
              <Text style={styles.note}>
                {limitCharacter(
                  latestSession.note ?? 'Create your first session! :)',
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
  container: {
    width: '90%',
    marginLeft: '5%',
    marginTop: -15,
  },
  sessionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c7edfc',
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
