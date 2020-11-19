import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flag, Header, List, Search, Segment, Table } from 'semantic-ui-react';

import * as actions from '../../services/player';
import './Player.css';
import Loader from '../../components/Loader/Loader';


import SkaterRow from '../../components/Common/SkaterRow';
import SkaterHeader from '../../components/Common/SkaterHeader';

import routes from '../../routes';

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
                    <Header as="h2">{player.Name}
                        <Header.Subheader>
                            <Flag name={player.Nationality.substring(0,2).toLowerCase()} />
                        </Header.Subheader>
                    </Header>
                    <List horizontal>
                        <List.Item>
                            <List.Icon name='user' />
                            <List.Header>Position</List.Header>
                            <List.Content>{player.Position}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='users' />
                            <List.Header>Team</List.Header>
                                <Link to={routes.teams + "/" + player.Team.Id}>{player.Team.Name}</Link>
                            </List.Item>
                        <List.Item>
                            <List.Icon name='birthday cake' />
                            <List.Header>Birthdate</List.Header>
                            <List.Content>{player.BirthDate.split("T")[0]}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='marker' />
                            <List.Header>Birthplace</List.Header>
                            <List.Content>{player.BirthPlace}</List.Content>
                        </List.Item>
                    </List>
                </Segment>
                <Header as='h4'>Statistics</Header>
                <Table><Table.Header>
                    <SkaterHeader individual={true} />
                </Table.Header>
                    <Table.Body>
                        <SkaterRow player={player} individual={true} />
                    </Table.Body>
                </Table>
            </div>);
    }
}

const mapStateToProps = state => ({
    player: state.app.player,
    suggestions: state.app.suggestions,
})

const mapDispatchToProps = dispatch => ({
    getPlayer: (id) => dispatch(actions.getPlayer(id)),
    searchBasicPlayer: (name) => dispatch(actions.searchBasicPlayer(name)),
    searchPlayer: (name) => dispatch(actions.searchPlayer(name, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);