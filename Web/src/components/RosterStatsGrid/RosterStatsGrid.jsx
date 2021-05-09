import React from 'react';
import { Table } from 'semantic-ui-react';

import './RosterStatsGrid.scss';

function RosterStatsGrid(props) {

  return (
    <div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>GP</Table.HeaderCell>
            <Table.HeaderCell>G</Table.HeaderCell>
            <Table.HeaderCell>A</Table.HeaderCell>
            <Table.HeaderCell>PTS</Table.HeaderCell>
            <Table.HeaderCell>+/-</Table.HeaderCell>
            <Table.HeaderCell>TOI</Table.HeaderCell>
            <Table.HeaderCell>PPG</Table.HeaderCell>
            <Table.HeaderCell>PPP</Table.HeaderCell>
            <Table.HeaderCell>SOG</Table.HeaderCell>
            <Table.HeaderCell>HIT</Table.HeaderCell>
            <Table.HeaderCell>BLK</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.rosterStats.map((stat, index) => {
            return (
              <Table.Row key={stat + index}>
                <Table.Cell>{stat.fullName}</Table.Cell>
                <Table.Cell>{stat.stats.games}</Table.Cell>
                <Table.Cell>{stat.stats.goals}</Table.Cell>
                <Table.Cell>{stat.stats.assists}</Table.Cell>
                <Table.Cell>{stat.stats.points}</Table.Cell>
                <Table.Cell>{stat.stats.plusMinus}</Table.Cell>
                <Table.Cell>{stat.stats.timeOnIce}</Table.Cell>
                <Table.Cell>{stat.stats.powerPlayGoals}</Table.Cell>
                <Table.Cell>{stat.stats.powerPlayPoints}</Table.Cell>
                <Table.Cell>{stat.stats.shots}</Table.Cell>
                <Table.Cell>{stat.stats.hits}</Table.Cell>
                <Table.Cell>{stat.stats.blocked}</Table.Cell>
              </Table.Row>);
          })}
        </Table.Body>
      </Table>
    </div>
  );

}

export default RosterStatsGrid;