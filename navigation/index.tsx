/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import MainScreen from '../screens/MainScreen';
import StatsScreen from '../screens/StatsScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
// import LinkingConfiguration from './LinkingConfiguration';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SessionsScreen from '../screens/SessionsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SessionViewScreen from '../screens/SessionViewScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotScreen from '../screens/ForgotScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{title: 'Oops!'}}
      />
      <Stack.Group screenOptions={{presentation: 'card'}}>
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{title: 'f'}}
        />
        <Stack.Screen
          name="SessionView"
          component={SessionViewScreen}
          options={{title: 'Session'}}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="MainScreen"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="MainScreen"
        component={MainScreen}
        options={({navigation}: RootTabScreenProps<'MainScreen'>) => ({
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcon name="home" color={color} size={32} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({pressed}) => ({
                opacity: pressed ? 0.5 : 1,
              })}></Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          headerShown: false,
          title: 'Stats',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcon name="chart-pie" color={color} size={32} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SessionsScreen"
        component={SessionsScreen}
        options={{
          title: 'Sessions',
          headerShown: false,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcon
              name="checkbox-multiple-blank"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcon name="account" color={color} size={32} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export function LoginRegisterNavigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      // linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <LoginRegisterRootNavigator />
    </NavigationContainer>
  );
}
function LoginRegisterRootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Login', headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Register', headerShown: false}}
      />
            <Stack.Screen
        name="Forgot"
        component={ForgotScreen}
        options={{title: 'Forgot', headerShown: false}}
      />
    </Stack.Navigator>
  );
}
