import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {VictoryPie} from 'victory-native';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {EmotionsEnums} from '../types';
import {firestoreGetDataCreatedBefore} from '../utils/utils';
import DatePicker from '../components/DatePicker';

export default function StatsScreen() {
  const user = useAppSelector(state => state.user);

  const [userGraphData, setUserGraphData] = useState<Array<object>>([]);

  useEffect(() => {
    console.log('user sessions', user.sessions);
    const queryResult: Array<object> = [];
    if (!user.sessions?.length) setUserGraphData([]);
    user.sessions?.forEach((doc: any) => {
      queryResult.push({
        x: `${doc.emotionName}`,
      });
      //Get duplicates and add the number of duplicates to the "y" field of the data
      const result = [
        ...queryResult
          .reduce((mp: any, o: any) => {
            if (!mp.has(o.x)) mp.set(o.x, {...o, y: 0});
            mp.get(o.x).y++;
            return mp;
          }, new Map())
          .values(),
      ];
      setUserGraphData(result);
    });
  }, [user.sessions]);

  return (
    <View style={styles.container}>
      <DatePicker />
      <VictoryPie
        data={userGraphData}
        colorScale={[
          '#ff5a0a',
          '#ecfe09',
          '#ffb507',
          '#07c14a',
          '#060df9',
          '#a20ef5',
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
