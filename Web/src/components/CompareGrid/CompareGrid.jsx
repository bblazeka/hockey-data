import React from 'react';
import { Button, Table, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IsNullOrUndefined, FormatDecimals } from 'common';
import { CircularGridLines, DiscreteColorLegend, RadarChart } from 'react-vis';

import routes from '../../routes';
import { getLogo } from '../../util/assets';
import { NotFound } from '..';
import './CompareGrid.scss';

function CompareGrid(props) {
  const { players, skater, detailed, onDelete } = props;
  if (IsNullOrUndefined(players))
  {
    return(<NotFound />);
  }
  var chartData = players.map((p)=> {
    return Object.assign(p.stats, {
      'label': p.fullName
    });
  });
  var legend = players.map((p)=>{
    return p.fullName;
  });
  return (
    <div className="grid">
      <Header as='h4'>{skater ? 'Skaters' : 'Goalies'}</Header>
      <RadarChart
          animation
          data={chartData}
          domains={skater ? [
            {name: 'G', domain: [0, 50], getValue: d => d.goals},
            {name: 'A', domain: [0, 50], getValue: d => d.assists},
            {name: 'P', domain: [0, 80], getValue: d => d.points},
            {name: 'FO', domain: [0, 100], getValue: d => d.faceOffPct},
            {name: 'SOG', domain: [0, 200], getValue: d => d.shots},
            {name: 'HIT', domain: [0, 200], getValue: d => d.hits},
            {name: 'BLK', domain: [0, 200], getValue: d => d.blocked},
          ] : [
            {name: 'GP', domain: [0, 60], getValue: d => d.games},
            {name: 'W', domain: [0, 30], getValue: d => d.wins},
            {name: 'SHO', domain: [0, 10], getValue: d => d.shutouts},
            {name: 'SV', domain: [0, 1500], getValue: d => d.saves},
            {name: 'SV%', domain: [70, 100], getValue: d => FormatDecimals(d.savePercentage * 100, 1)}
          ]}
          style={{
            polygons: {
              fillOpacity: 0,
              strokeWidth: 3
            },
            axes: {
              text: {
                opacity: 1
              }
            },
            labels: {
              textAnchor: 'middle'
            }
          }}
          margin={{
            left: 50,
            top: 50,
            bottom: 40,
            right: 50
          }}
          width={450}
          height={400} >
            <DiscreteColorLegend
            style={{ position: 'relative', left: '420px', top: '-380px' }}
            items={legend}
          />
          <CircularGridLines tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)}/>
        </RadarChart>
        <RadarChart
          animation
          data={chartData}
          domains={skater ? [
            {name: 'EV-TOI', domain: [0, 1200], getValue: d => d.evenTimeOnIceMinutes},
            {name: 'PP-TOI', domain: [0, 250], getValue: d => d.powerPlayTimeOnIceMinutes},
            {name: 'SH-TOI', domain: [0, 250], getValue: d => d.shortHandedTimeOnIceMinutes},
          ] : [
            {name: 'EV-SVS%', domain: [70, 100], getValue: d => d.evenStrengthSavePercentage},
            {name: 'PP-SVS%', domain: [70, 100], getValue: d => d.powerPlaySavePercentage},
            {name: 'SH-SVS%', domain: [70, 100], getValue: d => d.shortHandedSavePercentage}
          ]}
          style={{
            polygons: {
              fillOpacity: 0,
              strokeWidth: 3
            },
            axes: {
              text: {
                opacity: 1
              }
            },
            labels: {
              textAnchor: 'middle'
            }
          }}
          margin={{
            left: 80,
            top: 50,
            bottom: 40,
            right: 50
          }}
          width={450}
          height={400} >
            <DiscreteColorLegend
            style={{ position: 'relative', left: '400px', top: '-380px' }}
            items={legend}
          />
          <CircularGridLines tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)}/>
        </RadarChart>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
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
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((player) => {
            const key = `${player.id}`;
            const stats = player.stats;
            if (IsNullOrUndefined(stats))
            {
              return (<Table.Row key={`row${key}`}>
              <Table.Cell><img className="small-logo" src={getLogo(player.currentTeam.id)} alt={`imglogo${player.id}`} /> <Link to={routes.player + '/' + player.id}>{player.fullName}</Link></Table.Cell>
              <Table.Cell>{player.primaryPosition.abbreviation}</Table.Cell>
              </Table.Row>);
            }
            return (<Table.Row key={`row${key}`}>
              <Table.Cell><img className="small-logo" src={getLogo(player.currentTeam.id)} alt={`imglogo${player.id}`} /> <Link to={routes.player + '/' + player.id}>{player.fullName}</Link></Table.Cell>
              <Table.Cell>{player.primaryPosition.abbreviation}</Table.Cell>
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
              {!skater && <Table.Cell>{FormatDecimals(stats.goalAgainstAverage, 2)}</Table.Cell>}
              {!skater && <Table.Cell>{FormatDecimals(stats.savePercentage * 100, 1)}</Table.Cell>}
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
              {!skater && detailed && <Table.Cell>{FormatDecimals(stats.evenStrengthSavePercentage, 2)}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{FormatDecimals(stats.powerPlaySavePercentage, 2)}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{FormatDecimals(stats.shortHandedSavePercentage, 2)}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.shutouts}</Table.Cell>}
              {!skater && detailed && <Table.Cell>{stats.timeOnIce}</Table.Cell>}
              <Table.Cell><Button onClick={() => onDelete(player.id)}>X</Button></Table.Cell>
            </Table.Row>);
          })}
        </Table.Body>
      </Table>
    </div>
  );

}

export default CompareGrid;