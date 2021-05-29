import React from 'react';
import { Table } from 'semantic-ui-react';

import config from '../../util/config.json';
import './RosterStatsGrid.scss';

function RosterStatsGrid(props) {
  var exampleObject = props.rosterStats[2].stats;
  var displayedCategories = config.categories.map((cat) => {
    if (cat.name in exampleObject) {
      return (cat);
    }
  });
  return (
    <div>
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
          {props.rosterStats.map((stat, index) => {
            return (
              <Table.Row key={stat + index}>
                <Table.Cell>{stat.fullName}</Table.Cell>
                {displayedCategories.map((cat, i) => {
                  return (<Table.Cell key={index + 'col' + i}>{stat.stats[cat.name]}</Table.Cell>);
                })}
              </Table.Row>);
          })}
        </Table.Body>
      </Table>
    </div>
  );

}

export default RosterStatsGrid;