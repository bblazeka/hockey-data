import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes';

function PlayerTile(props) {
    const { name, id, team } = props.player;
    return (
        <div>
            <div><Link to={routes.player + "/" + id}>{name}</Link> </div><img className="small-logo" src={team.logo} alt={"img" + team.id}></img>
        </div>
    );
}

export default PlayerTile;