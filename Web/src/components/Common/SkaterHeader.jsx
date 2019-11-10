import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes';

import { Table } from 'semantic-ui-react';

function SkaterHeader(props) {
    const { individual } = props;
    return (<Table.Row key={"header"}>
        {!individual && <Table.HeaderCell>
            Name
        </Table.HeaderCell>}
        <Table.HeaderCell>
            POS
        </Table.HeaderCell>
        <Table.HeaderCell>
            GP
        </Table.HeaderCell>
        <Table.HeaderCell>
            G
        </Table.HeaderCell>
        <Table.HeaderCell>
            A
        </Table.HeaderCell>
        <Table.HeaderCell>
            PTS
        </Table.HeaderCell>
        <Table.HeaderCell>
            PPG
        </Table.HeaderCell>
        <Table.HeaderCell>
            PPP
        </Table.HeaderCell>
        <Table.HeaderCell>
            SHG
        </Table.HeaderCell>
        <Table.HeaderCell>
            SHP
        </Table.HeaderCell>
        <Table.HeaderCell>
            OTG
        </Table.HeaderCell>
        <Table.HeaderCell>
            GWG
        </Table.HeaderCell>
        <Table.HeaderCell>
            PIM
        </Table.HeaderCell>
        <Table.HeaderCell>
            +/-
        </Table.HeaderCell>
        <Table.HeaderCell>
            SOG
        </Table.HeaderCell>
        <Table.HeaderCell>
            HIT
        </Table.HeaderCell>
        <Table.HeaderCell>
            BLK
        </Table.HeaderCell>
        <Table.HeaderCell>
            TOI
        </Table.HeaderCell>
        <Table.HeaderCell>
            PPT
        </Table.HeaderCell>
        <Table.HeaderCell>
            SHT
        </Table.HeaderCell>
    </Table.Row>);
}

export default SkaterHeader;