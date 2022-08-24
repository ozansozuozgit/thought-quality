import notifee from '@notifee/react-native';
import React, {useEffect} from 'react';
import {
  Keyboard,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Emotions from '../components/Emotions';
import LatestSession from '../components/LatestSession';
import SubmitSession from '../components/SubmitSession';
import {SecondaryTitle, View} from '../components/Themed';
import Thoughts from '../components/Thoughts';
import WhatAreYouDoing from '../components/WhatAreYouDoing';
import {RootTabScreenProps} from '../types';
import {onCreateTriggerNotification} from '../utils/utils';
const MainScreen = ({navigation}: RootTabScreenProps<'MainScreen'>) => {
  useEffect(() => {
    requestNotifications(['alert', 'sound'])
      .then(data => {
        console.log('data');
      })
      .catch(e => console.log(e));
  }, []);

  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      Toast.show({
        type: 'success',
        text1: 'Welcome back! 👍',
      });
    }
  }

  useEffect(() => {
    bootstrap()
      .then(() => {})
      .catch(console.error);
    onCreateTriggerNotification();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: '#292A2F'}}>
      <ScrollView contentContainerStyle={{paddingBottom: '70%'}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container} darkColor="#f4f4f4">
            <SecondaryTitle>
              Select Emotion{' '}
              <Text style={{fontSize: 14, fontWeight: '400', color: '#BCA5D9'}}>
                {' '}
                (Required)
              </Text>{' '}
            </SecondaryTitle>
            <Emotions />

            <SecondaryTitle>
              Enter Thoughts
              <Text style={{fontSize: 14, fontWeight: '400', color: '#BCA5D9'}}>
                {' '}
                (Optional)
              </Text>
            </SecondaryTitle>

            <Thoughts />

            {/* <View style={styles.separator} /> */}
            <SecondaryTitle style={{fontSize: 20}}>
              What are you doing right now?{' '}
              <Text style={{fontSize: 14, fontWeight: '400', color: '#BCA5D9'}}>
                {' '}
                (Optional)
              </Text>
            </SecondaryTitle>
            <WhatAreYouDoing />
            <SubmitSession />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // justifyContent: 'center',
    backgroundColor: '#292A2F',
  },
  separator: {
    height: 2,
    width: '70%',
    alignSelf: 'center',
    backgroundColor: '#e6f5fb',
    marginTop: 10,
    // marginBottom: 10,
  },
});

export default MainScreen;
