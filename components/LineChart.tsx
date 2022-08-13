import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useAppSelector} from '../app/hooks';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';
import {diffInDaysFromToday} from '../utils/utils';
import moment from 'moment';

const LineChart = ({showToast}: any) => {
  const user = useAppSelector(state => state.user);

  const [userGraphData, setUserGraphData] = useState<Array<object>>([]);

  useEffect(() => {
    PopulateArray();
  }, []);
  useEffect(() => {
    PopulateArray();
  }, [user.sessions]);

  const PopulateArray = () => {
    const lineChartSessions: Array<object> = [];

    if (!user.sessions?.length) setUserGraphData([]);
    user.sessions?.forEach((session: any) => {
      if (session.createdAt == undefined) return;
      const date = moment(new Date(session.createdAt)).format('YYYY-MM-DD');
      const daysDiff = diffInDaysFromToday(date);
      lineChartSessions.push({
        x: `${daysDiff}`,
      });
    });

    const emotionsOrganized = [
      ...lineChartSessions
        .reduce((mp: any, o: any) => {
          if (!mp.has(o.x)) mp.set(o.x, {...o, y: 0});
          mp.get(o.x).y++;
          return mp;
        }, new Map())
        .values(),
    ];

    setUserGraphData(emotionsOrganized.reverse());
  };
  return (
    <View style={{width: '90%'}}>
      {!!user?.sessions?.length && (
        <View style={{width: '100%', alignItems: 'center'}}>
          <Text style={styles.chartTitle}>Session Distribution</Text>
          <View style={styles.barContainer}>
            <VictoryChart width={320}>
              <VictoryAxis
                style={{
                  tickLabels: {fill: '#242424'},
                  axisLabel: {fontSize: 16, padding: 25},
                }}
                label="Days Ago"
              />
              <VictoryAxis
                dependentAxis
                tickFormat={tick => `${Math.round(tick)}`}
                style={{
                  tickLabels: {fill: '#242424'},
                  axisLabel: {fontSize: 18, padding: 35},
                }}
                label="Sessions"
              />
              <VictoryLine
                style={{
                  data: {stroke: '#D58C'},
                  border: {fill: '#red'},
                }}
                data={userGraphData}
                interpolation="bundle"
                animate={{
                  duration: 2000,
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
    position: 'relative',
    borderColor: '#343434',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 20,
  },
  chartTitle: {
    color: '#fff',
    fontSize: 22,
    marginTop: 30,
  },
});

export default LineChart;
