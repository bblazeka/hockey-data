import React from 'react';
import { Table, Header } from 'semantic-ui-react';

import { getLogo } from '../../util/assets';
import { isNullOrUndefined } from '../../util/common';
import './StatsGrid.css';

function formatDecimals(number, decimalPlaces)
{
  if (!isNullOrUndefined(number) && !isNaN(number))
  {
    return number.toFixed(decimalPlaces)
  }
  return null;
}

function StatsGrid(props) {
  const { stats, skater, detailed } = props;
  return (
    <div className="grid">
      <Header as='h4'>Statistics</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Season</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            {!detailed && <Table.HeaderCell>League</Table.HeaderCell>}
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stats.map((stat) => {
            const logo = getLogo(stat.team.id);
            const key = `${stat.team.id}${stat.sequenceNumber}${stat.season}`;
            return (<Table.Row key={`row${key}`}>
              <Table.Cell>{stat.season}</Table.Cell>
              <Table.Cell>{logo && <img className="small-logo" src={logo} alt={`img${key}`}></img>}</Table.Cell>
              <Table.Cell>{stat.team.name}</Table.Cell>
              {!detailed && <Table.Cell>{stat.league.name}</Table.Cell>}
              <Table.Cell>{stat.stat.games}</Table.Cell>
              {skater && <Table.Cell>{stat.stat.goals}</Table.Cell>}
              {skater && <Table.Cell>{stat.stat.assists}</Table.Cell>}
              {skater && <Table.Cell><strong>{stat.stat.points}</strong></Table.Cell>}
              {skater && <Table.Cell>{stat.stat.pim}</Table.Cell>}
              {skater && <Table.Cell>{stat.stat.plusMinus}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.faceOffPct}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.shots}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.hits}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.blocked}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.timeOnIce}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.evenTimeOnIce}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.powerPlayTimeOnIce}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.shortHandedTimeOnIce}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.shotPct}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.gameWinningGoals}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.powerPlayGoals}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.powerPlayPoints}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.shortHandedGoals}</Table.Cell>}
              {skater && detailed && <Table.Cell>{stat.stat.shortHandedPoints}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.gamesStarted}</Table.Cell>}
              {!skater && <Table.Cell>{formatDecimals(stat.stat.goalAgainstAverage, 2)}</Table.Cell>}
              {!skater && <Table.Cell>{formatDecimals(stat.stat.savePercentage*100, 1)}</Table.Cell>}
              {!skater && <Table.Cell>{stat.stat.wins}</Table.Cell>}
              {!skater && <Table.Cell>{stat.stat.losses}</Table.Cell>}
              {!skater && <Table.Cell>{stat.stat.ot}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.saves}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.evenSaves}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.powerPlaySaves}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.shortHandedSaves}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.shotsAgainst}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.evenShots}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.powerPlayShots}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.shortHandedShots}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{formatDecimals(stat.stat.evenStrengthSavePercentage, 2)}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{formatDecimals(stat.stat.powerPlaySavePercentage, 2)}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{formatDecimals(stat.stat.shortHandedSavePercentage, 2)}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.shutouts}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stat.stat.timeOnIce}</Table.Cell>}
            </Table.Row>);
          })}
        </Table.Body>
      </Table>
    </div>
  );

}

export default StatsGrid;