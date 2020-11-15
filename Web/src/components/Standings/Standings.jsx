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

  render() {
    const { standings } = this.props;
    if (!standings) {
      return (<div><Loader></Loader></div>)
    }
    return (
      <div>
        {standings && standings.map((entry) => {
          return (
            <div className="standings" id={entry.division.name}>
              <label>{entry.division.name}</label>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Rank</Table.HeaderCell>
                    <Table.HeaderCell>Logo</Table.HeaderCell>
                    <Table.HeaderCell>Team</Table.HeaderCell>
                    <Table.HeaderCell>GP</Table.HeaderCell>
                    <Table.HeaderCell>W</Table.HeaderCell>
                    <Table.HeaderCell>L</Table.HeaderCell>
                    <Table.HeaderCell>OT</Table.HeaderCell>
                    <Table.HeaderCell>GS</Table.HeaderCell>
                    <Table.HeaderCell>GA</Table.HeaderCell>
                    <Table.HeaderCell>PTS</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {entry.teamRecords.map((record) => {
                    return (
                      <Table.Row>
                        <Table.Cell>{record.divisionRank}</Table.Cell>
                        <Table.Cell>
                          <Link to={routes.teams + "/" + record.team.id}><img className="logo" src={record.logo} alt={"img" + record.team.Id}></img></Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={routes.teams + "/" + record.team.id}>{record.team.name}</Link>
                        </Table.Cell>
                        <Table.Cell>{record.gamesPlayed}</Table.Cell>
                        <Table.Cell>{record.leagueRecord.wins}</Table.Cell>
                        <Table.Cell>{record.leagueRecord.losses}</Table.Cell>
                        <Table.Cell>{record.leagueRecord.ot}</Table.Cell>
                        <Table.Cell>{record.goalsScored}</Table.Cell>
                        <Table.Cell>{record.goalsAgainst}</Table.Cell>
                        <Table.Cell>{record.points}</Table.Cell>
                      </Table.Row>
                    )
                  })}
                </Table.Body>
              </Table></div>)
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  standings: state.app.standings,
})

const mapDispatchToProps = dispatch => ({
  getStandings: () => dispatch(appActions.getStandings())
})

export default connect(mapStateToProps, mapDispatchToProps)(Standings);