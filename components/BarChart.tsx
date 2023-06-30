import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryBar, VictoryChart } from 'victory-native';
import { useAppSelector } from '../app/hooks';
import { returnIcon } from '../utils/utils';
import { SecondaryTitle } from './Themed';

const BarChart = ({ showToast }: any) => {
  const user = useAppSelector(state => state.user);

  const [userGraphData, setUserGraphData] = useState<object[]>([]);
  const [colorArray, setColorArray] = useState<string[]>([]);
  const [topEmotion, setTopEmotion] = useState<{
    iconName: string;
    iconColor: string;
    name: string;
  }>({ iconName: 'circle-outline', iconColor: '#000', name: '' });

  useEffect(() => {
    populateArray();
  }, [user.sessions]);

  const populateArray = () => {
    const pieChartEmotions: object[] = [];

    if (!user.sessions?.length) setUserGraphData([]);
    user.sessions?.forEach((session: any) => {
      pieChartEmotions.push({
        x: session.emotionName,
      });
    });

    const emotionsOrganized: object[] = Array.from(
      pieChartEmotions.reduce((mp, o) => {
        const key = o.x;
        if (!mp.has(key)) {
          mp.set(key, { ...o, y: 0 });
        }
        mp.get(key).y++;
        return mp;
      }, new Map()).values()
    );

    const tempColorArray: string[] = emotionsOrganized.map(emotion => {
      const { iconColor } = returnIcon(emotion.x);
      return iconColor;
    });

    setColorArray(tempColorArray);
    setUserGraphData(emotionsOrganized);

    if (emotionsOrganized.length) {
      const topEmotion = emotionsOrganized.reduce((emotion, current) =>
        emotion.y > current.y ? emotion : current
      );
      const { iconName, iconColor } = returnIcon(topEmotion.x);
      setTopEmotion({ iconName, iconColor, name: topEmotion.x });
    }
  };

  return (
    <View style={styles.container}>
      <SecondaryTitle style={styles.chartTitle}>Emotion Distribution</SecondaryTitle>
      <View style={styles.barContainer}>
        <VictoryChart
          width={350}
          domainPadding={{ x: 15 }}
          padding={{ top: 50, bottom: 50, left: 60, right: 50 }}
        >
          <VictoryBar
            
            style={{
              data: {
                fill: ({ datum }) => {
                  const { iconColor } = returnIcon(datum.x);
                  return iconColor;
                },
                fillOpacity: 0.7,
                strokeWidth: 1,
              },
            }}
            data={userGraphData}
            labels={({ datum }) => datum.y}
            labelComponent={<Text style={styles.labelText} />}
          />
        </VictoryChart>
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          {/* <MaterialIcons name={topEmotion.iconName} size={20} color={topEmotion.iconColor} /> */}
          <Text style={styles.legendText}>{topEmotion.name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  barContainer: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#e6f5fb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  labelText: {
    fontFamily: 'HelveticaNeue',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  legendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  legendText: {
    marginLeft: 5,
    color: '#000',
  },
});

export default BarChart;
