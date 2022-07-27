import Sad from '../assets/images/sad.svg';
import Mad from '../assets/images/mad.svg';
import Neutral from '../assets/images/neutral.svg';
import Happy from '../assets/images/happy.svg';
import Joy from '../assets/images/joy.svg';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { View } from '../components/Themed';
import React from 'react';
export default function Emotions() {
  return (
    <View style={styles.emotionsContainer}>
      <TouchableOpacity onPress={() => Alert.alert('Simple Button pressed')}>
        <Sad width={40} height={40} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Mad width={40} height={40} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Neutral width={40} height={40} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Happy width={40} height={40} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Joy width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emotionsContainer: {
    // width:'80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
