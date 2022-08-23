import React, {useEffect, useState} from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from '../components/Themed';
import {updateNoteInFirebase} from '../utils/utils';

export default function SessionViewScreen({route, navigation}: any) {
  const {note, emotionName, createdAt, iconColor, iconName, sessionID} =
    route.params;
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    setInput(note);
  }, []);

  const updateNoteHandler = async () => {
    let result = await updateNoteInFirebase('Sessions', sessionID, input);
    if (result) {
      Toast.show({
        type: 'success',
        text1: 'Session updated successfully!',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'There was an issue updating your session',
      });
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={updateNoteHandler} title="Save" />,
    });
  }, [navigation, input]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{createdAt}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={iconName}
            size={100}
            color={iconColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.noteContainer}>
          <TextInput
            maxLength={1000}
            style={styles.note}
            multiline
            onChangeText={value => setInput(value)}>
            {input}
          </TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f5fb',
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: '#e6f5fb',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noteContainer: {
    backgroundColor: '#333437',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
    padding: 15,
    // borderWidth: 1,
    borderColor: '#e6f5fb',
  },
  iconContainer: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 10,
    marginTop: '15%',
  },
  date: {
    fontSize: 15,
    position: 'absolute',
    right: '5%',
    zIndex: 1,
    top: 16,
    color: '#e6f5fb',
  },
  icon: {
    zIndex: 2,
  },
  note: {
    // marginTop: 10,
    width: '90%',
    fontSize: 16,
    // lineHeight: 25,
    // marginBottom: 10,
    color: '#e6f5fb',
  },
});
