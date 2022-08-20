import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {Navigation, LoginRegisterNavigation} from './navigation';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useAppDispatch} from './app/hooks';
import {setUserDetailsFromGoogle} from './features/user/userSlice';
import {diffInDaysFromToday, firestoreReturnDisplayName} from './utils/utils';
// import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';
import Toast from 'react-native-toast-message';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    // SplashScreen.hide();
    try {
      setTimeout(() => {
        auth().onAuthStateChanged(async userState => {
          setUser(userState);
          console.log('useState changed', userState);
          if (userState !== undefined && userState !== null) {
            // console.log();
            let name = '';
            if (userState.displayName === null) {
              console.log('true');
              name = await firestoreReturnDisplayName(userState.uid);
            }
            dispatch(
              setUserDetailsFromGoogle({
                name:
                  userState?.displayName !== null
                    ? userState?.displayName
                    : name,
                uid: userState?.uid ?? '',
                email: userState?.email ?? '',
                photoURL: userState?.photoURL ?? '',
                creationTime: diffInDaysFromToday(
                  userState?.metadata?.creationTime,
                ),
              }),
            );
          }
          if (loading) {
            setLoading(false);
          }
        });
      }, 100);
    } catch (e) {
      Sentry.captureException(e);
    }
  }, []);

  return (
    <>
      <SafeAreaProvider>
        {user ? (
          <Navigation colorScheme={colorScheme} />
        ) : (
          <LoginRegisterNavigation colorScheme={colorScheme} />
        )}
      </SafeAreaProvider>
      <Toast />
    </>
  );
};

export default Sentry.wrap(App);
