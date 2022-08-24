import _debounce from 'lodash/debounce';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setWhatUserIsDoing} from '../features/user/userSlice';

const WhatAreYouDoing = (props: any) => {
  const [active, setActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);
  const user = useAppSelector(state => state.user);

  function handleDebounceFn(inputValue: string) {
    dispatch(setWhatUserIsDoing(inputValue));
  }

  function handleChange(text: string) {
    setValue(text);
    debounceFn(text);
  }

  useEffect(() => {
    if (user.whatUserIsDoing === '') {
      setValue('');
    }
  }, [user.whatUserIsDoing]);
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        editable
        maxLength={500}
        placeholder="I am working out. etc..."
        style={
          active
            ? [styles.activity, {backgroundColor: '#fff', color: '#000'}]
            : styles.activity
        }
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChangeText={handleChange}
        value={value}
        multiline
        numberOfLines={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '10%',
  },
  activity: {
    width: '92%',
    backgroundColor: '#e6f5fb',
    color: '#000',
    fontSize: 16,
    borderColor: 'grey',

    // borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    height: '100%',
  },
});

export default WhatAreYouDoing;
