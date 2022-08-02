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
        placeholder="Strongest thoughts/feelings?"
        style={styles.thoughts}
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
    // height: '25%',
    // backgroundColor: 'rgba(0, 0, 0, 0.07)',
    maxHeight: '10%',
  },
  thoughts: {
    width: '90%',
    // height: '100%',
    // backgroundColor: 'rgba(0, 0, 0, 0.07)',
    color: '#000',
    fontSize: 16,
    borderColor: '#r343434',
    borderWidth: 2,
    borderRadius:5,
    padding: 5,
    // maxHeight: '50%',
  },
});
