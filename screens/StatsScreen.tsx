import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {VictoryPie} from 'victory-native';
import {useAppSelector} from '../app/hooks';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from '../components/DatePicker';
import {returnIcon} from '../utils/utils';

export default function StatsScreen() {
  const user = useAppSelector(state => state.user);

  const [userGraphData, setUserGraphData] = useState<Array<object>>([]);
  const [colorArray, setColorArray] = useState<string[]>([]);
  const [topEmotion, setTopEmotion] = useState<{
    iconName: string;
    iconColor: string;
  }>({iconName: 'circle-outline', iconColor: '#000'});

  useEffect(() => {
    PopulateArray();
  }, []);
  useEffect(() => {
    PopulateArray();
  }, [user.sessions]);

  const PopulateArray = () => {
    const emotionOccurences: Array<object> = [];
    if (!user.sessions?.length) setUserGraphData([]);
    user.sessions?.forEach((doc: any) => {
      emotionOccurences.push({
        x: `${doc.emotionName}`,
      });
    });
    //Get duplicates and add the number of duplicates to the "y" field of the data
    const emotionsOrganized = [
      ...emotionOccurences
        .reduce((mp: any, o: any) => {
          if (!mp.has(o.x)) mp.set(o.x, {...o, y: 0});
          mp.get(o.x).y++;
          return mp;
        }, new Map())
        .values(),
    ];
    const tempColorArray: string[] = [];
    emotionsOrganized.forEach(emotion => {
      const {iconColor} = returnIcon(emotion.x);
      tempColorArray.push(iconColor);
    });

    setColorArray(tempColorArray);
    setUserGraphData(emotionsOrganized);

    if (emotionsOrganized.length) {
      let topEmotion = emotionsOrganized.reduce((emotion, current) =>
        emotion.y > current.y ? emotion : current,
      );
      const {iconName, iconColor} = returnIcon(topEmotion.x);
      setTopEmotion({iconName, iconColor});
    }
  };

  return (
    <View style={styles.container}>
      <DatePicker />
      <MaterialIcons
        name={topEmotion.iconName}
        size={120}
        color={topEmotion.iconColor}
        style={styles.icon}
      />
      <VictoryPie
        data={userGraphData}
        colorScale={colorArray}
        height={300}
        innerRadius={60}
        animate={{easing: 'exp'}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    top: '61%',
  },
});
