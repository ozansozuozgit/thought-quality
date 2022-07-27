import React from 'react';
import { StyleSheet, Button, Image, ImageStyle } from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Emotions from '../components/Emotions';
import Thoughts from '../components/Thoughts';
import { RootTabScreenProps } from '../types';

export default function LoginScreen() {

  return (
    <View style={styles.container}>
      <Button title='Login With Google'  />
      <Text >Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    color: 'black',
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
