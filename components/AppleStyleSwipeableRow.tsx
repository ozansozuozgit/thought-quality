import React from 'react';
import {
  Alert,
  Animated,
  I18nManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Toast from 'react-native-toast-message';
import {useAppDispatch} from '../app/hooks';
import {removeSession} from '../features/user/userSlice';
import {deleteSessionFromFirebase} from '../utils/utils';

export default function AppleStyleSwipeableRow(props: any) {
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
    translateXValue: number,
    progress: any,
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [translateXValue, 0],
    });
    const pressHandler = () => {
      confirmationAlert();
    };
    const rectButtonStyle = [styles.rightAction, {backgroundColor: color}];
    return (
      <Animated.View style={{flex: 1, transform: [{translateX}]}}>
        <RectButton style={rectButtonStyle} onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: any) => {
    if (!props.allowSwipe) return null;
    const flexDirection = I18nManager.isRTL ? 'row-reverse' : 'row';
    return (
      <View style={{width: 100, flexDirection}}>
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
      renderRightActions={renderRightActions}>
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
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
