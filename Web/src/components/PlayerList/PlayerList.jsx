import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as appActions from '../../actions/appActions';
import './PlayerList.css';
import routes from '../../routes';

class PlayerList extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.searchPlayer(this.query.value);
    }

    onRemove(e) {
        e.preventDefault();
        this.props.removePlayer(e.target.value);
    }

    render() {
        const { players } = this.props;
        return (
            <div>
                <input ref={(c) => this.query = c}></input>
                <button onClick={this.onSubmit}>Search</button>
                <table>
                    <tbody>
                        <tr><td>Player</td><td>Pos</td><td>GP</td><td>G</td><td>A</td><td>+/-</td><td>SOG</td><td>HIT</td><td>BLK</td><td></td><td>TOI</td><td>PP-TOI</td><td>PK-TOI</td><td>Remove</td></tr>
                        {players &&
                            players.map((player) => {
                                return (
                                    <tr>
                                        <td><Link to={routes.player + "/" + player.Id}>{player.Name}</Link></td><td>{player.Position}</td><td>{player.Games}</td><td>{player.Goals}</td><td>{player.Assists}</td><td>{player.PlusMinus}</td><td>{player.Shots}</td><td>{player.Hits}</td><td>{player.Blocked}</td><td></td><td>{player.TimeOnIce}</td><td>{player.PowerPlayTimeOnIce}</td><td>{player.ShortHandedTimeOnIce}</td><td><button value={player.Id} onClick={this.onRemove}>X</button></td>
                            </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>);
    }
}

const mapStateToProps = state => ({
    players: state.app.players,
})

const mapDispatchToProps = dispatch => ({
    removePlayer: (id) => dispatch(appActions.removePlayer(id)),
    searchPlayer: (name) => dispatch(appActions.searchPlayer(name,false))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);