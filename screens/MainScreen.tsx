import React, {useState} from 'react';
import {StyleSheet, Button, Image, ImageStyle} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps, emotionArray} from '../types';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import Emotions from '../components/Emotions';
import Thoughts from '../components/Thoughts';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {EmotionsEnums} from '../types';

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
    setSelectedEmotion(emotion);
  }

  function submitThoughtQuality() {
    // const lastWeek = new Date(new Date().setDate(new Date().getDate() - 26));
    firestore()
      .collection('Users')
      .add({
        name: user.name,
        uid: user.uid,
        email: user.email,
        note: textValue,
        photoURL: user.photoURL,
        emotionQuality: selectedEmotion,
        createdAt: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log('User added!');
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate the quality of your thoughts</Text>
      <Emotions setEmotion={setEmotion} emotion={selectedEmotion} />
      <Thoughts
        multiline
        numberOfLines={4}
        onChangeText={(text: string) => onChangeText(text)}
        value={textValue}
        style={{padding: 10}}
      />
      <Button title="Submit" onPress={submitThoughtQuality} />
      <Button title="Sign Out" onPress={signOut} />

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  icon: {
    // color: 'black',
    // backgroundColor:'black',
    width: 32,
    height: 42,
  },
});
