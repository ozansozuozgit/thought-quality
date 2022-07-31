import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export default function Thoughts(props: any) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <View style={styles.thoughtsContainer}>
      <TextInput
        {...props}
        editable
        maxLength={500}
        placeholder="Any thoughts?"
        style={[styles.thoughts, {backgroundColor: active ? 'white' : ''}]}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  thoughtsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  thoughts: {
    width: '90%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
});
