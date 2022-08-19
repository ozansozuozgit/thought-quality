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
import Logo from '../assets/images/Logo.png';

export default function ForgotScreen() {
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
  const resetPasswordHandler = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(result => {
        console.log('result', result);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password reset email sent!',
          visibilityTime: 5000,
        });
      })
      .catch((error: any) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.nativeErrorMessage,
          visibilityTime: 5000,
        });
      });
  };
  return (
    <SafeAreaView style={{backgroundColor: '#000'}}>
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#000"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={resetPasswordHandler}>
          <Text style={styles.loginText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Go Back</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
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
    color: '#343434',
    fontSize: 18,
    fontWeight: 'bold',
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
  forgotContainer: {
    alignSelf: 'flex-end',
    marginRight: '15%',
    marginTop: -12,
    marginBottom: 20,
  },
});
