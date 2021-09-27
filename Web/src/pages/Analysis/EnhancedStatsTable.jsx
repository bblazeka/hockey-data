import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

import routes from "routes";

export default function EnhancedStatsTable({ team }) {
  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>GP</Table.HeaderCell>
            <Table.HeaderCell>G5v5</Table.HeaderCell>
            <Table.HeaderCell>G5v5/60</Table.HeaderCell>
            <Table.HeaderCell>A5v5</Table.HeaderCell>
            <Table.HeaderCell>A5v5/60</Table.HeaderCell>
            <Table.HeaderCell>P5v5</Table.HeaderCell>
            <Table.HeaderCell>P5v5/60</Table.HeaderCell>
            <Table.HeaderCell>OZS</Table.HeaderCell>
            <Table.HeaderCell>SAT%</Table.HeaderCell>
            <Table.HeaderCell>SAT5v5</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {team.enhancedSkaterStats.map((player) => {
            return (
              <Table.Row key={player.playerId + "enhancedStats"}>
                <Table.Cell>
                  <Link to={`${routes.player}/${player.playerId}`}>
                    {player.skaterFullName}
                  </Link>
                </Table.Cell>
                <Table.Cell>{player.gamesPlayed}</Table.Cell>
                <Table.Cell>{player.goals5v5}</Table.Cell>
                <Table.Cell>{player.goalsPer605v5}</Table.Cell>
                <Table.Cell>{player.assists5v5}</Table.Cell>
                <Table.Cell>{player.assistsPer605v5}</Table.Cell>
                <Table.Cell>{player.points5v5}</Table.Cell>
                <Table.Cell>{player.pointsPer605v5}</Table.Cell>
                <Table.Cell>{player.offensiveZoneStartPct5v5}</Table.Cell>
                <Table.Cell>{player.satPct}</Table.Cell>
                <Table.Cell>{player.satRelative5v5}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}

EnhancedStatsTable.propTypes = {
  player: PropTypes.object,
};
