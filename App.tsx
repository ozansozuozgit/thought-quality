import { SafeAreaProvider } from 'react-native-safe-area-context';
import React,{ useState } from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { store } from './app/store';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [userData, setUserData] = useState<any>('');


  console.log('test debugger');

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          {!userData ? (
            <Navigation colorScheme={colorScheme} />
          ) : (
            <RegisterScreen />
          )}
        </SafeAreaProvider>
      </Provider>
    );
  }
}
