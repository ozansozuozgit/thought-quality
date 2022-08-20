import * as Sentry from '@sentry/react-native';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import {SessionType, UserState} from '../types';
import notifee, {
  TimestampTrigger,
  TriggerType,
  TimeUnit,
  RepeatFrequency,
} from '@notifee/react-native';
export async function addSessionToFirebase(user: UserState) {
  // const customDate = new Date(new Date().setDate(new Date().getDate() - 40));
  console.log('user note is', user.note);
  return await firestore()
    .collection('Users')
    .add({
      name: user.name,
      uid: user.uid,
      email: user.email,
      note: user.note,
      photoURL: user.photoURL,
      emotionQuality: user.emotion?.quality,
      createdAt: firestore.FieldValue.serverTimestamp(),
      // createdAt: firestore.Timestamp.fromDate(customDate),
      emotionName: user.emotion?.name,
    })
    .then(querySnapshot => {
      console.log('Session added!');
      querySnapshot.update({
        sessionID: querySnapshot.id,
      });

      return true;
    })
    .catch(e => {
      console.log(e);
      Sentry.captureException(e);
      return false;
    });
}

export function firestoreGetDataCreatedBefore(
  uid: string,
  endDate: Date,
  limit: number,
) {
  let result = firestore()
    .collection('Users')
    .where('uid', '==', uid)
    .where('createdAt', '>=', endDate)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get()
    .then(querySnapshot => {
      return formatDatabaseReturnData(querySnapshot);
    })
    .catch(e => {
      {
        console.log(e);
        Sentry.captureException(e);
      }
    });

  return result;
}
export function firestoreGetDataSpecificDate(
  uid: string,
  date: Date,
  limit: number,
) {
  var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  let result = firestore()
    .collection('Users')
    .where('uid', '==', uid)
    .where('createdAt', '>', date)
    .where('createdAt', '<=', tomorrow)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get()
    .then(querySnapshot => {
      console.log('querySnapshot', querySnapshot);
      return formatDatabaseReturnData(querySnapshot);
    })
    .catch(e => {
      console.log(e);
      Sentry.captureException(e);
    });

  return result;
}

export async function firestoreGetTotalUserSessionsLength(uid: string) {
  let result = firestore()
    .collection('Users')
    .where('uid', '==', uid)
    .get()
    .then(querySnapshot => {
      return querySnapshot.size;
    })
    .catch(e => {
      console.log(e);
      Sentry.captureException(e);
    });

  return result;
}

export function limitCharacter(text: string, length: number, end = '...') {
  return text.length < length ? text : text.substring(0, length) + end;
}

export async function deleteAllSessionsFromFirebase(
  collectionName: string,
  uid: string,
) {
  return await firestore()
    .collection(collectionName)
    .where('uid', '==', uid)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size === 0) return false;
      querySnapshot.forEach(snapshot => snapshot.ref.delete());
      return true;
    })
    .catch(e => {
      console.log(e);
      Sentry.captureException(e);
      return false;
    });
}
export async function deleteSessionFromFirebase(
  collectionName: string,
  docID: string,
) {
  return await firestore()
    .collection(collectionName)
    .doc(docID)
    .get()
    .then(result => {
      if (!result.exists) return false;
      result.ref.delete();
      console.log('Document successfully deleted!');
      return true;
    })
    .catch(error => {
      console.error('Error removing document: ', error);
      return false;
    });
}
export async function updateNoteInFirebase(
  collectionName: string,
  docID: string,
  note: string,
) {
  console.log({collectionName});
  console.log({docID});
  console.log({note});

  return await firestore()
    .collection(collectionName)
    .doc(docID)
    .update({note})
    .then(result => {
      console.log('result',result);
      // if (!result.exists) return false;
      // result.ref.delete();
      console.log('Document successfully updated!');
      return true;
    })
    .catch(error => {
      console.error('Error removing document: ', error);
      return false;
    });
}
function formatDatabaseReturnData(querySnapshot: any) {
  const sessionArray: SessionType[] = [];
  querySnapshot?.forEach((doc: any) => {
    const createdAt = doc.data().createdAt.toDate().toLocaleDateString('en-US');

    sessionArray.push({
      createdAt: createdAt,
      note: doc.data().note,
      emotionName: doc.data().emotionName,
      sessionID: doc.data().sessionID,
      emotionQuality: doc.data().emotionQuality,
      createdAtMilliSeconds: doc.data().createdAt.toMillis(),
    });
    // console.log(doc.id, ' => ', doc.data());
  });
  return sessionArray;
}

export function returnIcon(emotionName: string) {
  let iconName = 'circle-outline';
  let iconColor = '#000';
  if (emotionName === 'Love') {
    iconName = 'emoticon-kiss-outline';
    iconColor = '#9f4fbd';
  } else if (emotionName === 'Joy') {
    iconName = 'emoticon-excited-outline';
    iconColor = '#4f8af6';
  } else if (emotionName === 'Neutral') {
    iconName = 'emoticon-neutral-outline';
    iconColor = '#15ad01';
  } else if (emotionName === 'Anger') {
    iconName = 'emoticon-angry-outline';
    iconColor = '#fc3a00';
  } else if (emotionName === 'Sadness') {
    iconName = 'emoticon-sad-outline';
    iconColor = '#ff8c00';
  } else if (emotionName === 'Fear') {
    iconName = 'emoticon-frown-outline';
    iconColor = '#c53723';
  }
  return {iconName, iconColor};
}

export const diffInDaysFromToday = (endDate: string | undefined = '') => {
  if (endDate === undefined) return '';
  let today = moment(new Date().toISOString().slice(0, 10)) ?? '';
  const diffInDays = moment(today).diff(endDate, 'days');

  return diffInDays;
};

export async function onCreateTriggerNotification() {
  const date = new Date(Date.now());
  date.setHours(12);
  date.setMinutes(0);
  date.setDate(date.getDate() + 1);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
    repeatFrequency: RepeatFrequency.DAILY, // repeat once a day
  };

  // Create a trigger notification
  await notifee.createTriggerNotification(
    {
      id: '123',
      title: 'Notice your Thoughts yet?',
      body: 'Record them now. You got this.',
    },
    trigger,
  );
}

export const convertMsToHM = (milliseconds: number) => {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  if (hours === 0 && minutes > 0) {
    return `${minutes} minute(s) ago.`;
  } else if (minutes === 0) {
    return `${seconds} second(s) ago.`;
  } else {
    return `${hours} hour(s) ago`;
  }
};
