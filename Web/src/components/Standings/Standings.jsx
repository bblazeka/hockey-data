import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as appActions from '../../actions/appActions';
import './Standings.css';
import Loader from '../Loader/Loader';
import routes from '../../routes';

import { Table } from 'semantic-ui-react';

class Standings extends Component {
    constructor(props) {
        super(props)
        this.props.getStandings()
    }

    renderTeams(name, teams) {
        return (
            <div className="standings" id={name}>
                <label>{name}</label>
                <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Rank
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Logo
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Team
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            GP
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            W
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            L
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            OT
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            GS
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            GA
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            PTS
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {teams.map((team) => {
                        return (
                            <Table.Row>
                                <Table.Cell>
                                    {team.divisionRank}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={routes.teams + "/" + team.id}><img className="logo" src={team.logo} alt={"img" + team.id}></img></Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={routes.teams + "/" + team.id}>{team.name}</Link>
                                </Table.Cell>
                                <Table.Cell>
                                    {team.gamesPlayed}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.wins}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.losses}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.ot}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.goalsScored}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.goalsAgainst}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.points}
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    </Table.Body>
                </Table></div>)
    }

    render() {
        const { standings } = this.props;
        if (!standings) {
            return (<div><Loader></Loader></div>)
        }
        var metroTeams = standings.filter(function (team) {
            return team.division === "Metro"
        });
        var atlanticTeams = standings.filter(function (team) {
            return team.division === "ATL"
        });
        var centralTeams = standings.filter(function (team) {
            return team.division === "CEN"
        });
        var pacificTeams = standings.filter(function (team) {
            return team.division === "PAC"
        });
        return (
            <div>
                <div className="conference-display">
                    {this.renderTeams("Metro", metroTeams)}
                    {this.renderTeams("Atlantic", atlanticTeams)}
                </div>
                <div className="conference-display">
                    {this.renderTeams("Central", centralTeams)}
                    {this.renderTeams("Pacific", pacificTeams)}
                </div>
            </div>);
    }
}

const mapStateToProps = state => ({
    standings: state.app.standings,
})

const mapDispatchToProps = dispatch => ({
    getStandings: () => dispatch(appActions.getStandings())
})

export default connect(mapStateToProps, mapDispatchToProps)(Standings);