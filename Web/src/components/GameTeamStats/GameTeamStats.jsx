import React from 'react';
import { Header, Segment, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './GameTeamStats.scss';
import Loader from '../Loader/Loader';
import routes from '../../routes';
import { getLogo } from '../../util/assets';
import { FormatDecimals, IsNullOrUndefined } from '../../util/common';
import config from '../../util/config.json';

function GameTeamStats(props) {
  const { team } = props;
  if (IsNullOrUndefined(team)) {
    return (<Loader></Loader>);
  }
  const exampleObject = team.skaters[0].stats;
  const displayedCategories = config.categories.filter((cat) => {
    return (cat.name in exampleObject);
  });

  const goalieObject = team.goalies[0].stats;
  const goalieCategories = config.categories.filter((cat) => {
    return (cat.name in goalieObject);
  });
  return (
    <Segment>
      <Header as='h2'><img className="mid-logo" src={getLogo(team.team.id)} alt={`img${team.team.id}${team.team.name}`} /> {team.team.name}</Header>
      <Header as="h3">Roster</Header>
      <div className="team-table">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>

              {displayedCategories.map((cat, index) => {
                return (<Table.HeaderCell key={'headercol' + index}>{cat.abbr}</Table.HeaderCell>);
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {team.skaters.map((player) => {
              return (<Table.Row key={player.person.fullName}>
                <Table.Cell><Link to={routes.player + '/' + player.person.id}><Header as="h4">{player.person.fullName}
                  <Header.Subheader>
                    {'#' + player.jerseyNumber + ' ' + player.position.name}
                  </Header.Subheader></Header></Link></Table.Cell>
                {displayedCategories.map((cat, i) => {
                  const value = player.stats[cat.name];
                  return (<Table.Cell key={'col' + i}>{value}</Table.Cell>);
                })}
              </Table.Row>);
            })}
          </Table.Body>
        </Table>
      </div>
      <Header as="h3">Goalies</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            {goalieCategories.map((cat, index) => {
              return (<Table.HeaderCell key={'headercol' + index}>{cat.abbr}</Table.HeaderCell>);
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {team.goalies.map((player) => {
            return (<Table.Row key={player.person.fullName}>
              <Table.Cell><Link to={routes.player + '/' + player.person.id}><Header as="h4">{player.person.fullName}
                <Header.Subheader>
                  {`#${player.jerseyNumber} ${player.position.name}`}
                </Header.Subheader></Header></Link></Table.Cell>
              {goalieCategories.map((cat, i) => {
                let value = player.stats[cat.name];
                if (cat.name === 'savePercentage') {
                  value = FormatDecimals(value, 1);
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
      <Header as="h3">Staff</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.values(team.coaches).map((coach) => {
            return (<Table.Row key={coach.person.fullName}>
              <Table.Cell>{coach.person.fullName}</Table.Cell>
              <Table.Cell>{coach.position.name}</Table.Cell>
            </Table.Row>);
          })}
        </Table.Body>
      </Table>
    </Segment>
  );

}

export default GameTeamStats;