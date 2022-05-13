import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { PieChartWithLegend } from "components";
import { getColorScheme, getDefaultColorScheme } from "util/shared";

const StatisticsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 4vh;
  flex-wrap: wrap;
`;

const getDefaultColorFromScheme = (color, index) => {
  return getColorScheme(color)[index];
};

export default function GameListStatistics({ gamesBetweenTeams }) {
  const { team, opponent, score } = gamesBetweenTeams;
  const winsPerTeam = [
    {
      name: `${team.name} wins`,
      value: score.teamWins,
      color: getDefaultColorFromScheme(team.colorScheme, 0),
    },
    {
      name: `${opponent.name} wins`,
      value: score.opponentWins,
      color: getDefaultColorFromScheme(opponent.colorScheme, 1),
    },
  ];
  const values = [
    {
      name: `${team.name} goals`,
      value: score.teamGoals,
      color: getDefaultColorFromScheme(team.colorScheme, 0),
    },
    {
      name: `${opponent.name} goals`,
      value: score.opponentGoals,
      color: getDefaultColorFromScheme(opponent.colorScheme, 1),
    },
  ];
  const homeAwayWinsDistribution = [
    {
      name: "Home team wins",
      value: score.homeWins,
      color: "#00C49F",
    },
    {
      name: "Away team wins",
      value: score.awayWins,
      color: "#0088FE",
    },
  ];
  const goalCountDistribution = score.gameGoals.map((gameGoals, index) => ({
    ...gameGoals,
    color: getDefaultColorScheme()[index],
  }));
  return (
    <StatisticsContainer>
      <PieChartWithLegend animate values={winsPerTeam} />
      <PieChartWithLegend animate values={values} />
      <PieChartWithLegend animate values={homeAwayWinsDistribution} />
      <PieChartWithLegend animate values={goalCountDistribution} />
    </StatisticsContainer>
  );
}

GameListStatistics.propTypes = {
  gamesBetweenTeams: PropTypes.object,
};
