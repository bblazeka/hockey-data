import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { Loader } from "components";
import { IsNullOrUndefined } from "util/common";
import { getColorScheme } from "util/shared";

function StatsPieChart(props) {
  const { colorScheme, values, radius } = props;
  const colors = colorScheme || getColorScheme("blue");

  if (IsNullOrUndefined(values)) {
    return <Loader></Loader>;
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={values}
          dataKey="angle"
          cx="50%"
          cy="50%"
          outerRadius={radius || 100}
          fill={colors[0]}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fill={colors[0]}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
              >
                {values[index].label} ({value})
              </text>
            );
          }}
        >
          {values.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 5]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default StatsPieChart;
