import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function Thoughts(props:any) {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={40}
    />
  );
}

const styles = StyleSheet.create({});
