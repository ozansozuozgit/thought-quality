import firestore from '@react-native-firebase/firestore';

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
      console.log('querySnapshot', querySnapshot);
      return querySnapshot;
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
