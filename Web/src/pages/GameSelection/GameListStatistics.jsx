import React from "react";
import { Statistic } from "semantic-ui-react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

import { IsNullOrUndefined } from "util/common";

const StatisticsContainer = styled.div`
  display: flex;
  padding-bottom: 4vh;
`;

const GraphContainer = styled.div`
  height: 20vh;
  width: 80vw;
`;

export default function GameListStatistics(props) {
  const { gamesBetweenTeams } = props;
  const homeTeam =
    !IsNullOrUndefined(gamesBetweenTeams) && gamesBetweenTeams.games.length > 0
      ? gamesBetweenTeams.games[0].home.team.name
      : "Home team";
  const awayTeam =
    !IsNullOrUndefined(gamesBetweenTeams) && gamesBetweenTeams.games.length > 0
      ? gamesBetweenTeams.games[0].away.team.name
      : "Away team";
  return (
    <StatisticsContainer>
      <Statistic.Group horizontal>
        <Statistic>
          <Statistic.Value>{gamesBetweenTeams.score.homeWins}</Statistic.Value>
          <Statistic.Label>{`${homeTeam} wins`}</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>{gamesBetweenTeams.score.awayWins}</Statistic.Value>
          <Statistic.Label>{`${awayTeam} wins`}</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <GraphContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={gamesBetweenTeams.score.gameScores}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend wrapperStyle={{ position: "relative" }} />
            <Bar dataKey="homeGoals" name={homeTeam} fill="#8884d8" />
            <Bar dataKey="awayGoals" name={awayTeam} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </GraphContainer>
    </StatisticsContainer>
  );
}

GameListStatistics.propTypes = {
  gamesBetweenTeams: PropTypes.object,
};
