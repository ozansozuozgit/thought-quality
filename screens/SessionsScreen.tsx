import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Platform} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import DropDownPicker from 'react-native-dropdown-picker';
import {firestoreGetDataCreatedBefore} from '../utils/utils';
import {EmotionsEnums, SessionType} from '../types';
import firestore from '@react-native-firebase/firestore';
import Session from '../components/Session';
import {setSessions, selectUserName} from '../features/user/userSlice';

export default function SessionsScreen({
  navigation,
}: RootTabScreenProps<'SessionsScreen'>) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [openDropDown, setOpenDropDownMenu] = useState<boolean>(false);
  const [dropDownValue, setDropdownValue] = useState<number>(1);
  const [sessionData, setSessionData] = useState<Array<SessionType> | null>(
    null,
  );
  const [items, setItems] = useState<Array<object>>([
    {label: 'Today', value: 1},
    {label: '3 Days', value: 3},
    {label: '5 Days', value: 5},
    {label: '7 Days', value: 7},
    {label: '15 Days', value: 15},
    {label: '30 Days', value: 30},
    {label: '60 Days', value: 60},
  ]);

  useEffect(() => {
    getInfoFromDatabase();
  }, [dropDownValue]);

  async function getInfoFromDatabase() {
    const endDate = new Date(
      new Date().setDate(new Date().getDate() - dropDownValue),
    );

    const querySnapshot: any = await firestoreGetDataCreatedBefore(
      user.uid ?? '',
      endDate,
    );

    const sessionArray: Array<SessionType> = [];
    querySnapshot?.forEach((doc: any) => {
      const emotionQuality = doc.data().emotionQuality;
      const createdAt = doc
        .data()
        .createdAt.toDate()
        .toLocaleDateString('en-US');

      sessionArray.push({
        date: createdAt,
        note: doc.data().note,
        emotion: doc.data().emotionName,
        sessionID: doc.data().sessionID,
      });
      console.log(doc.id, ' => ', doc.data());
      //Get duplicates and add the number of duplicates to the "y" field of the data
    });
    console.log('sessionArray', sessionArray);
    dispatch(setSessions(sessionArray));
    setSessionData(sessionArray);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a date range</Text>
      <View style={styles.secondaryContainer}>
        <DropDownPicker
          open={openDropDown}
          value={dropDownValue}
          items={items}
          setOpen={setOpenDropDownMenu}
          setValue={setDropdownValue}
          setItems={setItems}
          style={styles.dropdown}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 160}}>
          {user?.sessions?.length ? (
            user.sessions?.map((session, index) => (
              <Session session={session} key={session.sessionID ?? index} />
            ))
          ) : (
            <Text style={styles.noSessions}>No Sessions </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? '10%' : 0,
    // minHeight: '100%',
    alignItems: 'center',
    height: '100%',
    // paddingBottom: 100,
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
  noSessions: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 22,
    fontWeight: 'bold',
  },
  dropdown: {
    backgroundColor: '#fdfdfd4f',
  },
});
