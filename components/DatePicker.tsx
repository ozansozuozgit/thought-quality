import React, {useState, useEffect} from 'react';
import {StyleSheet, ScrollView, Platform, TouchableOpacity} from 'react-native';
import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  firestoreGetDataCreatedBefore,
  firestoreGetDataSpecificDate,
} from '../utils/utils';
import {EmotionsEnums, SessionType} from '../types';
import firestore from '@react-native-firebase/firestore';
import Session from '../components/Session';
import {setSessions, selectUserName} from '../features/user/userSlice';
import CalendarPicker from 'react-native-calendar-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function DatePicker() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [openDropDown, setOpenDropDownMenu] = useState<boolean>(false);
  const [openCalender, setOpenCalendar] = useState<boolean>(false);
  const [selectedDateTitle, setSelectedDateTitle] =
    useState<string>('Last 24 Hours');

  const [dropDownValue, setDropdownValue] = useState<number>(1);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [items, setItems] = useState<Array<{label: string; value: number}>>([
    {label: '24 hours', value: 1},
    {label: '3 Days', value: 3},
    {label: '5 Days', value: 5},
    {label: '7 Days', value: 7},
    {label: '15 Days', value: 15},
    {label: '30 Days', value: 30},
    {label: '60 Days', value: 60},
  ]);

  async function onDateChange(date: any) {
    var nextDay = new Date(date._d.getTime() - 12 * 60 * 60 * 1000);

    const data: any = await firestoreGetDataSpecificDate(
      user.uid ?? '',
      nextDay,
      100,
    );
    setSelectedDateTitle(date._d.toDateString());
    setSelectedStartDate(date._d);
    setOpenCalendar(false);
    dispatch(setSessions(data));
  }

  useEffect(() => {
    getInfoFromDatabase();
  }, [dropDownValue]);

  async function getInfoFromDatabase() {
    const endDate = new Date(
      new Date().setDate(new Date().getDate() - dropDownValue),
    );
    const data: any = await firestoreGetDataCreatedBefore(
      user.uid ?? '',
      endDate,
      100,
    );
    const selectedLabel = items.find(
      (item: {value: number; label: string}) => item.value === dropDownValue,
    )?.label;
    setSelectedDateTitle(`Last ${selectedLabel}`);
    dispatch(setSessions(data));
  }
  return (
    <View style={styles.container}>
      {openCalender && (
        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={onDateChange}
            todayBackgroundColor="#e6ffe6"
            maxDate={new Date()}
          />
        </View>
      )}

      <Text style={styles.title}>Select a date range</Text>
      <View style={styles.secondaryContainer}>
        <View style={styles.filterContainer}>
          <DropDownPicker
            open={openDropDown}
            value={dropDownValue}
            items={items}
            setOpen={setOpenDropDownMenu}
            setValue={setDropdownValue}
            setItems={setItems}
            style={styles.dropdown}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setOpenCalendar(!openCalender)}>
            <MaterialIcons
              name={'calendar-month'}
              size={32}
              color={'#343434'}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.secondaryTitle}>{selectedDateTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? '10%' : 0,
    // minHeight: '100%',
    alignItems: 'center',
    // height: '100%',
    // paddingBottom: 100,
    zIndex: 1,
  },
  secondaryContainer: {
    width: '90%',
  },
  calendarContainer: {
    position: 'absolute',
    backgroundColor: '#fdfdfd',
    zIndex: 12,
    borderRadius: 10,
    marginTop: '50%',
    borderColor: '#343434',
    borderWidth: 1,
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
    backgroundColor: '#fdfdfd4f',
    width: '100%',
  },
  iconContainer: {
    backgroundColor: '#fdfdfd4f',
    // padding: 15,
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
    // justifyContent: 'space-between',
    width: '80%',
    zIndex: 122,
  },
});
