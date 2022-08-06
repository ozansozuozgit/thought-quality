import {Platform, StyleSheet} from 'react-native';
import React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SessionViewScreen({route, navigation}: any) {
  const {note, emotionName, createdAt, iconColor, iconName} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{createdAt}</Text>
      <View style={styles.infoContainer}>
        <MaterialIcons
          name={iconName}
          size={100}
          color={iconColor}
          style={styles.icon}
        />
        <Text style={styles.note}>{note}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  date: {
    // textAlign: 'right',
    // alignSelf: 'flex-end',
    fontSize: 18,
    position: 'absolute',
    right: '5%',
    zIndex: 1,
    top: 5,
  },
  icon: {
    zIndex: 2,
    marginTop: 30,
  },
  note: {
    // flex: 0.6,
    marginTop: 10,
    width: '90%',
    fontSize: 20,
    lineHeight: 30,
  },
});
