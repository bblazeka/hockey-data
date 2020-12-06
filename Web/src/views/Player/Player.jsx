import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flag, Header, List, Search, Segment } from 'semantic-ui-react';

import * as actions from '../../services/player';
import './Player.css';
import Loader from '../../components/Loader/Loader';

import routes from '../../routes';
import { StatsGrid } from '../../components';

const initialState = { isLoading: false, results: [], value: '' }

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
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
        this.setState({ value: result.title });
        this.props.searchPlayer(result.title);
    }

    render() {
        const { isLoading, value } = this.state;
        const { player, suggestions } = this.props;
        if (!player) {
            return (<div><Loader></Loader></div>)
        }
        return (
            <div>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={this.handleSearchChange}
                    results={suggestions}
                    value={value}
                />
                <Segment textAlign='center'>
                    <Header as="h2">{player.fullName}
                        <Header.Subheader>
                            <Flag name={player.nationality.substring(0,2).toLowerCase()} />
                        </Header.Subheader>
                    </Header>
                    <List horizontal>
                        <List.Item>
                            <List.Icon name='user' />
                            <List.Header>Position</List.Header>
                            <List.Content>{player.primaryPosition.name}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='users' />
                            <List.Header>Team</List.Header>
                                <Link to={routes.teams + "/" + player.currentTeam.id}>{player.currentTeam.name}</Link>
                            </List.Item>
                        <List.Item>
                            <List.Icon name='birthday cake' />
                            <List.Header>Birthdate</List.Header>
                            <List.Content>{player.birthDate}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='marker' />
                            <List.Header>Birthplace</List.Header>
                            <List.Content>{player.birthCity}</List.Content>
                        </List.Item>
                    </List>
                </Segment>
                <StatsGrid player={player}></StatsGrid>
            </div>);
    }
}

const mapStateToProps = state => ({
    player: state.player.player,
    suggestions: state.player.suggestions,
})

const mapDispatchToProps = dispatch => ({
    getPlayer: (id) => dispatch(actions.getPlayer(id)),
    searchBasicPlayer: (name) => dispatch(actions.searchBasicPlayer(name)),
    searchPlayer: (name) => dispatch(actions.searchPlayer(name, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);