import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import RegisterScreen from './screens/RegisterScreen';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useAppDispatch} from './app/hooks';
import {setUserDetailsFromGoogle} from './features/user/userSlice';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  // const [userData, setUserData] = useState<any>('');
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);
      console.log('useState changed', userState);
      if (userState !== undefined) {
        console.log('before dispatch');
        dispatch(
          setUserDetailsFromGoogle({
            name: userState?.displayName ?? '',
            uid: userState?.uid ?? '',
            email: userState?.email ?? '',
            photoURL: userState?.photoURL ?? '',
            notes: [''],
          }),
        );
      }
      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {user ? <Navigation colorScheme={colorScheme} /> : <RegisterScreen />}
      </SafeAreaProvider>
    );
  }
}
