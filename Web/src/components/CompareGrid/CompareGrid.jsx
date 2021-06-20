import React from 'react';
import { Button, Header, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Radar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10} from 'd3-scale-chromatic';

import './CompareGrid.scss';
import routes from '../../routes';
import { IsNullOrUndefined, FormatDecimals } from '../../util/common';
import { getLogo } from '../../util/assets';
import { NotFound } from '..';
import config from '../../util/config.json';

function CompareGrid(props) {
  const { players, skater, onDelete } = props;
  if (IsNullOrUndefined(players)) {
    return (<NotFound />);
  }
  var exampleObject = players[0].stats;
  var displayedCategories = config.categories.filter((cat) => {
    return (cat.name in exampleObject);
  });
  displayedCategories.forEach(cat => {
    return Object.assign(cat, { 
      topVal: (cat.reverse) ? Math.min.apply(Math, players.map(function (o) { return o.stats[cat.name]; })) 
      : Math.max.apply(Math, players.map(function (o) { return o.stats[cat.name]; })) 
    });
  });

  var playerNames = players.map(p => p.fullName);
  var categories = config.categories.filter((cat) => {
    return (cat.compare && ((skater && cat.skaterCategory) || (!skater && cat.goalieCategory)));
  });

  var chartData = categories.map((cat) => {
    var playerScores = {};
    players.forEach((player) => {
      playerScores[player.fullName] = player.stats[cat.name] / cat.topVal * 1.0;
    });
    return Object.assign(cat, playerScores);
  });
  return (
    <div className="grid">
      <Header as='h4'>{skater ? 'Skaters' : 'Goalies'}</Header>
      <div style={{ width: '40vw', height: '30vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="description" />
            <PolarRadiusAxis angle={30} domain={[0, 1]} />
            <Legend />
            {playerNames && playerNames.map((pn, i) => {
              return (<Radar key={'radar' + i} name={pn} dataKey={pn} stroke={scaleOrdinal(schemeCategory10).range()[i%10]} fill={scaleOrdinal(schemeCategory10).range()[i%10]} fillOpacity={0.6} />);
            })}

          </RadarChart>
        </ResponsiveContainer>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            {displayedCategories.map((cat, index) => {
              return (<Table.HeaderCell key={'headercol' + index}>{cat.abbr}</Table.HeaderCell>);
            })}
            <Table.HeaderCell>Points</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((player) => {
            const key = `${player.id}`;
            const stats = player.stats;
            var countTopValues = 0;
            if (IsNullOrUndefined(stats)) {
              return (<Table.Row key={`row${key}`}>
                <Table.Cell><img className="small-logo" src={getLogo(player.currentTeam.id)} alt={`imglogo${player.id}`} /> <Link to={routes.player + '/' + player.id}>{player.fullName}</Link></Table.Cell>
                <Table.Cell>{player.primaryPosition.abbreviation}</Table.Cell>
              </Table.Row>);
            }
            return (<Table.Row key={`row${key}`}>
              <Table.Cell>
                <img className="small-logo" src={getLogo(player.currentTeam.id)} alt={`imglogo${player.id}`} /> 
                <Link to={routes.player + '/' + player.id}>{player.fullName}</Link>
              </Table.Cell>
              <Table.Cell>{player.primaryPosition.abbreviation}</Table.Cell>
              {displayedCategories.map((cat, i) => {
                var value = stats[cat.name];
                if (cat.name === 'savePercentage') {
                  value = FormatDecimals(stats[cat.name] * 100, 1);
                }
                else if (['goalAgainstAverage', 'evenStrengthSavePercentage', 'powerPlaySavePercentage', 'shortHandedSavePercentage'].includes(cat.name)) {
                  value = FormatDecimals(stats[cat.name], 2);
                }
                countTopValues += (value === cat.topVal) ? 1 : 0;
                return (<Table.Cell positive={value === cat.topVal} key={'col' + i}>{value}</Table.Cell>);
              })}
              <Table.Cell>
                <Header as='h3' textAlign='center'>
                  {countTopValues}
                </Header>
              </Table.Cell>
              <Table.Cell><Button size='mini' circular onClick={() => onDelete(player.id)}>
                X</Button></Table.Cell>
            </Table.Row>);
          })}
        </Table.Body>
      </Table>
    </div>
  );

}

export default CompareGrid;