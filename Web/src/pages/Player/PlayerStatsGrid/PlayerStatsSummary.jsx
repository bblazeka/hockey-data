import React from "react";
import { Statistic } from "semantic-ui-react";

function PlayerStatsSummary({ data }) {
  const {
    totalGames,
    totalGoals,
    totalAssists,
    totalPoints,
    totalGamesStarted,
    totalWins,
  } = data;
  return (
    <Statistic.Group horizontal>
      {totalGames && (
        <Statistic>
          <Statistic.Value>{totalGames}</Statistic.Value>
          <Statistic.Label>Games</Statistic.Label>
        </Statistic>
      )}
      {totalGoals && (
        <Statistic>
          <Statistic.Value>{totalGoals}</Statistic.Value>
          <Statistic.Label>Goals</Statistic.Label>
        </Statistic>
      )}
      {totalAssists && (
        <Statistic>
          <Statistic.Value>{totalAssists}</Statistic.Value>
          <Statistic.Label>Assists</Statistic.Label>
        </Statistic>
      )}
      {totalPoints && (
        <Statistic>
          <Statistic.Value>{totalPoints}</Statistic.Value>
          <Statistic.Label>Points</Statistic.Label>
        </Statistic>
      )}
      {totalGamesStarted && (
        <Statistic>
          <Statistic.Value>{totalGamesStarted}</Statistic.Value>
          <Statistic.Label>Starts</Statistic.Label>
        </Statistic>
      )}
      {totalWins && (
        <Statistic>
          <Statistic.Value>{totalWins}</Statistic.Value>
          <Statistic.Label>Wins</Statistic.Label>
        </Statistic>
      )}
    </Statistic.Group>
  );
}

export default PlayerStatsSummary;
