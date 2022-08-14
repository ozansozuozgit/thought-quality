import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  Image,
  ImageStyle,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Text, View} from '../components/Themed';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();
  // console.log('navigation', navigation);

  GoogleSignin.configure({webClientId: ''});
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }
  const signInHandler = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.nativeErrorMessage,
          visibilityTime: 5000,
        });
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <View style={styles.container}>
        <Text style={styles.logo}>Thought Quality</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={signInHandler}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.accountContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{fontWeight: 'bold', color: '#BCA5D9'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />

        <GoogleSigninButton
          style={{width: 192, height: 48, borderRadius: 15}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
          // disabled={this.state.isSigninInProgress}
        />
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#e6f5fb',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#e6f5fb',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#000',
  },
  loginBtn: {
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: '#000',
  },

  accountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
    width: '80%',
    marginBottom: 20,
  },
});
