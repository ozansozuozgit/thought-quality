import _debounce from 'lodash/debounce';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setNote} from '../features/user/userSlice';

const Thoughts = (props: any) => {
  const [active, setActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const debounceFn = useCallback(handleDebounceFn, []);
  const user = useAppSelector(state => state.user);

  function handleDebounceFn(inputValue: string) {
    dispatch(setNote(inputValue));
  }

  function handleChange(text: string) {
    setValue(text);
    debounceFn(text);
  }

  useEffect(() => {
    if (user.note === '') {
      setValue('');
    }
  }, [user.note]);

  return (
    <View style={styles.thoughtsContainer}>
      <View
        style={
          active
            ? [styles.thoughtsWrapper, {backgroundColor: '#fff'}]
            : styles.thoughtsWrapper
        }>
        <TextInput
          {...props}
          editable
          maxLength={500}
          placeholder="Strongest thoughts/feelings?"
          style={styles.thoughts}
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
  thoughtsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '10%',
  },
  thoughtsWrapper: {
    width: '92%',
    backgroundColor: '#e6f5fb',
    borderRadius: 5,
  },
  thoughts: {
    color: '#000',
    fontSize: 16,
    borderColor: 'grey',
    padding: 15,
    height: '100%',
  },
});

export default Thoughts;
