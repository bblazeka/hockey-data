import React from "react";
import PropTypes from "prop-types";
import { Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";

const PieChartContainer = styled.div`
  height: 40vh;
  width: 20vw;
`;

export default function PieChartWithLegend(props) {
  const { values } = props;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={values}
            dataKey="value"
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
          >
            {values.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </PieChartContainer>
  );
}

PieChartWithLegend.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
};
