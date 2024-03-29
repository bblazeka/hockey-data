import React from "react";
import PropTypes from "prop-types";
import { Statistic, Table } from "semantic-ui-react";
import { has } from "lodash";
import styled from "styled-components";

import { GetNumberWithOrdinal } from "util/common";
import categories from "util/categories.json";

const TeamStatsTable = styled.div`
  overflow-x: auto;
  margin-top: 1vh;
`;

export default function TeamStatsHeader({ team }) {
  const createStatistic = (text, value) => {
    return (
      <Statistic>
        <Statistic.Value>{value}</Statistic.Value>
        <Statistic.Label>{text}</Statistic.Label>
      </Statistic>
    );
  };

  const stats = [];
  for (var key in team.statsSingleSeason) {
    if (key != "__typename" && has(team.statsSingleSeason, key)) {
      var value = team.statsSingleSeason[key];
      stats.push({
        title: categories.teamCategories[key].title,
        description: categories.teamCategories[key].description,
        value: value,
      });
    }
  }

  return (
    <>
      <Statistic.Group widths="5">
        {createStatistic("League", GetNumberWithOrdinal(team.leagueRank))}
        {createStatistic(
          "League Home",
          GetNumberWithOrdinal(team.leagueHomeRank)
        )}
        {createStatistic(
          "League Road",
          GetNumberWithOrdinal(team.leagueRoadRank)
        )}
        {createStatistic(
          "League Last 10",
          GetNumberWithOrdinal(team.leagueL10Rank)
        )}
        {createStatistic(
          "League Powerplay",
          GetNumberWithOrdinal(team.ppLeagueRank)
        )}
      </Statistic.Group>
      <Statistic.Group widths="5">
        {createStatistic("Division", GetNumberWithOrdinal(team.divisionRank))}
        {createStatistic(
          "Division Home",
          GetNumberWithOrdinal(team.divisionHomeRank)
        )}
        {createStatistic(
          "Division Road",
          GetNumberWithOrdinal(team.divisionRoadRank)
        )}
        {createStatistic(
          "Division Last 10",
          GetNumberWithOrdinal(team.divisionL10Rank)
        )}
        {createStatistic(
          "Division Powerplay",
          GetNumberWithOrdinal(team.ppDivisionRank)
        )}
      </Statistic.Group>
      <TeamStatsTable>
        <Table>
          <Table.Header>
            <Table.Row>
              {stats.map((stat) => {
                return (
                  <Table.HeaderCell
                    key={stat.title + team.id}
                    title={stat.description}
                  >
                    {stat.title}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {stats.map((stat) => {
                return (
                  <Table.Cell key={stat.title + team.id}>
                    {stat.value}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          </Table.Body>
        </Table>
      </TeamStatsTable>
    </>
  );
}

TeamStatsHeader.propTypes = {
  team: PropTypes.object,
};
