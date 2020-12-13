import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as playerActions from '../../services/player';
import './Lineup.css';

import { Grid, Search } from 'semantic-ui-react';
import LineupCard from '../../components/LineupCard/LineupCard';

const initialState = { isLoading: false, results: [], value: '' }

class Lineup extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        if (this.state.value.length < 1 && value.length < 1) {
            return this.setState(initialState);
        }

        if (value.length > 2) {
            this.props.searchBasicPlayer(value);
            this.setState({ isLoading: false, value });
        }
    }

    handleResultSelect = (e, { result }) => {
        this.props.addToLineup(result);
    }

    onRemove(e) {
        e.preventDefault();
        this.props.removePlayer(e.target.value);
    }

    render() {
        const { suggestions, roster } = this.props;
        const { isLoading, value } = this.state;
        return (
            <div>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={suggestions}
                    value={value}
                />
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <LineupCard player={roster[0]} />
                        </Grid.Column>
                        <Grid.Column>
                            <LineupCard player={roster[1]} />
                        </Grid.Column>
                        <Grid.Column>
                            <LineupCard player={roster[2]} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <LineupCard player={roster[3]} />
                        </Grid.Column>
                        <Grid.Column>
                            <LineupCard player={roster[4]} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>);
    }
}

const mapStateToProps = state => ({
    suggestions: state.app.suggestions,
    roster: state.app.roster,
})

const mapDispatchToProps = dispatch => ({
    removePlayer: (id) => dispatch(playerActions.removePlayer(id)),
    searchBasicPlayer: (name) => dispatch(playerActions.searchBasicPlayer(name)),
    addToLineup: (player) => dispatch(playerActions.addToLineup(player))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lineup);