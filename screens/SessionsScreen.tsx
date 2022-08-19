import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useAppSelector} from '../app/hooks';
import Session from '../components/Session';
import DatePicker from '../components/DatePicker';
import FilterPicker from '../components/FilterPicker';

export default function SessionsScreen({
  navigation,
}: RootTabScreenProps<'SessionsScreen'>) {
  const user = useAppSelector(state => state.user);

  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <View style={styles.container}>
        <DatePicker />
        <FilterPicker />

        <View style={styles.secondaryContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: '80%'}}>
            {!!user?.sessions?.length &&
              user?.filteredSessions === null &&
              user.sessions?.map((session, index) => (
                <Session session={session} key={session.sessionID ?? index} />
              ))}
            {!!user?.filteredSessions?.length &&
              user.filteredSessions?.map((session, index) => (
                <Session session={session} key={session.sessionID ?? index} />
              ))}
            {!user?.sessions?.length && !!user?.filteredSessions !== null && (
              <Text style={styles.noSessions}>No Sessions</Text>
            )}
            {/* {user?.sessions?.length && !user?.filteredSessions !== null && (
              <Text style={styles.noSessions}>No Sessions</Text>
            )} */}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'ios' ? '15%' : 0,
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
    marginTop: '10%',
    marginBottom: '5%',
    marginLeft: '3%',
  },
  secondaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '5%',
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },
  noSessions: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 22,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#e6f5fb',
    width: '100%',
    display: 'none',
  },
  iconContainer: {
    backgroundColor: '#fdfdfd4f',
    borderRadius: 15,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#343434',
    borderWidth: 1,
    marginLeft: '5%',
  },
  icon: {},
  filterContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    zIndex: 122,
  },
});
