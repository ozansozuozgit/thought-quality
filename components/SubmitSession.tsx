import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {setLatestSessionToggle, setNote} from '../features/user/userSlice';
import {addUserToFirebase} from '../utils/utils';

const SubmitSession = ({showToast}: any) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  async function submitThoughtQuality() {
    // const customDate = new Date(new Date().setDate(new Date().getDate() - 40));
    const result = await addUserToFirebase(user);
    if (result) {
      showToast();
      dispatch(setLatestSessionToggle(!user.latestSessionToggle));
      dispatch(setNote(''));
    } else {
      console.log('error');
    }
  }
  return (
    <View style={styles.submitButtonContainer}>
      <TouchableOpacity
        onPress={submitThoughtQuality}
        style={styles.submitButton}>
        <Text style={styles.submitLabel}>Release </Text>
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
    padding: 15,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SubmitSession;
