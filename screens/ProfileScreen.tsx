import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageStyle,
  Platform,
} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useAppSelector} from '../app/hooks';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function ProfileScreen({
  navigation,
}: RootTabScreenProps<'ProfileScreen'>) {
  // const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Text>ProfileScreen Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? '10%' : 0,

    height: '100%',
  },
});
