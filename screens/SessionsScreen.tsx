import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useAppSelector} from '../app/hooks';
import DatePicker from '../components/DatePicker';
import FilterPicker from '../components/FilterPicker';
import Session from '../components/Session';
import {SecondaryTitle, Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';

export default function SessionsScreen({
  navigation,
}: RootTabScreenProps<'SessionsScreen'>) {
  const user = useAppSelector(state => state.user);

  const renderSessions = () => {
    if (user.filteredSessions !== null && user.filteredSessions.length > 0) {
      return user.filteredSessions.map((session, index) => (
        <Session session={session} key={session.sessionID ?? index} />
      ));
    } else if (user.sessions !== null && user.sessions.length > 0) {
      return user.sessions.map((session, index) => (
        <Session session={session} key={session.sessionID ?? index} />
      ));
    } else {
      return <Text style={styles.noSessions}>No Sessions</Text>;
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: '#292A2F'}}>
      <View style={styles.container}>
        <DatePicker />
        <FilterPicker />
        <View style={styles.secondaryContainer}>
          <Text style={styles.title}>Sessions</Text>
          <ScrollView contentContainerStyle={{paddingBottom: '100%'}}>
            {renderSessions()}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    position: 'relative',
  },
  secondaryContainer: {
    width: '90%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '0%',
    marginBottom: '5%',
    marginLeft: '3%',
  },
  noSessions: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
