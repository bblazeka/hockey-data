import React from 'react';
import { Button, Table, Header } from 'semantic-ui-react';

import { formatDecimals, isNullOrUndefined } from '../../util/common';
import './CompareGrid.css';

function CompareGrid(props) {
  const { players, skater, detailed, onDelete } = props;
  if (isNullOrUndefined(players))
  {
    return(<div>Not found.</div>)
  }
  return (
    <div className="grid">
      <Header as='h4'>{skater ? "Skaters" : "Goalies"}</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>GP</Table.HeaderCell>
            {skater && <Table.HeaderCell>Goals</Table.HeaderCell>}
            {skater && <Table.HeaderCell>Assists</Table.HeaderCell>}
            {skater && <Table.HeaderCell>Points</Table.HeaderCell>}
            {skater && <Table.HeaderCell>PIM</Table.HeaderCell>}
            {skater && <Table.HeaderCell>+/-</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>FO</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>SOG</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>HIT</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>BLK</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>TOI</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>TOI-ES</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>TOI-PP</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>TOI-SH</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>SOG%</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>GWG</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>PPG</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>PPP</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>SHG</Table.HeaderCell>}
            {skater && detailed && <Table.HeaderCell>SHP</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>GS</Table.HeaderCell>}
            {!skater && <Table.HeaderCell>GAA</Table.HeaderCell>}
            {!skater && <Table.HeaderCell>SV%</Table.HeaderCell>}
            {!skater && <Table.HeaderCell>W</Table.HeaderCell>}
            {!skater && <Table.HeaderCell>L</Table.HeaderCell>}
            {!skater && <Table.HeaderCell>OT</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SV</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SV-ES</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SV-PP</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SV-SH</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SA</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SA-ES</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SA-PP</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SA-SH</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SV%-ES</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SV%-PP</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SV%-SH</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>SO</Table.HeaderCell>}
            {!skater && detailed && <Table.HeaderCell>TOI</Table.HeaderCell>}
            <Table.HeaderCell>Del</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((stat) => {
            var stats = stat.stats[0].splits[0].stat
            const key = `${stat.player.id}`;
            return (<Table.Row key={`row${key}`}>
              <Table.Cell>{stat.player.fullName}</Table.Cell>
              <Table.Cell>{stats.games}</Table.Cell>
              {skater && <Table.Cell>{stats.goals}</Table.Cell>}
              {skater && <Table.Cell>{stats.assists}</Table.Cell>}
              {skater && <Table.Cell><strong>{stats.points}</strong></Table.Cell>}
              {skater && <Table.Cell>{stats.pim}</Table.Cell>}
              {skater && <Table.Cell>{stats.plusMinus}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.faceOffPct}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.shots}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.hits}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.blocked}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.timeOnIce}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.evenTimeOnIce}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.powerPlayTimeOnIce}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.shortHandedTimeOnIce}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.shotPct}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.gameWinningGoals}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.powerPlayGoals}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.powerPlayPoints}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.shortHandedGoals}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stats.shortHandedPoints}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.gamesStarted}</Table.Cell>}
              {!skater && <Table.Cell>{formatDecimals(stats.goalAgainstAverage, 2)}</Table.Cell>}
              {!skater && <Table.Cell>{formatDecimals(stats.savePercentage * 100, 1)}</Table.Cell>}
              {!skater && <Table.Cell>{stats.wins}</Table.Cell>}
              {!skater && <Table.Cell>{stats.losses}</Table.Cell>}
              {!skater && <Table.Cell>{stats.ot}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.saves}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.evenSaves}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.powerPlaySaves}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.shortHandedSaves}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.shotsAgainst}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.evenShots}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.powerPlayShots}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.shortHandedShots}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{formatDecimals(stats.evenStrengthSavePercentage, 2)}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{formatDecimals(stats.powerPlaySavePercentage, 2)}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{formatDecimals(stats.shortHandedSavePercentage, 2)}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.shutouts}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.timeOnIce}</Table.Cell>}
              <Table.Cell><Button onClick={() => onDelete(stat.player.id)}>X</Button></Table.Cell>
            </Table.Row>);
          })}
        </Table.Body>
      </Table>
    </div>
  );

}

export default CompareGrid;