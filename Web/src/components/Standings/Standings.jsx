import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';
import './Standings.css';
import Loader from '../Loader/Loader';

class Standings extends Component {
    constructor(props) {
        super(props)
        this.props.getStandings()
    }

    renderTeams(name, teams) {
        return (
            <div id={name}>
                <label>{name}</label><table><tbody>
                    <tr>
                        <td>
                            Rank
                        </td>
                        <td>
                            Logo
                        </td>
                        <td>
                            Team
                        </td>
                        <td>
                            GP
                        </td>
                        <td>
                            W
                        </td>
                        <td>
                            L
                        </td>
                        <td>
                            OT
                        </td>
                        <td>
                            GS
                        </td>
                        <td>
                            GA
                        </td>
                        <td>
                            PTS
                        </td>
                    </tr>
                    {teams.map((team) => {
                        return (
                            <tr>
                                <td>
                                    {team.divisionRank}
                                </td>
                                <td>
                                    <img className="logo" src={team.logo} alt={"img" + team.id}></img>
                                </td>
                                <td>
                                    {team.name}
                                </td>
                                <td>
                                    {team.gamesPlayed}
                                </td>
                                <td>
                                    {team.wins}
                                </td>
                                <td>
                                    {team.losses}
                                </td>
                                <td>
                                    {team.ot}
                                </td>
                                <td>
                                    {team.goalsScored}
                                </td>
                                <td>
                                    {team.goalsAgainst}
                                </td>
                                <td>
                                    {team.points}
                                </td>
                            </tr>
                        )
                    })}
                </tbody></table></div>)
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
                {this.renderTeams("Metro", metroTeams)}
                {this.renderTeams("Atlantic", atlanticTeams)}
                {this.renderTeams("Central", centralTeams)}
                {this.renderTeams("Pacific", pacificTeams)}
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