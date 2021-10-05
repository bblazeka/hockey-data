import React from "react";
import PropTypes from "prop-types";
import { Statistic, Table } from "semantic-ui-react";

import { GetNumberWithOrdinal } from "util/common";

export default function TeamStatsHeader({ team }) {
  const createStatistic = (text, value) => {
    return (
      <Statistic>
        <Statistic.Value>{value}</Statistic.Value>
        <Statistic.Label>{text}</Statistic.Label>
      </Statistic>
    );
  };

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
      <div className="team-stats-table">
        <Table>
          <Table.Header>
            <Table.Row>
              {team.stats.map((stat) => {
                return (
                  <Table.HeaderCell key={stat.title + team.id}>
                    {stat.title}
                  </Table.HeaderCell>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {team.stats.map((stat) => {
                return (
                  <Table.Cell key={stat.title + team.id}>
                    {stat.value}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

TeamStatsHeader.propTypes = {
  player: PropTypes.object,
};
