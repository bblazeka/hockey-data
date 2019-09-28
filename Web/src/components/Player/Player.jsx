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
        const { player } = this.props;
        return (
            <div>
                <input ref={(c) => this.query = c}></input>
                <button onClick={this.onSubmit}>Search</button>
                {player && <div>
                    {player.Name}-{player.Goals}-{player.Assists}
                </div>}
            </div>);
    }
}

const mapStateToProps = state => ({
    player: state.app.player,
})

const mapDispatchToProps = dispatch => ({
    searchPlayer: (name) => dispatch(appActions.searchPlayer(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);