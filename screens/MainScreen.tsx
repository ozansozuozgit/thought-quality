import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageStyle,
  Platform,
  Button,
  Text,
} from 'react-native';
import {View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import Emotions from '../components/Emotions';
import Thoughts from '../components/Thoughts';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {EmotionsEnums} from '../types';
import Quote from '../components/Quote';
import Toast from 'react-native-toast-message';
import {SessionType} from '../types';
import {firestoreGetDataCreatedBefore} from '../utils/utils';
import Session from '../components/Session';
import {useFocusEffect} from '@react-navigation/native';

export default function MainScreen({
  navigation,
}: RootTabScreenProps<'MainScreen'>) {
  // const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [textValue, onChangeText] = React.useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<number>(
    EmotionsEnums.Neutral,
  );
  const [latestSession, setLatestSession] = useState<SessionType | null>(null);
  const [newSessionEntered, setNewSessionEntered] = useState<boolean>(false);

  async function signOut() {
    return auth().signOut();
  }

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Session was recorded 👍',
    });
  };

  function setEmotion(emotion: number) {
    setSelectedEmotion(emotion);
  }

  useFocusEffect(
    useCallback(() => {
      async function fetchLatestSession() {
        const endDate = new Date(new Date().setDate(new Date().getDate() - 7));
        const querySnapshot: any = await firestoreGetDataCreatedBefore(
          user.uid ?? '',
          endDate,
          1,
        );
        const session = querySnapshot?._docs[0]._data;
        session.createdAt = session.createdAt
          .toDate()
          .toLocaleDateString('en-US');
        setLatestSession(session);
        // querySnapshot?.forEach((doc: any) => {
        //   console.log(doc.id, ' => ', doc.data());
        // });
      }

      fetchLatestSession();
    }, []),
  );

  useEffect(() => {
    async function fetchLatestSession() {
      const endDate = new Date(new Date().setDate(new Date().getDate() - 7));
      const querySnapshot: any = await firestoreGetDataCreatedBefore(
        user.uid ?? '',
        endDate,
        1,
      );
      const session = querySnapshot?._docs[0]._data;
      session.createdAt = session.createdAt
        .toDate()
        .toLocaleDateString('en-US');
      setLatestSession(session);
    }

    fetchLatestSession();
  }, [newSessionEntered]);

  function submitThoughtQuality() {
    // const customDate = new Date(new Date().setDate(new Date().getDate() - 40));
    showToast();
    firestore()
      .collection('Users')
      .add({
        name: user.name,
        uid: user.uid,
        email: user.email,
        note: textValue,
        photoURL: user.photoURL,
        emotionQuality: selectedEmotion,
        createdAt: firestore.FieldValue.serverTimestamp(),
        // createdAt: firestore.Timestamp.fromDate(customDate),
        emotionName: EmotionsEnums[selectedEmotion],
      })
      .then(querySnapshot => {
        console.log('Session added!');
        querySnapshot.update({
          sessionID: querySnapshot.id,
        });
        showToast();
        setNewSessionEntered(!newSessionEntered);
        onChangeText('');
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Primary Emotion</Text>
      <Emotions setEmotion={setEmotion} emotion={selectedEmotion} />
      <Text style={styles.title}>Thoughts</Text>

      <Thoughts
        multiline
        numberOfLines={4}
        onChangeText={(text: string) => onChangeText(text)}
        value={textValue}
        style={{padding: 10}}
      />

      {/* <Button title="Sign Out" onPress={signOut} /> */}

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <Text style={styles.title}>Remember</Text>
      <Quote /> */}
      <Text style={styles.title}>Latest Session</Text>
      <View style={styles.sessionContainer}>
        {latestSession && (
          <Session session={latestSession} allowSwipe={false} />
        )}
      </View>
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity
          onPress={submitThoughtQuality}
          style={styles.submitButton}>
          <Text style={styles.submitLabel}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? '10%' : 0,
    height: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '3%',
    marginLeft: '3%',
  },
  submitButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  submitButton: {
    display: 'flex',
    width: '30%',
    borderRadius: 12,
    backgroundColor: '#fdfdfd4f',
    borderColor: '#343434',
    borderWidth: 2,
  },
  submitLabel: {
    color: '#343434',
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sessionContainer: {
    width: '90%',
    marginLeft: '5%',
  },
});
