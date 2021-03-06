import React from 'react';
import moment from 'moment';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ContextChart, DataProvider, ScalerContext, Series } from '../src';
import { staticLoader } from './loaders';

const staticXDomain = [+moment().subtract(1, 'week'), +moment()];

export default {
  title: 'Demo|integrations/ChartJS',

  decorators: [
    story => (
      <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '80%' }}>
        {story()}
      </div>
    ),
  ],
};

export const bar = () => (
  <DataProvider defaultLoader={staticLoader} timeDomain={staticXDomain}>
    <Series id="1" color="steelblue" />
    <Series id="2" color="maroon" />
    <ScalerContext.Consumer>
      {({ series, subDomainsByItemId }) => (
        <Bar
          data={{
            labels: [
              '0.0',
              '0.1',
              '0.2',
              '0.3',
              '0.4',
              '0.5',
              '0.6',
              '0.7',
              '0.8',
              '0.9',
            ],
            datasets: series.map(s => {
              const timeSubDomain = subDomainsByItemId[s.id].time;
              const groupedData = s.data
                .filter(
                  ({ timestamp }) =>
                    timestamp >= timeSubDomain[0] &&
                    timestamp <= timeSubDomain[1]
                )
                .reduce((acc, datapoint) => {
                  const updated = [...acc];
                  const index = Math.floor(datapoint.value * 10);
                  updated[index] = (acc[index] || 0) + 1;
                  return updated;
                }, []);
              return {
                label: s.id,
                data: groupedData,
                backgroundColor: groupedData.map(() => s.color),
                borderColor: groupedData.map(() => s.color),
                borderWidth: 1,
              };
            }),
          }}
        />
      )}
    </ScalerContext.Consumer>
    <ContextChart />
  </DataProvider>
);

export const doughnut = () => (
  <DataProvider defaultLoader={staticLoader} timeDomain={staticXDomain}>
    <Series id="1" color="steelblue" />
    <Series id="2" color="maroon" />
    <ScalerContext.Consumer>
      {({ series, subDomainsByItemId }) => (
        <Doughnut
          data={{
            labels: [
              '0.0',
              '0.1',
              '0.2',
              '0.3',
              '0.4',
              '0.5',
              '0.6',
              '0.7',
              '0.8',
              '0.9',
            ],
            datasets: series.map(s => {
              const timeSubDomain = subDomainsByItemId[s.id].time;
              const groupedData = s.data
                .filter(
                  ({ timestamp }) =>
                    timestamp >= timeSubDomain[0] &&
                    timestamp <= timeSubDomain[1]
                )
                .reduce((acc, datapoint) => {
                  const updated = [...acc];
                  const index = Math.floor(datapoint.value * 10);
                  updated[index] = (acc[index] || 0) + 1;
                  return updated;
                }, []);
              const color = { 1: '70, 130, 180', 2: '128, 0, 0' }[s.id];
              return {
                label: s.id,
                data: groupedData,
                backgroundColor: groupedData.map(() => `rgb(${color}, 0.3)`),
                borderColor: groupedData.map(() => s.color),
                borderWidth: 1,
              };
            }),
          }}
        />
      )}
    </ScalerContext.Consumer>
    <ContextChart />
  </DataProvider>
);
