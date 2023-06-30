import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  setLatestSessionToggle,
  setNote,
  setWhatUserIsDoing,
} from '../features/user/userSlice';
import { addSessionToFirebase } from '../utils/utils';

const SubmitSession = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  const showToast = useCallback(() => {
    Toast.show({
      type: 'success',
      text1: 'Session was recorded 👍',
    });
  }, []);

  function submitThoughtQuality() {
    const result = addSessionToFirebase(user);
    if (result as any) {
      showToast();
      dispatch(setLatestSessionToggle(!user.latestSessionToggle));
      dispatch(setNote(''));
      dispatch(setWhatUserIsDoing(''));
    } else {
      console.log('error');
    }
  }

  return (
    <View style={styles.submitButtonContainer}>
      <TouchableOpacity
        onPress={submitThoughtQuality}
        style={styles.submitButton}>
        <Text style={styles.submitLabel}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  submitButton: {
    display: 'flex',
    width: '30%',
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: '#343434',
    borderWidth: 1,
  },
  submitLabel: {
    color: '#343434',
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SubmitSession;
