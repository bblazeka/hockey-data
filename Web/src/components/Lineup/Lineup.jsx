import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';
import './Lineup.css';
import PlayerTile from '../PlayerTile/PlayerTile';

class Lineup extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.searchBasicPlayer(this.query.value);
    }

    onRemove(e) {
        e.preventDefault();
        this.props.removePlayer(e.target.value);
    }

    render() {
        const { roster } = this.props;
        console.log(roster)
        return (
            <div>
                <input ref={(c) => this.query = c}></input>
                <button onClick={this.onSubmit}>Search</button>
                {roster &&
                            roster.map((player) => {
                                return (
                                    <PlayerTile player={player} />
                                )
                            })
                        }
            </div>);
    }
}

const mapStateToProps = state => ({
    roster: state.app.roster,
})

const mapDispatchToProps = dispatch => ({
    removePlayer: (id) => dispatch(appActions.removePlayer(id)),
    searchBasicPlayer: (name) => dispatch(appActions.searchBasicPlayer(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lineup);