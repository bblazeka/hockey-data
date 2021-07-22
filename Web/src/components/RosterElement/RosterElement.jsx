import React from 'react';
import { Flag, Header, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import './RosterElement.scss';
import routes from '../../routes';
import { generateSemanticUICountryId, FormatNumberToCurrency } from '../../util/common';
import { IsNullOrUndefined } from '../../util/common';
import { Loader } from '..';

function RosterElement(props) {
  const { filterPlayers, players, title } = props;
  if (IsNullOrUndefined(players)) {
    return (<Loader></Loader>);
  }
  return (
    <div className="roster-part">
      <Header as='h4'>{title}</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Num</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Birthdate</Table.HeaderCell>
            <Table.HeaderCell>Birthplace</Table.HeaderCell>
            <Table.HeaderCell>Nationality</Table.HeaderCell>
            <Table.HeaderCell>Height</Table.HeaderCell>
            <Table.HeaderCell>Weight</Table.HeaderCell>
            <Table.HeaderCell>S/C</Table.HeaderCell>
            <Table.HeaderCell>Cap hit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.filter(p => (filterPlayers && p.rosterStatus === 'Y') || !filterPlayers).map((player) => {
            return (
              <Table.Row key={title + player.id}>
                <Table.Cell>{player.jerseyNumber}</Table.Cell>
                <Table.Cell><Link to={`${routes.player}/${player.id}`}>{player.fullName}</Link></Table.Cell>
                <Table.Cell>{player.primaryPosition.name}</Table.Cell>
                <Table.Cell>{player.currentAge}</Table.Cell>
                <Table.Cell>{player.birthDate}</Table.Cell>
                <Table.Cell>{player.birthCity}</Table.Cell>
                <Table.Cell><Flag name={generateSemanticUICountryId(player.nationality)} /> {player.nationality}</Table.Cell>
                <Table.Cell>{player.height}</Table.Cell>
                <Table.Cell>{player.weight}</Table.Cell>
                <Table.Cell>{player.shootsCatches}</Table.Cell>
                <Table.Cell>{FormatNumberToCurrency(player.capHit)}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body></Table>
    </div>
  );

}

export default RosterElement;