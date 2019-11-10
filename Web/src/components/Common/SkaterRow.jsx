import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes';

import { Table } from 'semantic-ui-react';

function SkaterRow(props) {
    const { player, individual } = props;
    return (<Table.Row key={player.Id}>
        {!individual && <Table.Cell>
            <Link to={routes.player + "/" + player.Id}>{player.Name}</Link>
        </Table.Cell>}
        <Table.Cell>
            {player.Position}
        </Table.Cell>
        <Table.Cell>
            {player.Games}
        </Table.Cell>
        <Table.Cell>
            {player.Goals}
        </Table.Cell>
        <Table.Cell>
            {player.Assists}
        </Table.Cell>
        <Table.Cell>
            <strong>{player.Points}</strong>
        </Table.Cell>
        <Table.Cell>
            {player.PowerPlayGoals}
        </Table.Cell>
        <Table.Cell>
            {player.PowerPlayPoints}
        </Table.Cell>
        <Table.Cell>
            {player.ShortHandedGoals}
        </Table.Cell>
        <Table.Cell>
            {player.ShortHandedPoints}
        </Table.Cell>
        <Table.Cell>
            {player.OverTimeGoals}
        </Table.Cell>
        <Table.Cell>
            {player.GameWinningGoals}
        </Table.Cell>
        <Table.Cell>
            {player.Pim}
        </Table.Cell>
        <Table.Cell>
            {player.PlusMinus}
        </Table.Cell>
        <Table.Cell>
            {player.Shots}
        </Table.Cell>
        <Table.Cell>
            {player.Hits}
        </Table.Cell>
        <Table.Cell>
            {player.Blocked}
        </Table.Cell>
        <Table.Cell>
            {player.TimeOnIce}
        </Table.Cell>
        <Table.Cell>
            {player.PowerPlayTimeOnIce}
        </Table.Cell>
        <Table.Cell>
            {player.ShortHandedTimeOnIce}
        </Table.Cell>
    </Table.Row>
    );

}

export default SkaterRow;