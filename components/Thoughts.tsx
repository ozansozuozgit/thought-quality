import React, {useState, useCallback, useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setNote} from '../features/user/userSlice';
import _debounce from 'lodash/debounce';

const Thoughts = (props: any) => {
  const [active, setActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>('');
  const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);
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
      <TextInput
        {...props}
        editable
        maxLength={500}
        placeholder="Strongest thoughts/feelings?"
        style={
          active
            ? [styles.thoughts, {backgroundColor: '#fff', color: '#000'}]
            : styles.thoughts
        }
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChangeText={handleChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  thoughtsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '10%',
  },
  thoughts: {
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

export default Thoughts;
