import React from 'react';
import { Table, Header, Statistic } from 'semantic-ui-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './PlayerStatsGrid.scss';
import config from '../../util/config.json';
import { getLogo } from '../../util/assets';
import { FormatDecimals } from '../../util/common';
import { IsNullOrUndefined } from '../../util/common';
import { Loader } from '..';

function PlayerStatsGrid(props) {

  const { data, skater, detailed } = props;
  if (IsNullOrUndefined(data)) {
    return (<Loader></Loader>);
  }
  const { totalGames, totalGoals, totalAssists, totalPoints, totalGamesStarted, totalWins, stats, seasonSums } = data;

  var exampleObject = stats[stats.length - 1].stat;
  var displayedCategories = config.categories.filter((cat) => {
    return (cat.name in exampleObject);
  });
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
            {displayedCategories.map((cat, index) => {
              return (<Table.HeaderCell key={'headercol' + index}>{cat.abbr}</Table.HeaderCell>);
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stats.map((stat, index) => {
            const logo = getLogo(stat.team.id);
            const key = `${stat.team.id}${stat.team.name}${index}${stat.season}`;
            return (<Table.Row key={`row${key}`}>
              <Table.Cell>{stat.season}</Table.Cell>
              <Table.Cell>{logo && <img className="small-logo" src={logo} alt={`img${key}`}></img>}</Table.Cell>
              <Table.Cell>{stat.team.name}</Table.Cell>
              {!detailed && <Table.Cell>{stat.league ? stat.league.name : ''}</Table.Cell>}
              {displayedCategories.map((cat, i) => {
                var value = stat.stat[cat.name];
                if (cat.name === 'savePercentage') {
                  value = FormatDecimals(value * 100, 1);
                }
                else if (['goalAgainstAverage', 'evenStrengthSavePercentage', 'powerPlaySavePercentage', 'shortHandedSavePercentage'].includes(cat.name)) {
                  value = FormatDecimals(value, 2);
                }
                return (<Table.Cell key={'col' + i}>{value}</Table.Cell>);
              })}
            </Table.Row>);
          })}
        </Table.Body>
      </Table>
      <div className="stat-bar">
        {stats.length === 0 && <div>No stats to show.</div>}
        {stats.length > 0 && <div style={{ width: '100em', height: '20em' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={seasonSums}

              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="season" />
              <YAxis />
              <Tooltip />
              <Legend />
              {skater && <Line type="monotone" dataKey="goals" stroke="#8884d8" activeDot={{ r: 2 }} />}
              {skater && <Line type="monotone" dataKey="assists" stroke="#82ca9d" activeDot={{ r: 2 }} />}
              {!skater && <Line type="monotone" dataKey="games" stroke="#8884d8" activeDot={{ r: 2 }} />}
              {!skater && <Line type="monotone" dataKey="wins" stroke="#82ca9d" activeDot={{ r: 2 }} />}
            </LineChart>
          </ResponsiveContainer>
        </div>}
        <Statistic.Group horizontal>
          {totalGames && <Statistic>
            <Statistic.Value>
              {totalGames}
            </Statistic.Value>
            <Statistic.Label>Games</Statistic.Label>
          </Statistic>}
          {totalGoals && <Statistic>
            <Statistic.Value>
              {totalGoals}
            </Statistic.Value>
            <Statistic.Label>Goals</Statistic.Label>
          </Statistic>}
          {totalAssists && <Statistic>
            <Statistic.Value>
              {totalAssists}
            </Statistic.Value>
            <Statistic.Label>Assists</Statistic.Label>
          </Statistic>}
          {totalPoints && <Statistic>
            <Statistic.Value>
              {totalPoints}
            </Statistic.Value>
            <Statistic.Label>Points</Statistic.Label>
          </Statistic>}
          {totalGamesStarted && <Statistic>
            <Statistic.Value>
              {totalGamesStarted}
            </Statistic.Value>
            <Statistic.Label>Starts</Statistic.Label>
          </Statistic>}
          {totalWins && <Statistic>
            <Statistic.Value>
              {totalWins}
            </Statistic.Value>
            <Statistic.Label>Wins</Statistic.Label>
          </Statistic>}
        </Statistic.Group>
      </div>
    </div>
  );

}

export default PlayerStatsGrid;