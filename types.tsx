/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  MainScreen: undefined;
  Stats: undefined;
  LoginScreen: undefined;
  SessionsScreen: undefined;
  ProfileScreen: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface Emotion {
  rating: number;
  name: string;
}

export enum EmotionsEnums {
  Fear = 1,
  Sadness,
  Anger,
  Neutral,
  Joy,
  Love,
}

export interface SessionType {
  emotion?: string;
  date?: Date;
  note?: string;
  sessionID?: string;
}

export interface UserState {
  name?: string;
  uid?: string;
  notes?: Array<string>;
  email?: string;
  photoURL?: string;
  sessions?: Array<SessionType>;
}
