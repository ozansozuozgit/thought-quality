import React from 'react';

import {StyleSheet, Text} from 'react-native';
import {View} from '../components/Themed';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Quote({session}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          The happiness of your life depends upon the quality of your thoughts.
        </Text>
        <Text style={styles.author}>Marcus Aurelius</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {width: '92%'},
  author: {textAlign: 'right', fontSize: 14},
  quote: {fontSize: 18},
});
