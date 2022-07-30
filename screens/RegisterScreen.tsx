import React, {useState} from 'react';
import {StyleSheet, Button, Image, ImageStyle, TextInput} from 'react-native';
import {Text, View} from '../components/Themed';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export default function RegisterScreen() {
  const [email, setEmail] = useState<string>('Email');
  const [password, setPassword] = useState<string>('Password');

  GoogleSignin.configure({webClientId: ''});
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  

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
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
        // disabled={this.state.isSigninInProgress}
      />
      <Button title="Submit" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 40,
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
