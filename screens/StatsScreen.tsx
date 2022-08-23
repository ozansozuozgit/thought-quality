import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {SecondaryTitle, View} from '../components/Themed';

import BarChart from '../components/BarChart';
import DatePicker from '../components/DatePicker';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';

export default function StatsScreen() {
  return (
    <SafeAreaView style={{backgroundColor: '#292A2F'}}>
      <View style={styles.container}>
        <DatePicker />
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <PieChart />
          {/* <BarChart /> */}
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
