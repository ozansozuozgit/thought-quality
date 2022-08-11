import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';

import {VictoryPie} from 'victory-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {returnIcon} from '../utils/utils';

const PieChart = ({showToast}: any) => {
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
    <View style={{width: '90%', alignItems: 'center'}}>
      {!!user?.sessions?.length ? (
        <View style={styles.pieContainer}>
          <VictoryPie
            data={userGraphData}
            colorScale={colorArray}
            height={280}
            innerRadius={60}
            animate={{easing: 'exp'}}
            style={{
              labels: {fill: '#000',fontSize:16},
            }}
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
  );
};

const styles = StyleSheet.create({
  pieContainer: {
    backgroundColor: '#e6f5fb',
    width: '95%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderColor: '#343434',
    borderWidth: 1,
  },
  icon: {
    position: 'absolute',
    top: '29%',
    left: '32%',
  },
});

export default PieChart;
