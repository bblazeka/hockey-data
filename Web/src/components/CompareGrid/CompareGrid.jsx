import React from 'react';
import { Button, Table, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { CircularGridLines, DiscreteColorLegend, RadarChart } from 'react-vis';

import routes from '../../routes';
import { IsNullOrUndefined, FormatDecimals } from '../../util/common';
import { getLogo } from '../../util/assets';
import { NotFound } from '..';
import config from '../../util/config.json';
import './CompareGrid.scss';

function CompareGrid(props) {
  const { players, skater, onDelete } = props;
  if (IsNullOrUndefined(players)) {
    return (<NotFound />);
  }
  var exampleObject = players[0].stats;
  var displayedCategories = config.categories.filter((cat) => {
    return (cat.name in exampleObject);
  });
  var chartData = players.map((p) => {
    return Object.assign(p.stats, {
      'label': p.fullName
    });
  });
  var legend = players.map((p) => {
    return p.fullName;
  });
  return (
    <div className="grid">
      <Header as='h4'>{skater ? 'Skaters' : 'Goalies'}</Header>
      <RadarChart
        animation
        data={chartData}
        domains={skater ? [
          { name: 'G', domain: [0, 50], getValue: d => d.goals },
          { name: 'A', domain: [0, 50], getValue: d => d.assists },
          { name: 'P', domain: [0, 80], getValue: d => d.points },
          { name: 'FO', domain: [0, 100], getValue: d => d.faceOffPct },
          { name: 'SOG', domain: [0, 200], getValue: d => d.shots },
          { name: 'HIT', domain: [0, 200], getValue: d => d.hits },
          { name: 'BLK', domain: [0, 200], getValue: d => d.blocked },
        ] : [
          { name: 'GP', domain: [0, 60], getValue: d => d.games },
          { name: 'W', domain: [0, 30], getValue: d => d.wins },
          { name: 'SHO', domain: [0, 10], getValue: d => d.shutouts },
          { name: 'SV', domain: [0, 1500], getValue: d => d.saves },
          { name: 'SV%', domain: [70, 100], getValue: d => FormatDecimals(d.savePercentage * 100, 1) }
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
        <CircularGridLines tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)} />
      </RadarChart>
      <RadarChart
        animation
        data={chartData}
        domains={skater ? [
          { name: 'EV-TOI', domain: [0, 1200], getValue: d => d.evenTimeOnIceMinutes },
          { name: 'PP-TOI', domain: [0, 250], getValue: d => d.powerPlayTimeOnIceMinutes },
          { name: 'SH-TOI', domain: [0, 250], getValue: d => d.shortHandedTimeOnIceMinutes },
        ] : [
          { name: 'EV-SVS%', domain: [70, 100], getValue: d => d.evenStrengthSavePercentage },
          { name: 'PP-SVS%', domain: [70, 100], getValue: d => d.powerPlaySavePercentage },
          { name: 'SH-SVS%', domain: [70, 100], getValue: d => d.shortHandedSavePercentage }
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
        <CircularGridLines tickValues={[...new Array(10)].map((v, i) => i / 10 - 1)} />
      </RadarChart>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            {displayedCategories.map((cat, index) => {
              return (<Table.HeaderCell key={'headercol' + index}>{cat.abbr}</Table.HeaderCell>);
            })}
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((player) => {
            const key = `${player.id}`;
            const stats = player.stats;
            if (IsNullOrUndefined(stats)) {
              return (<Table.Row key={`row${key}`}>
                <Table.Cell><img className="small-logo" src={getLogo(player.currentTeam.id)} alt={`imglogo${player.id}`} /> <Link to={routes.player + '/' + player.id}>{player.fullName}</Link></Table.Cell>
                <Table.Cell>{player.primaryPosition.abbreviation}</Table.Cell>
              </Table.Row>);
            }
            return (<Table.Row key={`row${key}`}>
              <Table.Cell><img className="small-logo" src={getLogo(player.currentTeam.id)} alt={`imglogo${player.id}`} /> <Link to={routes.player + '/' + player.id}>{player.fullName}</Link></Table.Cell>
              <Table.Cell>{player.primaryPosition.abbreviation}</Table.Cell>
              {displayedCategories.map((cat, i) => {
                var value = stats[cat.name];
                if (cat.name === 'savePercentage') {
                  value = FormatDecimals(stats[cat.name] * 100, 1);
                }
                else if (['goalAgainstAverage', 'evenStrengthSavePercentage', 'powerPlaySavePercentage', 'shortHandedSavePercentage'].includes(cat.name)) {
                  value = FormatDecimals(stats[cat.name], 2);
                }
                return (<Table.Cell key={'col' + i}>{value}</Table.Cell>);
              })}
              <Table.Cell><Button onClick={() => onDelete(player.id)}>X</Button></Table.Cell>
            </Table.Row>);
          })}
        </Table.Body>
      </Table>
    </div>
  );

}

export default CompareGrid;