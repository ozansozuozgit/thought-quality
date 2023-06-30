import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryAxis, VictoryChart, VictoryLine} from 'victory-native';
import {useAppSelector} from '../app/hooks';
import {convertMsToHM, diffInDaysFromToday} from '../utils/utils';

const LineChart = ({showToast}: any) => {
  const user = useAppSelector(state => state.user);

  const [userGraphData, setUserGraphData] = useState<Array<object>>([]);

  useEffect(() => {
    populateArray();
  }, [user.sessions]);

  const dateIsToday = (createdAt: string, createdAtMilliSeconds: number) => {
    let now = +new Date();
    const oneDay = 60 * 60 * 24 * 1000;
    let sessionCreatedToday = now - createdAtMilliSeconds < oneDay;

    if (sessionCreatedToday) {
      return convertMsToHM(now - createdAtMilliSeconds);
    }
    return createdAt;
  };

  const populateArray = () => {
    const lineChartSessions: Array<object> = [];

    if (!user.sessions?.length) {
      setUserGraphData([]);
      return;
    }

    user.sessions?.forEach((session: any) => {
      if (session.createdAt == undefined) return;

      const date = moment(new Date(session.createdAt)).format('YYYY-MM-DD');
      const daysDiff = diffInDaysFromToday(date);

      if (daysDiff === 0) {
        lineChartSessions.push({
          x: `   ${dateIsToday(
            session.createdAt,
            session.createdAtMilliSeconds,
          )}`,
        });
      } else {
        lineChartSessions.push({
          x: `${daysDiff}`,
        });
      }
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
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Session Distribution</Text>
        <VictoryChart width={320} domainPadding={20}>
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
            data={userGraphData ?? [{x: 1, y: 1}]}
            interpolation="bundle"
            animate={{
              duration: 500,
              onLoad: {duration: 500},
            }}
          />
        </VictoryChart>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
  },
  chartContainer: {
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
    color: '#000',
    fontSize: 22,
    marginTop: 30,
  },
});

export default LineChart;
