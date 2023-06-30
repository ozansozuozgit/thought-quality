import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setWhatUserIsDoing} from '../features/user/userSlice';

const WhatAreYouDoing = (props: any) => {
  const [active, setActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const debounceFn = useCallback(handleDebounceFn, []);
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
      <View
        style={
          active
            ? [styles.activityContainer, {backgroundColor: '#fff'}]
            : styles.activityContainer
        }>
        <TextInput
          {...props}
          editable
          maxLength={500}
          placeholder="I am working out, etc..."
          style={styles.activity}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onChangeText={handleChange}
          value={value}
          multiline
          numberOfLines={4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '10%',
  },
  activityContainer: {
    width: '92%',
    backgroundColor: '#e6f5fb',
    borderRadius: 5,
  },
  activity: {
    color: '#000',
    fontSize: 16,
    borderColor: 'grey',
    padding: 15,
    height: '100%',
  },
});

export default WhatAreYouDoing;
