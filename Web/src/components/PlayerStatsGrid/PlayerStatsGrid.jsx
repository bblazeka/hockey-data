import React, { useState } from 'react';
import { Table, Header, Statistic } from 'semantic-ui-react';
import { DiscreteColorLegend, XYPlot, Hint, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, LineMarkSeries } from 'react-vis';

import config from '../../util/config.json';
import { getLogo } from '../../util/assets';
import { FormatDecimals } from '../../util/common';
import './PlayerStatsGrid.scss';

function StatsGrid(props) {

  const [value, setValue] = useState(null);

  const { data, skater, detailed } = props;
  const { totalGames, totalGoals, totalAssists, totalPoints, totalGamesStarted, totalWins, goalsLine, assistsLine, stats, gamesStartedLine, winsLine } = data;
  var lineNames = (skater) ? ['goals', 'assists'] : ['Games started', 'Wins'];
  var lines = (skater) ? [goalsLine, assistsLine] : [gamesStartedLine, winsLine];

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
        {stats.length > 0 && <XYPlot height={300} width={1200} xType="ordinal" yDomain={[0, 80]}>
          <DiscreteColorLegend
            style={{ position: 'relative', left: '50px', top: '-295px' }}
            orientation="horizontal"
            items={[
              {
                title: lineNames[0],
                color: '#12939A'
              },
              {
                title: lineNames[1],
                color: '#79C7E3'
              }
            ]}
          />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {lines.map((l, index) => {
            return (<LineMarkSeries
              key={`line${index}`}
              style={{ fill: 'none' }}
              data={l}
              onValueMouseOver={(v) => setValue(v)}
              onValueMouseOut={() => setValue(null)}
            />);
          })}
          {value ? <Hint value={value} /> : null}
        </XYPlot>}
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

export default StatsGrid;