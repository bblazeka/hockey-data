import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as appActions from '../../actions/appActions';
import './PlayerList.css';
import routes from '../../routes';

import { Button, Search, Table } from 'semantic-ui-react';

const initialState = { isLoading: false, results: [], value: '' }

class PlayerList extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
        this.onRemove = this.onRemove.bind(this);
    }

    onRemove(e) {
        e.preventDefault();
        this.props.removePlayer(e.target.value);
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
        const { players, suggestions } = this.props;
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
                <Table>
                    <Table.Header>
                        <Table.Row><Table.HeaderCell>Player</Table.HeaderCell><Table.HeaderCell>Pos</Table.HeaderCell><Table.HeaderCell>GP</Table.HeaderCell><Table.HeaderCell>G</Table.HeaderCell><Table.HeaderCell>A</Table.HeaderCell><Table.HeaderCell>+/-</Table.HeaderCell><Table.HeaderCell>SOG</Table.HeaderCell><Table.HeaderCell>HIT</Table.HeaderCell><Table.HeaderCell>BLK</Table.HeaderCell><Table.HeaderCell></Table.HeaderCell><Table.HeaderCell>TOI</Table.HeaderCell><Table.HeaderCell>PP-TOI</Table.HeaderCell><Table.HeaderCell>PK-TOI</Table.HeaderCell><Table.HeaderCell>Remove</Table.HeaderCell></Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {players &&
                            players.map((player) => {
                                return (
                                    <Table.Row>
                                        <Table.Cell><Link to={routes.player + "/" + player.Id}>{player.Name}</Link></Table.Cell><Table.Cell>{player.Position}</Table.Cell><Table.Cell>{player.Games}</Table.Cell><Table.Cell>{player.Goals}</Table.Cell><Table.Cell>{player.Assists}</Table.Cell><Table.Cell>{player.PlusMinus}</Table.Cell><Table.Cell>{player.Shots}</Table.Cell><Table.Cell>{player.Hits}</Table.Cell><Table.Cell>{player.Blocked}</Table.Cell><Table.Cell></Table.Cell><Table.Cell>{player.TimeOnIce}</Table.Cell><Table.Cell>{player.PowerPlayTimeOnIce}</Table.Cell><Table.Cell>{player.ShortHandedTimeOnIce}</Table.Cell><Table.Cell><Button basic value={player.Id} onClick={this.onRemove}>X</Button></Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>);
    }
}

const mapStateToProps = state => ({
    players: state.app.players,
    suggestions: state.app.suggestions,
})

const mapDispatchToProps = dispatch => ({
    removePlayer: (id) => dispatch(appActions.removePlayer(id)),
    searchBasicPlayer: (name) => dispatch(appActions.searchBasicPlayer(name)),
    searchPlayer: (name) => dispatch(appActions.searchPlayer(name, false))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);