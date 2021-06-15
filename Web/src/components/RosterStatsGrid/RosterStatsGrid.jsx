import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Table } from 'semantic-ui-react';

import './RosterStatsGrid.scss';
import config from '../../util/config.json';
import routes from '../../routes';
import { FormatDecimals } from '../../util/common';

function RosterStatsGrid(props) {
  const { rosterStats, title } = props;
  var exampleObject = rosterStats[0].stats;
  var displayedCategories = config.categories.filter((cat) => {
    return (cat.name in exampleObject);
  });
  return (
    <div className="roster-stats">
      <Header as='h4'>{title}</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            {displayedCategories.map((cat, index) => {
              return (<Table.HeaderCell key={'headercol' + index}>{cat.abbr}</Table.HeaderCell>);
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rosterStats.map((stat, index) => {
            return (
              <Table.Row key={stat + index}>
                <Table.Cell><Link to={`${routes.player}/${stat.id}`}>{stat.fullName}</Link></Table.Cell>
                {displayedCategories.map((cat, i) => {
                var value = stat.stats[cat.name];
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
    </div>
  );

}

export default RosterStatsGrid;