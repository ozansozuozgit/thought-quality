import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  AppState,
  Switch,
  Alert,
} from 'react-native';
import {View} from '../components/Themed';
import {requestNotifications, openSettings} from 'react-native-permissions';

// import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  deleteAllSessionsFromFirebase,
  firestoreGetTotalUserSessionsLength,
} from '../utils/utils';
import {
  setSessions,
  resetSessions,
  resetState,
} from '../features/user/userSlice';
import Toast from 'react-native-toast-message';

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<'ProfileScreen'>) {
  const user = useAppSelector(state => state.user);
  const [totalSession, setTotalSession] = useState<number>(0);
  const [notificationEnabled, setNotificationsEnabled] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getLength() {
      const result: any = await firestoreGetTotalUserSessionsLength(
        user?.uid ?? '',
      );
      setTotalSession(result);
    }

    getLength();
  }, []);
  useEffect(() => {
    async function getLength() {
      const result: any = await firestoreGetTotalUserSessionsLength(
        user?.uid ?? '',
      );
      setTotalSession(result);
    }

    getLength();
  }, [user]);

  async function signOut() {
    dispatch(resetState());
    return auth().signOut();
  }

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      requestNotifications(['alert', 'sound'])
        .then(({status}) => {
          if (status === 'granted') {
            setNotificationsEnabled(true);
          } else {
            setNotificationsEnabled(false);
          }
        })
        .catch(e => console.log('ok'));
    });

    return () => {
      subscription.remove();
    };
  }, []);
  useEffect(() => {
    requestNotifications(['alert', 'sound'])
      .then(({status}) => {
        // …
        console.log(status);
        console.log('run request');
        if (status === 'granted') {
          setNotificationsEnabled(true);
        } else {
          setNotificationsEnabled(false);
        }
      })
      .catch(e => console.log(e));
  }, []);

  const showConfirmDialog = () => {
    return Alert.alert('Delete All Sessions?', 'This action is irreversible.', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: async () => {
          let result = await deleteAllSessionsFromFirebase(
            'Sessions',
            user?.uid ?? '',
          );
          if (result === true) {
            dispatch(resetSessions());
            Toast.show({
              type: 'success',
              text1: 'All sessions were deleted',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'There was a problem deleting sessions',
            });
          }
        },
      },
      {
        text: 'No',
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignSelf: 'center'}}>
            <View style={styles.profileImage}>
              <Image
                source={{
                  uri: user?.photoURL?.length
                    ? user.photoURL
                    : 'https://picsum.photos/200',
                }}
                style={styles.image}></Image>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
              {user.name}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, {fontSize: 24}]}>
                {user.creationTime}
              </Text>
              <Text style={[styles.text, styles.subText]}>Days Old</Text>
            </View>
            <View
              style={[
                styles.statsBox,
                {
                  borderColor: '#e6f5fb',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                },
              ]}>
              <Text style={[styles.text, {fontSize: 24}]}>{totalSession}</Text>
              <Text style={[styles.text, styles.subText]}>Sessions</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, {fontSize: 24}]}>100%</Text>
              <Text style={[styles.text, styles.subText]}>Awesome</Text>
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <View style={styles.optionContainer}>
              <View style={styles.notificationContainer}>
                <Text>Allow Notifications</Text>
                <Switch
                  value={notificationEnabled}
                  onValueChange={() =>
                    openSettings().catch(() =>
                      console.warn('cannot open settings'),
                    )
                  }
                />
              </View>
            </View>
            <View style={styles.optionContainer}>
              <MaterialIcons name={'email-outline'} size={32} />
              <Text style={{marginLeft: 10}}>{user.email}</Text>
            </View>
            {/* 
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={() =>
                Linking.openURL('https://www.buymeacoffee.com/ozansozuoz')
              }>
              <MaterialIcons name={'cup'} size={32} color={'#ffcf00'} />
              <Text style={{marginLeft: 10}}>Buy me coffee :)</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={showConfirmDialog}>
              <MaterialIcons name={'delete-forever-outline'} size={32} />
              <Text style={{marginLeft: 10}}>Delete All Sessions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionContainer} onPress={signOut}>
              <MaterialIcons name={'logout'} size={32} />
              <Text style={{marginLeft: 10}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    height: '100%',
  },
  text: {
    fontFamily: 'HelveticaNeue',
    color: '#e6f5fb',
  },
  image: {
    flex: 1,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: '#e6f5fb',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: 'hidden',
  },

  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  optionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f5fb',
    borderRadius: 15,
    width: '90%',
    marginTop: 20,
    padding: 10,
  },
  notificationContainer: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});
