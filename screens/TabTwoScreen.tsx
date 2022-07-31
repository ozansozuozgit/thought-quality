import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import {VictoryPie} from 'victory-native';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import {EmotionsEnums} from '../types';

// export interface PieType {
//   x: string;
//   y: number;
// }
export default function TabTwoScreen() {
  const user = useAppSelector(state => state.user);

  const [openDropDown, setOpenDropDownMenu] = useState<boolean>(false);
  const [dropDownValue, setDropdownValue] = useState<number>(0);
  const [items, setItems] = useState<Array<object>>([
    {label: 'Today', value: 1},
    {label: '3 Days', value: 3},
    {label: '5 Days', value: 5},
    {label: '7 Days', value: 7},
    {label: '30 Days', value: 30},
    {label: '60 Days', value: 60},
  ]);
  const [userGraphData, setUserGraphData] = useState<Array<object>>([{}]);

  useEffect(() => {
    getInfoFromDatabase();
  }, [dropDownValue]);

  function getInfoFromDatabase() {
    const endDate = new Date(
      new Date().setDate(new Date().getDate() - dropDownValue),
    );

    firestore()
      .collection('Users')
      .where('uid', '==', user.uid)
      .where('createdAt', '>=', endDate)
      .get()
      .then(querySnapshot => {
        const queryResult: Array<object> = [];
        querySnapshot.forEach(doc => {
          console.log(`${EmotionsEnums[doc.data().emotionQuality]}`);
          const emotionQuality = doc.data().emotionQuality;
          queryResult.push({
            x: `${EmotionsEnums[emotionQuality]}`,
          });
          console.log(doc.id, ' => ', doc.data());
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
        console.log('result', result);
        setUserGraphData(result);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  }

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={openDropDown}
        value={dropDownValue}
        items={items}
        setOpen={setOpenDropDownMenu}
        setValue={setDropdownValue}
        setItems={setItems}
      />
      <VictoryPie
        data={userGraphData}
        colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
      />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
