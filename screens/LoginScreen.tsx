import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  Image,
  ImageStyle,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
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
import {validateEmail, useTogglePasswordVisibility} from '../utils/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  GoogleSignin.configure({webClientId: ''});
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  }
  const toastHandler = (type: string, text1: string, text2: string) => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: 5000,
    });
  };
  const signInHandler = () => {
    if (!validateEmail(email)) {
      toastHandler('error', 'Input Error', 'Please enter a valid email.');
      return;
    }
    if (!email.length || !password.length) {
      toastHandler('error', 'Input Error', 'Please enter all fields.');
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        toastHandler('error', 'Error', error.nativeErrorMessage);
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: '#292A2F'}}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Login</Text> */}
        <Image source={Logo} style={styles.logo} />
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>
        <View
          style={[
            styles.inputView,
            {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="grey"
            onChangeText={(text: string) => {
              setPassword(text);
            }}
            value={password}
            secureTextEntry={passwordVisibility}
            enablesReturnKeyAutomatically
          />
          <Pressable onPress={handlePasswordVisibility} style={{zIndex: 2}}>
            <MaterialIcons name={rightIcon} size={22} color="#232323" />
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Forgot')}
          style={styles.forgotContainer}>
          <Text style={{fontWeight: 'bold', color: '#BCA5D9', fontSize: 12}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={signInHandler}>
          <Text style={styles.loginText}>Sign In</Text>
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
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#e6f5fb',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,  },
  inputText: {
    height: 50,
    color: '#000',
    width: '90%',

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
    fontSize: 20,
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
