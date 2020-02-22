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
                                    {team.DivisionRank}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={routes.teams + "/" + team.Id}><img className="logo" src={team.Logo} alt={"img" + team.Id}></img></Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={routes.teams + "/" + team.Id}>{team.Name}</Link>
                                </Table.Cell>
                                <Table.Cell>
                                    {team.GamesPlayed}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.Wins}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.Losses}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.Ot}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.GoalsScored}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.GoalsAgainst}
                                </Table.Cell>
                                <Table.Cell>
                                    {team.Points}
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
            return team.Division === "Metro"
        });
        var atlanticTeams = standings.filter(function (team) {
            return team.Division === "ATL"
        });
        var centralTeams = standings.filter(function (team) {
            return team.Division === "CEN"
        });
        var pacificTeams = standings.filter(function (team) {
            return team.Division === "PAC"
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