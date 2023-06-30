import notifee from '@notifee/react-native';
import React, {useEffect} from 'react';
import {
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {requestNotifications} from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import Emotions from '../components/Emotions';
import SubmitSession from '../components/SubmitSession';
import {SecondaryTitle, View} from '../components/Themed';
import Thoughts from '../components/Thoughts';
import WhatAreYouDoing from '../components/WhatAreYouDoing';
import {onCreateTriggerNotification} from '../utils/utils';

const MainScreen = () => {
  useEffect(() => {
    requestNotifications(['alert', 'sound'])
      .then(data => {
        console.log('data', data);
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.contentContainer}>
            <SecondaryTitle style={styles.title}>
              Select Emotion <Text style={styles.requiredText}>(Required)</Text>
            </SecondaryTitle>
            <Text style={styles.infoText}>
              Press and hold emotion for more options.
            </Text>
            <Emotions />

            <SecondaryTitle style={styles.title}>
              Enter Thoughts
              <Text style={styles.optionalText}> (Optional)</Text>
            </SecondaryTitle>

            <Thoughts />

            <SecondaryTitle style={styles.title}>
              What are you doing right now?
              <Text style={styles.optionalText}> (Optional)</Text>
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
    flex: 1,
    backgroundColor: '#292A2F',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: '70%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    marginBottom: 2,
    color: '#fff',
    fontSize: 18, // Adjust the font size as desired
  },
  requiredText: {
    fontSize: 12, // Adjust the font size as desired
    fontWeight: '400',
    color: '#BCA5D9',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    marginLeft: '3%',
  },
  optionalText: {
    fontSize: 12, // Adjust the font size as desired
    fontWeight: '400',
    color: '#BCA5D9',
  },
});

export default MainScreen;
