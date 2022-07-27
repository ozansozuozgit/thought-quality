import { useState } from 'react';
import { StyleSheet, Button, Image, ImageStyle, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useAppSelector, useAppDispatch } from '../app/hooks';


export default function RegisterScreen() {

  const [email, setEmail] = useState<string>('Email');
  const [password, setPassword] = useState<string>('Password');



  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <TextInput
        onChangeText={(text: string) => setPassword(text)}
        value={password}
      />
      <Button title='Submit' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop:40,
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  icon: {
    // color: 'black',
    // backgroundColor:'black',
    width: 32,
    height: 42,
  },
});
