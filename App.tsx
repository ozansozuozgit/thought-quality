import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {Navigation, LoginRegisterNavigation} from './navigation';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useAppDispatch} from './app/hooks';
import {setUserDetailsFromGoogle} from './features/user/userSlice';
import {View, StyleSheet} from 'react-native';
import {diffInDaysFromToday} from './utils/utils';
import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    try {
      SplashScreen.hide();

      auth().onAuthStateChanged(userState => {
        setUser(userState);
        console.log('useState changed', userState);
        if (userState !== undefined && userState !== null) {
          dispatch(
            setUserDetailsFromGoogle({
              name: userState?.displayName ?? '',
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
    } catch (e) {
      Sentry.captureException(e);
    }
  }, []);

  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {user ? (
          <Navigation colorScheme={colorScheme} />
        ) : (
          <LoginRegisterNavigation colorScheme={colorScheme} />
        )}
      </SafeAreaProvider>
    );
  }
};

const styles = StyleSheet.create({});
export default Sentry.wrap(App);
