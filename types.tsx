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
  SessionView: undefined;
  Login: undefined;
  Register: undefined;
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
  quality: number;
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
  emotionName?: string;
  createdAt?: Date;
  note?: string;
  sessionID?: string;
  emotionQuality?: number;
}

export interface UserState {
  name?: string;
  uid?: string;
  email?: string;
  photoURL?: string;
  sessions?: Array<SessionType>;
  emotion?: Emotion;
  creationTime?: string | number;
  note?: string;
  latestSessionToggle?: boolean;
}
