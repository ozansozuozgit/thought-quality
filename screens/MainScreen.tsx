import React, {useEffect} from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  Linking,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import {View, SecondaryTitle} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import Emotions from '../components/Emotions';
import Thoughts from '../components/Thoughts';
import Toast from 'react-native-toast-message';
import LatestSession from '../components/LatestSession';
import SubmitSession from '../components/SubmitSession';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  requestNotifications,
  checkNotifications,
} from 'react-native-permissions';

const MainScreen = ({navigation}: RootTabScreenProps<'MainScreen'>) => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Session was recorded 👍',
    });
  };
  useEffect(() => {
    requestNotifications(['alert', 'sound'])
      .then(data => {
        console.log('data');
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container} darkColor="#f4f4f4">
          <SecondaryTitle>Primary Emotion</SecondaryTitle>
          <Emotions />

          <SecondaryTitle>
            Thoughts
            <Text style={{fontSize: 12, fontWeight: '400', color: '#c7edfc'}}>
              {' '}
              (Optional)
            </Text>
          </SecondaryTitle>

          <Thoughts multiline numberOfLines={4} style={{padding: 10}} />

          {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
          <SecondaryTitle>Latest Session</SecondaryTitle>
          <LatestSession />
          <SubmitSession showToast={showToast} />
          <TouchableOpacity
            style={styles.buyMeCoffee}
            onPress={() =>
              Linking.openURL('https://www.buymeacoffee.com/ozansozuoz')
            }>
            <MaterialIcons name={'cup'} size={15} color={'#ffdd00'} />
            <Text style={{marginLeft: 5, color: '#fff', fontSize: 12}}>
              Buy Me Coffee :)
            </Text>
          </TouchableOpacity>
          <Toast />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'ios' ? '15%' : 0,
    height: '100%',
  },
  // separator:{
  //   height:1
  // }
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
