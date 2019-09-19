import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appActions from '../../actions/appActions';
import './Team.css';
import Loader from '../Loader/Loader';

class Team extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "0",
            filterActive: true,
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { id } = props.match.params;
        if (state.id !== id) {
            props.getTeam(id);
            return {
                id,
            }
        }
        return null
    }

    render() {
        const { team } = this.props;
        const { filterActive } = this.props;
        if (!team) {
            return (<div><Loader></Loader></div>)
        }
        return (
            <div>
                {team.Name}
                <div className="roster">
                    <div className="roster-part">
                        <table><tbody>
                            <tr key={"goalies-header"}><td>Name</td><td>GP</td><td>GAA</td><td>SVS%</td><td>SV</td><td>TOI</td><td>W</td><td>L</td><td>OTL</td></tr>
                            {team.Goalies.filter(function (goalie) {
                                return filterActive || goalie.Games > 0
                            }).map((goalie) => {
                                return (<tr key={"g" + goalie.Name}><td>{goalie.Name}</td><td>{goalie.Games}</td><td>{goalie.GlsAgainstAverage}</td><td>{goalie.SavePerc}</td><td>{goalie.Saves}</td><td>{goalie.Toi}</td><td>{goalie.Wins}</td><td>{goalie.Losses}</td><td>{goalie.Ot}</td></tr>)
                            })}
                        </tbody></table>
                    </div>
                    <div className="roster-part">
                        <table><tbody>
                            <tr key={"skater-header"}><td>Name</td><td>POS</td><td>GP</td><td>G</td><td>A</td><td>PTS</td><td>PIM</td><td>+/-</td><td>SOG</td></tr>
                            {team.Skaters.filter(function (player) {
                                return filterActive || player.Games > 0
                            }).map((skater) => {
                                return (<tr key={"s" + skater.Name}><td>{skater.Name}</td><td>{skater.Position}</td><td>{skater.Games}</td><td>{skater.Goals}</td><td>{skater.Assists}</td><td>{skater.Points}</td><td>{skater.Pim}</td><td>{skater.PlusMinus}</td><td>{skater.Shots}</td></tr>)
                            })}
                        </tbody></table>
                    </div>
                </div>
            </div>);
    }
}

const mapStateToProps = state => ({
    team: state.app.team,
    teams: state.app.teams,
})

const mapDispatchToProps = dispatch => ({
    getTeam: (id) => dispatch(appActions.getTeam(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Team);