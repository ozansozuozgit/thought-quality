import React from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  SafeAreaView,
} from 'react-native';
import {SecondaryTitle, View} from '../components/Themed';

import DatePicker from '../components/DatePicker';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';

export default function StatsScreen() {
  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <View style={styles.container}>
        <DatePicker />
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <PieChart />
          <BarChart />
          <LineChart />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    // marginBottom: '75%',
    // paddingTop: Platform.OS === 'ios' ? '15%' : 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
