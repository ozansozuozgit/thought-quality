import notifee from '@notifee/react-native';
import React, {useEffect} from 'react';
import {
  Keyboard,
  Linking,
  Platform,
  SafeAreaView,
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
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container} darkColor="#f4f4f4">
          <SecondaryTitle>Primary Emotion</SecondaryTitle>
          <Emotions />
          <SecondaryTitle>
            Thoughts
            <Text style={{fontSize: 12, fontWeight: '400', color: '#BCA5D9'}}>
              {' '}
              (Optional)
            </Text>
          </SecondaryTitle>

          <Thoughts multiline numberOfLines={4} />

          {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
          <SecondaryTitle>Latest Session</SecondaryTitle>
          <LatestSession />
          <SubmitSession />
          <TouchableOpacity
            style={styles.buyMeCoffee}
            onPress={() =>
              Linking.openURL('https://www.buymeacoffee.com/ozansozuoz')
            }>
            <MaterialIcons name={'cup'} size={15} color={'#c79d7b'} />
            <Text style={{marginLeft: 5, color: '#fff', fontSize: 12}}>
              Buy Me Coffee :)
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    // justifyContent: 'center',
    backgroundColor: '#292A2F',
  },
  buyMeCoffee: {
    color: '#fff',
    position: 'absolute',
    bottom: '2%',
    right: '2%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MainScreen;
