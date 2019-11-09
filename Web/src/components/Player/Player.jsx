import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';
import './Player.css';
import Loader from '../Loader/Loader';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "0",
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        const { id } = props.match.params;
        if (state.id !== id) {
            props.getPlayer(id);
            return {
                id,
            }
        }
        return null
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.searchPlayer(this.query.value);
    }

    render() {
        const { player } = this.props;
        if (!player) {
            return (<div><Loader></Loader></div>)
        }
        return (
            <div>
                <input ref={(c) => this.query = c}></input>
                <button onClick={this.onSubmit}>Search</button>
                <div>
                {player.Name} ({player.Nationality})
                </div>
                <div>
                    {player.BirthPlace}
                </div>
                <div>
                    {player.BirthDate.split("T")[0]}
                </div>
                <div>
                {player.Position}
                </div>
                <div>{player.Games}</div><div>{player.Goals}</div><div>{player.Assists}</div><div>{player.PlusMinus}</div><div>{player.Shots}</div><div>{player.Hits}</div><div>{player.Blocked}</div><div></div><div>{player.TimeOnIce}</div><div>{player.PowerPlayTimeOnIce}</div><div>{player.ShortHandedTimeOnIce}</div>
            </div>);
    }
}

const mapStateToProps = state => ({
    player: state.app.player,
})

const mapDispatchToProps = dispatch => ({
    getPlayer: (id) => dispatch(appActions.getPlayer(id)),
    searchPlayer: (name) => dispatch(appActions.searchPlayer(name,true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);