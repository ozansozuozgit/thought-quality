import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
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
    name: string;
  }>({iconName: 'circle-outline', iconColor: '#000', name: ''});

  useEffect(() => {
    PopulateArray();
  }, []);
  useEffect(() => {
    PopulateArray();
  }, [user.sessions]);

  const PopulateArray = () => {
    const pieChartEmotions: Array<object> = [];

    if (!user.sessions?.length) setUserGraphData([]);
    user.sessions?.forEach((session: any) => {
      pieChartEmotions.push({
        x: `${session.emotionName}`,
      });
    });
    //Get duplicates and add the number of duplicates to the "y" field of the data
    const emotionsOrganized = [
      ...pieChartEmotions
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
      setTopEmotion({iconName, iconColor, name: topEmotion.x});
    }
  };

  return (
    <View style={styles.container}>
      <DatePicker />
      <View style={{position: 'relative'}}>
        {!!user?.sessions?.length ? (
          <View>
            <VictoryPie
              data={userGraphData}
              colorScale={colorArray}
              height={300}
              innerRadius={60}
              animate={{easing: 'exp'}}
            />
            <MaterialIcons
              name={topEmotion.iconName}
              size={120}
              color={topEmotion.iconColor}
              style={styles.icon}
            />
          </View>
        ) : (
          <Text style={{paddingBottom: '65%'}}>No Sessions</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '65%',
    paddingTop: Platform.OS === 'ios' ? '19%' : 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: '30%',
    left: '35%',
  },
});
