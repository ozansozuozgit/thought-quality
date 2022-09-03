import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import firestore from '@react-native-firebase/firestore';
import * as Sentry from '@sentry/react-native';
import moment from 'moment';
import {useState} from 'react';
import {SessionType, UserState} from '../types';

export async function addSessionToFirebase(user: UserState) {
  // const customDate = new Date(new Date().setDate(new Date().getDate() - 40));
  console.log('user note is', user.note);
  return await firestore()
    .collection('Sessions')
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
      whatUserIsDoing: user.whatUserIsDoing,
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

export function firestoreGetDataCreatedInRange(
  uid: string,
  startDate: Date,
  endDate: Date,
  limit: number,
) {
  let result = firestore()
    .collection('Sessions')
    .where('uid', '==', uid)
    .where('createdAt', '<=', endDate)
    .where('createdAt', '>=', startDate)
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
export function firestoreGetDataCreatedBefore(
  uid: string,
  endDate: Date,
  limit: number,
) {
  let result = firestore()
    .collection('Sessions')
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
    .collection('Sessions')
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
    .collection('Sessions')
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
export async function firestoreReturnDisplayName(uid: string) {
  let result = firestore()
    .collection('Users')
    .doc(uid)
    .get()
    .then(querySnapshot => {
      if (querySnapshot?.data()?.displayName.length) {
        return querySnapshot?.data()?.displayName;
      } else {
        return '';
      }
    })
    .catch(e => {
      console.log(e);
      Sentry.captureException(e);
      return '';
    });

  return result;
}

// export async function transferFirestoreCollection() {
//   let result = firestore()
//     .collection('Users')
//     .get()
//     .then(querySnapshot => {
//       querySnapshot.forEach(element => {
//         console.log('element', element);
//         firestore().collection('Sessions').doc(element.id).set(element.data());
//       });
//     })
//     .catch(e => {
//       console.log(e);
//       Sentry.captureException(e);
//       return '';
//     });

//   return result;
// }

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
      if (querySnapshot.size === 0) {
        return false;
      }
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
      if (!result.exists) {
        return false;
      }
      result.ref.delete();
      console.log('Document successfully deleted!');
      return true;
    })
    .catch(error => {
      console.error('Error removing document: ', error);
      Sentry.captureException(error);
      return false;
    });
}
export async function updateNoteAndActivityInFirebase(
  collectionName: string,
  docID: string,
  note: string,
  whatUserIsDoing: string,
) {
  return await firestore()
    .collection(collectionName)
    .doc(docID)
    .update({note, whatUserIsDoing})
    .then(result => {
      console.log('result', result);
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
      whatUserIsDoing: doc.data().whatUserIsDoing,
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
  } else if (emotionName === 'Hopeful') {
    iconName = 'emoticon-excited-outline';
    iconColor = '#477cdd';
  } else if (emotionName === 'Cheerful') {
    iconName = 'emoticon-excited-outline';
    iconColor = '#3f6ec5';
  } else if (emotionName === 'Excited') {
    iconName = 'emoticon-excited-outline';
    iconColor = '#3761ac';
  } else if (emotionName === 'Inspired') {
    iconName = 'emoticon-excited-outline';
    iconColor = '#2f5394';
  } else if (emotionName === 'Affection') {
    iconName = 'emoticon-kiss-outline';
    iconColor = '#8f47aa';
  } else if (emotionName === 'Lust') {
    iconName = 'emoticon-kiss-outline';
    iconColor = '#b272ca';
  } else if (emotionName === 'Compassion') {
    iconName = 'emoticon-kiss-outline';
    iconColor = '#6f3784';
  } else if (emotionName === 'Passion') {
    iconName = 'emoticon-kiss-outline';
    iconColor = '#c595d7';
  } else if (emotionName === 'Content') {
    iconName = 'emoticon-neutral-outline';
    iconColor = '#139c01';
  } else if (emotionName === 'Calm') {
    iconName = 'emoticon-neutral-outline';
    iconColor = '#44bd34';
  } else if (emotionName === 'Relaxed') {
    iconName = 'emoticon-neutral-outline';
    iconColor = '#0f7901';
  } else if (emotionName === 'Serene') {
    iconName = 'emoticon-neutral-outline';
    iconColor = '#73ce67';
  } else if (emotionName === 'Frustrated') {
    iconName = 'emoticon-angry-outline';
    iconColor = '#e33400';
  } else if (emotionName === 'Irritated') {
    iconName = 'emoticon-angry-outline';
    iconColor = '#fd6133';
  } else if (emotionName === 'Furious') {
    iconName = 'emoticon-angry-outline';
    iconColor = '#b02900';
  } else if (emotionName === 'Annoyed') {
    iconName = 'emoticon-angry-outline';
    iconColor = '#fd754d';
  } else if (emotionName === 'Lonely') {
    iconName = 'emoticon-sad-outline';
    iconColor = '#e67e00';
  } else if (emotionName === 'Guilt') {
    iconName = 'emoticon-sad-outline';
    iconColor = '#ffa333';
  } else if (emotionName === 'Gloomy') {
    iconName = 'emoticon-sad-outline';
    iconColor = '#b36200';
  } else if (emotionName === 'Depressed') {
    iconName = 'emoticon-sad-outline';
    iconColor = '#ffba66';
  } else if (emotionName === 'Anxious') {
    iconName = 'emoticon-frown-outline';
    iconColor = '#b13220';
  } else if (emotionName === 'Nervous') {
    iconName = 'emoticon-frown-outline';
    iconColor = '#d15f4f';
  } else if (emotionName === 'Scared') {
    iconName = 'emoticon-frown-outline';
    iconColor = '#9e2c1c';
  } else if (emotionName === 'Terrified') {
    iconName = 'emoticon-frown-outline';
    iconColor = '#8a2719';
  }

  return {iconName, iconColor};
}

export const diffInDaysFromToday = (endDate: string | undefined = '') => {
  if (endDate === undefined) {
    return '';
  }
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

export const validateEmail = (email: string) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const useTogglePasswordVisibility = () => {
  // password will not be initially visible
  // set the initial value to true because this will be the value fo secureTextEntry prop
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off-outline');
  // function that toggles password visibility on a TextInput component on a password field
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye-off-outline') {
      setRightIcon('eye-outline');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-outline') {
      setRightIcon('eye-off-outline');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
  };
};

export const getEmotionCategory = (category: string) => {
  const loveCategories = ['Love', 'Affection', 'Lust', 'Compassion', 'Passion'];
  const joyCategories = ['Joy', 'Cheerful', 'Excited', 'Hopeful', 'Inspired'];
  const neutralCategories = ['Neutral', 'Content', 'Calm', 'Relaxed', 'Serene'];
  const angerCategories = [
    'Anger',
    'Frustrated',
    'Irritated',
    'Furious',
    'Annoyed',
  ];
  const sadnessCategories = [
    'Sadness',
    'Lonely',
    'Guilt',
    'Gloomy',
    'Depressed',
  ];
  const fearCategories = ['Fear', 'Anxious', 'Nervous', 'Scared', 'Terrified'];

  if (category === 'Love') {
    return loveCategories;
  } else if (category === 'Joy') {
    return joyCategories;
  } else if (category === 'Neutral') {
    return neutralCategories;
  } else if (category === 'Anger') {
    return angerCategories;
  } else if (category === 'Sadness') {
    return sadnessCategories;
  } else if (category === 'Fear') {
    return fearCategories;
  } else {
    return [];
  }
};
