import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../services/team';
import './Team.css';
import Loader from '../../components/Loader/Loader';
import routes from '../../routes';

import { Table, Header } from 'semantic-ui-react';
import SkaterRow from '../../components/Common/SkaterRow';
import SkaterHeader from '../../components/Common/SkaterHeader';

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
                <Header as='h1'>{team.Name}</Header>
                <div className="roster">
                    <Header as='h4'>Goalies</Header>
                    <div className="roster-part">
                        <Table><Table.Header>
                            <Table.Row key={"goalies-header"}><Table.HeaderCell>Name</Table.HeaderCell><Table.HeaderCell>GP</Table.HeaderCell><Table.HeaderCell>GAA</Table.HeaderCell><Table.HeaderCell>SVS%</Table.HeaderCell><Table.HeaderCell>SV</Table.HeaderCell><Table.HeaderCell>TOI</Table.HeaderCell><Table.HeaderCell>W</Table.HeaderCell><Table.HeaderCell>L</Table.HeaderCell><Table.HeaderCell>OTL</Table.HeaderCell></Table.Row></Table.Header>
                            <Table.Body>
                                {team.Goalies.filter(function (goalie) {
                                    return filterActive || goalie.Games > 0
                                }).map((goalie) => {
                                    return (<Table.Row key={"g" + goalie.Name}><Table.Cell><Link to={routes.player + "/" + goalie.Id}>{goalie.Name}</Link></Table.Cell><Table.Cell>{goalie.Games}</Table.Cell><Table.Cell>{goalie.GlsAgainstAverage}</Table.Cell><Table.Cell>{goalie.SavePerc}</Table.Cell><Table.Cell>{goalie.Saves}</Table.Cell><Table.Cell>{goalie.Toi}</Table.Cell><Table.Cell>{goalie.Wins}</Table.Cell><Table.Cell>{goalie.Losses}</Table.Cell><Table.Cell>{goalie.Ot}</Table.Cell></Table.Row>)
                                })}
                            </Table.Body></Table>
                    </div>
                    <div className="roster-part">
                        <Header as='h4'>Defenders</Header>
                        <Table><Table.Header>
                            <SkaterHeader />
                        </Table.Header>
                            <Table.Body>
                                {team.Skaters.filter(function (player) {
                                    return (filterActive || player.Games > 0) && player.Position === "D"
                                }).map((skater) => {
                                    return (<SkaterRow player={skater} />)
                                })}
                            </Table.Body>
                        </Table>
                    </div>
                    <div className="roster-part">
                        <Header as='h4'>Forwards</Header>
                        <Table><Table.Header>
                            <SkaterHeader />
                        </Table.Header>
                            <Table.Body>
                                {team.Skaters.filter(function (player) {
                                    return (filterActive || player.Games > 0) && player.Position !== "D"
                                }).map((skater) => {
                                    return (<SkaterRow player={skater} />)
                                })}
                            </Table.Body></Table>
                    </div>
                </div>
            </div>);
    }
}

const mapStateToProps = state => ({
    team: state.team.team,
    teams: state.team.teams,
})

const mapDispatchToProps = dispatch => ({
    getTeam: (id) => dispatch(actions.getTeam(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Team);