import React from 'react';
import { Table, Header } from 'semantic-ui-react';

import { getLogo } from '../../util/assets';
import './StatsGrid.css';

function StatsGrid(props) {
  const { player } = props;
  return (
    <div className="grid">
      <Header as='h4'>Statistics</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Season
            </Table.HeaderCell>
            <Table.HeaderCell>

            </Table.HeaderCell>
            <Table.HeaderCell>
              Team
            </Table.HeaderCell>
            <Table.HeaderCell>
              League
            </Table.HeaderCell>
            <Table.HeaderCell>
              Games
            </Table.HeaderCell>
            <Table.HeaderCell>
              Goals
            </Table.HeaderCell>
            <Table.HeaderCell>
              Assists
            </Table.HeaderCell>
            <Table.HeaderCell>
              Points
            </Table.HeaderCell>
            <Table.HeaderCell>
              PIM
            </Table.HeaderCell>
            <Table.HeaderCell>
              +/-
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {player.stats.map((stat) => {
            const logo = getLogo(stat.team.id);
            return (<Table.Row key={`row${stat.team.id}${stat.sequenceNumber}${stat.season}`}>
              <Table.Cell>
                {stat.season}
              </Table.Cell>
              <Table.Cell>
                {logo && <img className="small-logo" src={logo} alt={`img${stat.team.id}${stat.sequenceNumber}${stat.season}`}></img>}
              </Table.Cell>
              <Table.Cell>
                {stat.team.name}
              </Table.Cell>
              <Table.Cell>
                {stat.league.name}
              </Table.Cell>
              <Table.Cell>
                {stat.stat.games}
              </Table.Cell>
              <Table.Cell>
                {stat.stat.goals}
              </Table.Cell>
              <Table.Cell>
                {stat.stat.assists}
              </Table.Cell>
              <Table.Cell>
                <strong>{stat.stat.points}</strong>
              </Table.Cell>
              <Table.Cell>
                {stat.stat.pim}
              </Table.Cell>
              <Table.Cell>
                {stat.stat.plusMinus}
              </Table.Cell>
            </Table.Row>);
          })}
        </Table.Body>
      </Table>
    </div>
  );

}

export default StatsGrid;