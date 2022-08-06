import firestore from '@react-native-firebase/firestore';
import {SessionType} from '../types';

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
    .catch(e => console.log(e));

  return result;
}
export function firestoreGetDataSpecificDate(
  uid: string,
  date: Date,
  limit: number,
) {
  var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  console.log('tomorrow is', tomorrow);
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
    .catch(e => console.log(e));

  return result;
}

export function limitCharacter(text: string, length: number, end = '...') {
  return text.length < length ? text : text.substring(0, length) + end;
}

export function deleteSessionFromFirebase(
  collectionName: string,
  docID: string,
) {
  firestore()
    .collection(collectionName)
    .doc(docID)
    .delete()
    .then(() => {
      console.log('Document successfully deleted!');
    })
    .catch(error => {
      console.error('Error removing document: ', error);
    });
}

function formatDatabaseReturnData(querySnapshot: any) {
  const sessionArray: SessionType[] = [];
  querySnapshot?.forEach((doc: any) => {
    const emotionQuality = doc.data().emotionQuality;
    const createdAt = doc.data().createdAt.toDate().toLocaleDateString('en-US');

    sessionArray.push({
      createdAt: createdAt,
      note: doc.data().note,
      emotionName: doc.data().emotionName,
      sessionID: doc.data().sessionID,
      emotionQuality: doc.data().emotionQuality,
    });
    // console.log(doc.id, ' => ', doc.data());
  });
  return sessionArray;
}
