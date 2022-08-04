import firestore from '@react-native-firebase/firestore';

export function firestoreGetDataCreatedBefore(uid: string, endDate: Date) {
  let result = firestore()
    .collection('Users')
    .where('uid', '==', uid)
    .where('createdAt', '>=', endDate)
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
