import React from "react";
import {
  Radar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import styled from "styled-components";

const StatsRadarChartContainer = styled.div`
  width: 40vw;
  height: 30vh;
  margin-bottom: 5vh;
`;

function StatsRadarChart(props) {
  const { players, displayedCategories, playerNames, statsMode } = props;
  const categories = displayedCategories.filter((cat) => cat.compare);

  const chartData = categories.map((cat) => {
    const playerScores = {};
    players.forEach((player) => {
      const playerPropValue = player[statsMode][cat.property];
      const baseValue = cat.baseValue ?? 0;
      playerScores[player.fullName] =
        ((playerPropValue - baseValue) / (cat.topVal - baseValue)) * 1.0;
    });
    return { ...cat, ...playerScores };
  });

  return (
    <StatsRadarChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="description" />
          <Legend wrapperStyle={{ position: "relative" }} />
          {playerNames &&
            playerNames.map((playerName, i) => {
              return (
                <Radar
                  key={`radar${i}`}
                  name={playerName}
                  dataKey={playerName}
                  stroke={scaleOrdinal(schemeCategory10).range()[i % 10]}
                  fill={scaleOrdinal(schemeCategory10).range()[i % 10]}
                  fillOpacity={0.6}
                />
              );
            })}
        </RadarChart>
      </ResponsiveContainer>
    </StatsRadarChartContainer>
  );
}

export default StatsRadarChart;
