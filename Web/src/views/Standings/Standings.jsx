import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../services/league';
import * as teamActions from '../../services/team';
import './Standings.css';
import {Loader, Map} from '../../components';
import routes from '../../routes';
import { getLogo } from '../../util/assets';

import { Grid, Header, Segment, Table } from 'semantic-ui-react';

class Standings extends Component {
  constructor(props) {
    super(props)
    this.props.getStandings()
    this.props.getTeamLocations()
  }

  render() {
    const { locations, standings } = this.props;
    if (!standings) {
      return (<div><Loader></Loader></div>)
    }
    return (
      <div>
        <Grid columns={2}>
        {standings && standings.map((entry) => {
          return (
            <Grid.Column className="standings" key={entry.division.id}>
              <Header as='h3'>{entry.division.name}</Header>
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
                      <Table.Row key={`row${record.team.id}`}>
                        <Table.Cell>{record.divisionRank}</Table.Cell>
                        <Table.Cell>
                          <Link to={`${routes.teams}/${record.team.id}`}><img className="logo" src={getLogo(record.team.id)} alt={`img${record.team.Id}`}></img></Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={`${routes.teams}/${record.team.id}`}>{record.team.name}</Link>
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
              </Table></Grid.Column>)
        })}
        </Grid>
        <Segment>
          {locations && <Map className="mapControl" center={{center: [-102.131087,39.509726]}} points={locations} zoom={3} />}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  standings: state.league.standings,
  locations: state.team.locations,
})

const mapDispatchToProps = dispatch => ({
  getStandings: () => dispatch(actions.getStandings()),
  getTeamLocations: () => dispatch(teamActions.getTeamLocations()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Standings);