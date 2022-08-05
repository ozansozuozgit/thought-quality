import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageStyle,
  Platform,
  Button,
} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import Emotions from '../components/Emotions';
import Thoughts from '../components/Thoughts';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {EmotionsEnums} from '../types';
import EditScreenInfo from '../components/EditScreenInfo';

export default function MainScreen({
  navigation,
}: RootTabScreenProps<'MainScreen'>) {
  // const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [textValue, onChangeText] = React.useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<number>(
    EmotionsEnums.Neutral,
  );

  async function signOut() {
    return auth().signOut();
  }

  function setEmotion(emotion: number) {
    console.log('emotion', emotion);
    setSelectedEmotion(emotion);
  }

  function submitThoughtQuality() {
    // const customDate = new Date(new Date().setDate(new Date().getDate() - 40));
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
        console.log('querySnapshot', querySnapshot);
        querySnapshot.update({
          sessionID: querySnapshot.id,
        });
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
      <Text style={styles.title}>Next Notification</Text>

      <TouchableOpacity
        onPress={submitThoughtQuality}
        style={styles.submitButton}>
        <Text style={styles.submitLabel}>Submit</Text>
      </TouchableOpacity>
      {/* <Button title="Sign Out" onPress={signOut} /> */}

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      <Button
        title="Test"
        onPress={() => navigation.navigate('Modal')}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? '10%' : 0,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '5%',
    marginLeft: '3%',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: 'red',
  },
  submitLabel: {
    backgroundColor: '#343434',
    color: '#fff',
    padding: 15,
    fontSize: 25,
    borderRadius: 25,
    borderColor: 'red',
  },
});
