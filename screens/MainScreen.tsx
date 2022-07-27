import React from 'react';
import { StyleSheet, Button, Image, ImageStyle } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, emotionArray } from '../types';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Emotions from '../components/Emotions';
import Thoughts from '../components/Thoughts';

export default function MainScreen({
  navigation,
}: RootTabScreenProps<'MainScreen'>) {
  const user = useAppSelector((state) => state.user);
  console.log('user is', user);
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate the quality of your thoughts</Text>
      <Emotions />
      <Thoughts
        multiline
        numberOfLines={4}
        onChangeText={(text: string) => onChangeText(text)}
        value={value}
        style={{ padding: 10 }}
      />
      <Button title='Submit' />
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
