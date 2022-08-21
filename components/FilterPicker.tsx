import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useAppSelector, useAppDispatch} from '../app/hooks';
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
    <View style={styles.container}>
      {value && (
        <TouchableOpacity
          style={styles.selectedFilter}
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
        style={styles.sortingArrow}
        onPress={() => {
          setSortingOption(sortingOption === 'desc' ? 'asc' : 'desc');
          dispatch(reverseSessions());
        }}>
        <MaterialIcons
          name={`arrow-${sortingOption === 'desc' ? 'down' : 'up'}`}
          size={25}
          color={'#343434'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.filterIconContainer}
        onPress={() => setOpenDropDownMenu(!openDropDown)}>
        <MaterialIcons name={'filter-outline'} size={32} color={'#343434'} />
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
    alignSelf: 'flex-end',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  dropdown: {
    backgroundColor: '#e6f5fb',
    width: '100%',
    display: 'none',
  },
  selectedFilter: {
    backgroundColor: '#e6f5fb',
    borderRadius: 5,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginBottom: 8,
  },
  sortingArrow: {
    zIndex: 2,
    padding: 7,
    backgroundColor: '#e6f5fb',
    marginRight: '5%',
    borderRadius: 12,
    marginBottom: 15,
  },
  filterIconContainer: {
    zIndex: 2,
    padding: 4,
    backgroundColor: '#e6f5fb',
    marginRight: '5%',
    borderRadius: 12,
    marginBottom: 15,
  },
});

export default FilterPicker;
