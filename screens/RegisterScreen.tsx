import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ImageStyle,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../assets/images/Logo.png';
import {Text, View} from '../components/Themed';
import {useTogglePasswordVisibility, validateEmail} from '../utils/utils';
export default function RegisterScreen() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();
  // console.log('navigation', navigation);
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }

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
  const signUpHandler = async () => {
    if (!validateEmail(email)) {
      toastHandler('error', 'Input Error', 'Please enter a valid email.');
      return;
    }
    if (!email.length || !name.length || !password.length) {
      toastHandler('error', 'Input Error', 'Please enter all fields.');
      return;
    }
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        await firestore()
          .collection('Users')
          .doc(res.user.uid)
          .set({uid: res.user.uid, displayName: name});
        console.log('User account created & signed in!');
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.nativeErrorMessage,
          visibilityTime: 5000,
        });
      });
  };
  const handleChange = (text: string) => {
    /^[a-zA-Z\s]*$/.test(text) ? setName(text) : ' ';
  };

  return (
    <SafeAreaView style={{backgroundColor: '#292A2F'}}>
      <View style={styles.container}>
        {/* <Text style={styles.logo}>Thought Quality</Text> */}
        <Image source={Logo} style={styles.logo} />
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            placeholderTextColor="grey"
            onChangeText={(text: string) => handleChange(text)}
            value={name}
          />
        </View>
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
        <TouchableOpacity style={styles.loginBtn} onPress={signUpHandler}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.accountContainer}>
          <Text>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{fontWeight: 'bold', color: '#BCA5D9'}}>Login</Text>
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
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 185,
            height: 40,
            marginTop: 10,
          }}
          onPress={() =>
            onAppleButtonPress().then(() =>
              console.log('Apple sign-in complete!'),
            )
          }
        />
      </View>
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
    paddingRight: 20,
  },
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
});
