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
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={iconName}
            size={100}
            color={iconColor}
            style={styles.icon}
          />
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.note}>{note}</Text>
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
    backgroundColor: '#e6f5fb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noteContainer: {
    backgroundColor: 'transparent',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
    padding: 20,
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
    color: '#343434',
  },
  icon: {
    zIndex: 2,
  },
  note: {
    marginTop: 10,
    width: '90%',
    fontSize: 16,
    lineHeight: 25,
    color: '#343434',
  },
});
