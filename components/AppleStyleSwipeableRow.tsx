import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  I18nManager,
  Alert,
} from 'react-native';

import {RectButton} from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useAppDispatch} from '../app/hooks';
import {removeSession} from '../features/user/userSlice';
import {deleteSessionFromFirebase} from '../utils/utils';
import Toast from 'react-native-toast-message';

export default function AppleStyleSwipeableRow(props: any) {
  // const renderLeftActions = (progress: any, dragX: any) => {
  //   const trans = dragX.interpolate({
  //     inputRange: [0, 50, 100, 101],
  //     outputRange: [-20, 0, 0, 1],
  //   });
  //   return (
  //     <RectButton style={styles.leftAction}>
  //       <Animated.Text
  //         style={[
  //           styles.actionText,
  //           {
  //             transform: [{translateX: trans}],
  //           },
  //         ]}>
  //         Archive
  //       </Animated.Text>
  //     </RectButton>
  //   );
  // };
  const dispatch = useAppDispatch();

  const confirmationAlert = () =>
    Alert.alert('Delete Note?', 'Cannot reverse action.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          const sessionID = props.sessionID;
          const result = await deleteSessionFromFirebase('Sessions', sessionID);
          if (result === true) {
            dispatch(removeSession(sessionID));
            Toast.show({
              type: 'success',
              text1: 'Session deleted successfully.',
            });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Session was not able to be deleted.',
            });
          }
        },
      },
    ]);

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: any,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      confirmationAlert();
    };
    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton
          style={[styles.rightAction, {backgroundColor: color}]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: any) => {
    if (!props.allowSwipe) return;
    return (
      <View
        style={{
          width: 100,
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}>
        {renderRightAction('Delete', '#dd2c00', 100, progress)}
      </View>
    );
  };
  const {children} = props;
  return (
    <Swipeable
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      // renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
    borderRadius: 10,
  },
});
