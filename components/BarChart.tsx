import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '../app/hooks';

import {VictoryChart, VictoryBar, VictoryLabel} from 'victory-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {returnIcon} from '../utils/utils';
import {SecondaryTitle} from './Themed';

const BarChart = ({showToast}: any) => {
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
    <View style={{width: '90%'}}>
      {!!user?.sessions?.length && (
        <View style={{width: '100%', alignItems: 'center'}}>
          {/* <Text style={styles.chartTitle}>Session Distribution</Text> */}
          <View style={styles.barContainer}>
            <VictoryChart
              width={300}
              domainPadding={{x: 15}}
              padding={{top: 50, bottom: 50, left: 60, right: 50}}>
              <VictoryBar
                horizontal
                style={{
                  data: {
                    fill: ({datum}) => {
                      const {iconColor} = returnIcon(datum.x);
                      return iconColor;
                    },
                    fillOpacity: 0.7,
                    strokeWidth: 1,
                  },
                }}
                data={userGraphData}
                animate={{
                  duration: 1200,
                  onLoad: {duration: 1000},
                }}
              />
            </VictoryChart>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: '#e6f5fb',
    width: '95%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  chartTitle: {
    color: '#fff',
    fontSize: 22,
    marginTop: 30,
  },
});

export default BarChart;
