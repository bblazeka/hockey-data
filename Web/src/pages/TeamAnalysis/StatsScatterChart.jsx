import React from "react";
import {
  ScatterChart,
  Scatter,
  Label,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Flag, Header } from "semantic-ui-react";
import styled from "styled-components";

import { Loader } from "components";
import {  generateSemanticUICountryId } from "util/common";

const TooltipDiv = styled.div`
  background-color: #fff;
  border: 1px solid #999;
  margin: 0;
  padding: 10px;
`;

const TooltipTextDiv = styled.div`
  color: ${({ $color }) => $color};
`;

function StatsScatterChart({
  color,
  values,
  xAxisName,
  yAxisName,
  xKey,
  yKey,
  height,
  width,
  maxDomain,
}) {

  const renderCustomizedLabel = ({ x, y, width, value }) => {
    const radius = 10;

    return (
      <g>
        <text
          x={x + width / 2}
          y={y - radius}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}
        </text>
      </g>
    );
  };

  const renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;
      const key = yKey.includes(".") ? yKey.split(".")[1] : yKey;
      return (
        <TooltipDiv>
          <Header
            as="h3"
            content={data.fullName}
            subheader={`#${data.primaryNumber}`}
          />
          <div>
            <Flag name={generateSemanticUICountryId(data.nationality)} />
            {data.nationality}
          </div>
          <div>{data.currentAge} years</div>
          <div>{data.positionName}</div>
          <TooltipTextDiv $color={color}>
            <div>games: {data.stats.games}</div>
            <span>{yAxisName}: </span>
            {data.stats[key]}
          </TooltipTextDiv>
        </TooltipDiv>
      );
    }

    return null;
  };

  if (!values) {
    return <Loader />;
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
        <XAxis
          type="number"
          dataKey={xKey || "x"}
          domain={[0, maxDomain + 5 ?? "auto"]}
        >
          <Label value={xAxisName || "x"} offset={0} position="insideBottom" />
        </XAxis>
        <YAxis type="number" dataKey={yKey || "y"}>
          <Label angle={-90} value={yAxisName || "y"} position="insideLeft" />
        </YAxis>
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          wrapperStyle={{ zIndex: 100 }}
          content={renderTooltip}
        />
        <Scatter name="Values" data={values} fill={color || "#8884d8"}>
          <LabelList
            dataKey="abbrName"
            position="top"
            content={renderCustomizedLabel}
          />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default StatsScatterChart;
