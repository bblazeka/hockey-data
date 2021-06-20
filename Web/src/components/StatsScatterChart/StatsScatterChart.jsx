import React from 'react';
import { ScatterChart, Scatter, Label, LabelList, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import './StatsScatterChart.scss';
import { Loader } from '..';
import { IsNullOrUndefined } from '../../util/common';

function StatsScatterChart(props) {
  const { color, values, xAxisName, yAxisName, xKey, yKey, height, width } = props;

  var renderTooltip = (props) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;
      var key = yKey.includes('.') ? yKey.split('.')[1] : yKey;
      return (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #999',
            margin: 0,
            padding: 10,
          }}
        >
          <p>{data.fullName}</p>
          <p>
            <span>{yAxisName}: </span>
            {data.stats[key]}
          </p>
        </div>
      );
    }

    return null;
  };

  if (IsNullOrUndefined(values)) {
    return (<Loader></Loader>);
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart
        width={width}
        height={height}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey={xKey || 'x'}>
          <Label value={xAxisName || 'x'} offset={0} position='insideBottom' />
        </XAxis>
        <YAxis type="number" dataKey={yKey || 'y'}>
          <Label angle={-90} value={yAxisName || 'y'} position='insideLeft' />
        </YAxis>
        <Tooltip cursor={{ strokeDasharray: '3 3' }} wrapperStyle={{ zIndex: 100 }} content={renderTooltip} />
        <Scatter name="Values" data={values} fill={color || '#8884d8'} >
          <LabelList dataKey="fullName" position="top" />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>);

}

export default StatsScatterChart;