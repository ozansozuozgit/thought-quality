import React from 'react';
import {StyleSheet, Platform, Text} from 'react-native';
import {View, SecondaryTitle} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import Emotions from '../components/Emotions';
import Thoughts from '../components/Thoughts';
import Toast from 'react-native-toast-message';
import LatestSession from '../components/LatestSession';
import SubmitSession from '../components/SubmitSession';

const MainScreen = ({navigation}: RootTabScreenProps<'MainScreen'>) => {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Session was recorded 👍',
    });
  };

  return (
    <View style={styles.container} darkColor="#f4f4f4">
      <SecondaryTitle>Primary Emotion</SecondaryTitle>
      <Emotions />
      <SecondaryTitle>
        Thoughts
        <Text style={{fontSize: 12, fontWeight: '400',color:'#c7edfc'}}> (Optional)</Text>
      </SecondaryTitle>

      <Thoughts multiline numberOfLines={4} style={{padding: 10}} />

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <SecondaryTitle>Latest Session</SecondaryTitle>
      <LatestSession />
      <SubmitSession showToast={showToast} />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? '15%' : 0,
    height: '100%',
  },
  // separator:{
  //   height:1
  // }
});

export default MainScreen;
