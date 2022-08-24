import React, {useEffect, useState} from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from '../components/Themed';
import {updateNoteAndActivityInFirebase} from '../utils/utils';

export default function SessionViewScreen({route, navigation}: any) {
  const {
    note,
    emotionName,
    createdAt,
    iconColor,
    iconName,
    sessionID,
    whatUserIsDoing,
  } = route.params;
  const [input, setInput] = useState<string>('');
  const [userActivityInput, setUserActivityInput] = useState<string>('');

  useEffect(() => {
    setInput(note);
    setUserActivityInput(whatUserIsDoing);
  }, []);

  const updateNoteHandler = async () => {
    let result = await updateNoteAndActivityInFirebase(
      'Sessions',
      sessionID,
      input,
      userActivityInput,
    );
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
      <ScrollView contentContainerStyle={{paddingBottom: '100%'}}>
        <Text style={styles.date}>{createdAt}</Text>
        <View style={styles.infoContainer}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: '15%',
              textAlign: 'center',
            }}>
            Edit Session
          </Text>
          <View style={styles.iconContainer}>
            <MaterialIcons
              name={iconName}
              size={65}
              color={iconColor}
              style={styles.icon}
            />
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 25,
              fontWeight: 'bold',
              marginLeft: 20,
            }}>
            Your Thoughts
          </Text>
          <View style={styles.noteContainer}>
            <TextInput
              maxLength={1000}
              style={styles.note}
              multiline
              placeholder="No thoughts yet! Fill me up!"
              onChangeText={value => setInput(value)}>
              {input}
            </TextInput>
          </View>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontSize: 25,
              fontWeight: 'bold',
              marginLeft: 20,
              marginTop: 20,
            }}>
            What Were You Doing?
          </Text>
          <View style={styles.noteContainer}>
            <TextInput
              maxLength={1000}
              style={styles.note}
              multiline
              placeholder="Nothing I guess :)"
              onChangeText={value => setUserActivityInput(value)}>
              {userActivityInput}
            </TextInput>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#e6f5fb',
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
    backgroundColor: '#e6f5fb',
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
    // backgroundColor: '#e6f5fb',
    borderRadius: 15,
    // padding: 10,
    marginTop: '5%',
    marginBottom: '5%',
    alignSelf: 'center',
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
    color: '#343434',
    // minHeight: '45%',
    height:100
  },
});
