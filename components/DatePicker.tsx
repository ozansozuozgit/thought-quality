import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {Text, View} from '../components/Themed';
import {setSessions} from '../features/user/userSlice';
import {
  firestoreGetDataCreatedBefore,
  firestoreGetDataCreatedInRange,
  firestoreGetDataSpecificDate,
} from '../utils/utils';

export default function DatePicker() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const [openDropDown, setOpenDropDownMenu] = useState<boolean>(false);
  const [openCalender, setOpenCalendar] = useState<boolean>(false);
  const [selectedDateTitle, setSelectedDateTitle] =
    useState<string>('Last 24 Hours');

  const [dropDownValue, setDropdownValue] = useState<number>(1);
  // const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<any>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(null);

  const [items, setItems] = useState<Array<{label: string; value: number}>>([
    {label: '12 hours', value: 0.5},
    {label: '24 hours', value: 1},
    {label: '3 Days', value: 3},
    {label: '5 Days', value: 5},
    {label: '7 Days', value: 7},
    {label: '15 Days', value: 15},
    {label: '30 Days', value: 30},
    {label: '60 Days', value: 60},
  ]);

  async function onDateChange(date: any, type: any) {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  }

  useEffect(() => {
    async function getData() {
      var nextDay = new Date(
        selectedEndDate._d.getTime() + 12 * 60 * 60 * 1000,
      );
      const data: any = await firestoreGetDataCreatedInRange(
        user.uid ?? '',
        selectedStartDate._d,
        nextDay,
        100,
      );
      setSelectedDateTitle(
        `${selectedStartDate._d.toDateString()} - ${selectedEndDate._d.toDateString()}`,
      );
      setOpenCalendar(false);
      dispatch(setSessions(data));
    }
    if (selectedStartDate !== null && selectedEndDate !== null) {
      getData();
    }
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    getInfoFromDatabase();
  }, [dropDownValue]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getInfoFromDatabase();
  //   }, [dropDownValue]),
  // );

  async function getInfoFromDatabase() {
    var ts = Math.round(new Date().getTime());
    var endDate = new Date(ts - 24 * dropDownValue * 3600 * 1000);

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
            allowRangeSelection={true}
            selectedRangeStyle={{backgroundColor: '#BCA5D9'}}
            selectedDayStyle={{backgroundColor: '#BCA5D9'}}
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
    alignItems: 'center',
    zIndex: 5,
  },
  secondaryContainer: {
    width: '90%',
  },
  calendarContainer: {
    position: 'absolute',
    backgroundColor: '#e6f5fb',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
    textAlign: 'center',
    paddingBottom: 20,
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
  },
  iconContainer: {
    backgroundColor: '#e6f5fb',
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
