import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {RootTabScreenProps} from '../types';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import Session from '../components/Session';
import DatePicker from '../components/DatePicker';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setFilteredSessions, reverseSessions} from '../features/user/userSlice';

export const FilterPicker = () => {
  const user = useAppSelector(state => state.user);
  const [items, setItems] = useState<Array<object>>([
    {label: 'Joy', value: 'Joy'},
    {label: 'Love', value: 'Love'},
    {label: 'Neutral', value: 'Neutral'},
    {label: 'Anger', value: 'Anger'},
    {label: 'Sadness', value: 'Sadness'},
    {label: 'Fear', value: 'Fear'},
  ]);
  const [openDropDown, setOpenDropDownMenu] = useState<boolean>(false);
  const [sortingOption, setSortingOption] = useState<string>('desc');

  const [value, setValue] = useState<any>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFilteredSessions(value));
  }, [value, user.sessions]);

  return (
    <View
      style={{
        alignSelf: 'flex-end',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {value && (
        <TouchableOpacity
          style={{
            backgroundColor: '#e6f5fb',
            borderRadius: 5,
            marginRight: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
          }}
          onPress={() => {
            setValue(null);
          }}>
          <Text style={{color: '#343434', marginRight: 5}}>{value ?? ''}</Text>
          <MaterialIcons
            name={'minus-circle-outline'}
            size={20}
            color={'#c53723'}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          zIndex: 2,
          padding: 4,
          backgroundColor: '#e6f5fb',
          marginRight: '5%',
          borderRadius: 12,
          marginBottom: 15,
        }}>
        <MaterialIcons
          name={`arrow-${sortingOption === 'desc' ? 'down' : 'up'}`}
          size={32}
          color={'#343434'}
          style={styles.icon}
          onPress={() => {
            setSortingOption(sortingOption === 'desc' ? 'asc' : 'desc');
            dispatch(reverseSessions());
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          zIndex: 2,
          padding: 4,
          backgroundColor: '#e6f5fb',
          marginRight: '5%',
          borderRadius: 12,
          marginBottom: 15,
        }}>
        <MaterialIcons
          name={'filter-outline'}
          size={32}
          color={'#343434'}
          style={styles.icon}
          onPress={() => setOpenDropDownMenu(!openDropDown)}
        />
        <DropDownPicker
          open={openDropDown}
          value={value}
          items={items}
          setOpen={setOpenDropDownMenu}
          setValue={setValue}
          setItems={setItems}
          style={styles.dropdown}
          dropDownContainerStyle={{backgroundColor: '#fff'}}
          selectedItemContainerStyle={{
            backgroundColor: 'grey',
          }}
          containerStyle={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 100,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

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

export default FilterPicker;
