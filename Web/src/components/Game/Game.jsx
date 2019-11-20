import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';

import { Header, Segment, Table } from 'semantic-ui-react';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "0",
            filterActive: true,
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { id } = props.match.params;
        if (state.id !== id) {
            props.getGame(id);
            return {
                id,
            }
        }
        return null
    }

    TeamRender(team) {
        return (
            <Segment>
                <Header as='h2'>{team.Name}</Header>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Name
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                                Pos
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                                G
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                                A
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                                SOG
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                                HIT
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                                BLK
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                                TOI
                        </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {team.Players.filter((player) => { return player.Position !== 'G' }).map((player) => {
                            return (<Table.Row>
                                <Table.Cell>{player.Name}</Table.Cell>
                                <Table.Cell>{player.Position}</Table.Cell>
                                <Table.Cell>{player.Goals}</Table.Cell>
                                <Table.Cell>{player.Assists}</Table.Cell>
                                <Table.Cell>{player.Shots}</Table.Cell>
                                <Table.Cell>{player.Hits}</Table.Cell>
                                <Table.Cell>{player.Blocked}</Table.Cell>
                                <Table.Cell>{player.TimeOnIce}</Table.Cell>
                            </Table.Row>)
                        })}
                    </Table.Body>
                </Table>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Name
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                                SV
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                                SV%
                        </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {team.Players.filter((player) => { return player.Position === 'G' }).map((player) => {
                            return (<Table.Row>
                                <Table.Cell>{player.Name}</Table.Cell>
                                <Table.Cell>{player.Saves}</Table.Cell>
                                <Table.Cell>{player.SavePerc}</Table.Cell>
                            </Table.Row>)
                        })}
                    </Table.Body>
                </Table>
            </Segment>

        )
    }

    render() {
        const { game } = this.props;
        if (!game) {
            return (<div></div>)
        }
        return (
            <div>
                <Segment.Group horizontal>
                    {this.TeamRender(game.Home)}
                    {this.TeamRender(game.Away)}
                </Segment.Group>

            </div>);
    }
}

const mapStateToProps = state => ({
    game: state.app.game,
})

const mapDispatchToProps = dispatch => ({
    getGame: (id) => dispatch(appActions.getGame(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);