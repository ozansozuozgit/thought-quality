import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import {View} from '../components/Themed';

import DatePicker from '../components/DatePicker';
import PieChart from '../components/PieChart';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <DatePicker />
      <PieChart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '65%',
    paddingTop: Platform.OS === 'ios' ? '19%' : 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
