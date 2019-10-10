import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';
import './Player.css';

class Player extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.searchPlayer(this.query.value);
    }

    render() {
        const { players } = this.props;
        console.log(players)
        return (
            <div>
                <input ref={(c) => this.query = c}></input>
                <button onClick={this.onSubmit}>Search</button>
                <table>
                    <tbody>
                        <tr><td>Player</td><td>Pos</td><td>GP</td><td>G</td><td>A</td><td>SOG</td></tr>
                        {players &&
                            players.map((player) => {
                                return (
                                    <tr>
                                        <td>{player.Name}</td><td>{player.Position}</td><td>{player.Games}</td><td>{player.Goals}</td><td>{player.Assists}</td><td>{player.Shots}</td>
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
    searchPlayer: (name) => dispatch(appActions.searchPlayer(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);