import React from "react";
import { Table } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import dayjs from "dayjs";

import categories from "util/categories.json";
import { FormatDecimals } from "util/common";
import { SmallLogo } from "components/collection";
import { Loader } from "components";
import {
  getSkaterDetailedStats,
  getGoalieDetailedStats,
} from "services/querySchemas/player";
import { getLogo } from "util/assets";
import routes from "routes";
import config from "util/config.json";

const PlayerStatsGridStyled = styled.div`
  padding: 8px;
`;

const TeamLogosContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LoaderContainer = styled.div`
  min-height: 6vh;
`;

function GameLogGrid({ skater }) {
  let { id } = useParams();
  const seasonId = config.currentSeason;
  const query = skater ? getSkaterDetailedStats : getGoalieDetailedStats;

  const { loading, data: dataRaw } = useQuery(query, {
    variables: { id: parseInt(id), seasonId },
  });
  if (loading) {
    return <LoaderContainer><Loader/></LoaderContainer>;
  }
  const { gameLog } = dataRaw.playerDetailedStats;

  const categorySet = skater
    ? categories.skaterCategories
    : categories.goalieCategories;

  const exampleObject = gameLog[gameLog.length - 1].stat;
  const displayedCategories = Object.values(categorySet).filter((cat) => {
    return cat.property in exampleObject;
  });
  return (
    <PlayerStatsGridStyled>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Game</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            {displayedCategories.map((cat, index) => {
              return (
                <Table.HeaderCell
                  key={`headercol${index}`}
                  title={cat.description}
                >
                  {cat.title}
                </Table.HeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {gameLog.map((stat) => {
            const key = `${id}${stat.season}${stat.date}`;
            return (
              <Table.Row key={`row${key}`}>
                <Table.Cell>
                  <a href={`${routes.game}/${stat.game.gamePk}`}>
                    {dayjs(stat.date).format("MMMM Do YYYY")}
                  </a>
                </Table.Cell>

                <Table.Cell>
                  {stat.isHome ? (
                    <TeamLogosContainer>
                      <SmallLogo src={getLogo(stat.opponent.id)} />@
                      <SmallLogo src={getLogo(stat.team.id)} />
                    </TeamLogosContainer>
                  ) : (
                    <TeamLogosContainer>
                      <SmallLogo src={getLogo(stat.team.id)} />@
                      <SmallLogo src={getLogo(stat.opponent.id)} />
                    </TeamLogosContainer>
                  )}
                </Table.Cell>

                <Table.Cell>
                  {stat.isWin ? "W" : stat.isOT ? "OT" : "L"}
                </Table.Cell>

                {displayedCategories.map((category, i) => {
                  let value = stat.stat[category.property];
                  if (category.property === "savePercentage") {
                    value = FormatDecimals(value * 100, 1);
                  } else if (
                    [
                      "goalAgainstAverage",
                      "evenStrengthSavePercentage",
                      "powerPlaySavePercentage",
                      "shortHandedSavePercentage",
                    ].includes(category.property)
                  ) {
                    value = FormatDecimals(value, 2);
                  }
                  return <Table.Cell key={`col${i}`}>{value}</Table.Cell>;
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </PlayerStatsGridStyled>
  );
}

export default GameLogGrid;
