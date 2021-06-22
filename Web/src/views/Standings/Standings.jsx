import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Label, Segment, Table } from 'semantic-ui-react';

import './Standings.scss';
import * as actions from '../../services/league';
import * as teamActions from '../../services/team';
import { Loader, Map } from '../../components';
import routes from '../../routes';
import { getLogo } from '../../util/assets';

class Standings extends Component {

  componentDidMount() {
    this.props.getStandings();
    this.props.getTeamLocations();
  }

  render() {
    const { locations, standings } = this.props;
    if (!standings) {
      return (<Loader text="Loading standings..."></Loader>);
    }
    return (
      <div>
        <Grid columns={2} stackable>
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
                          <Table.Cell className="bold">{record.divisionRank}</Table.Cell>
                          <Table.Cell>
                            <Link to={`${routes.teams}/${record.team.id}`}><img className="logo" src={getLogo(record.team.id)} alt={`img${record.team.Id}`}></img></Link>
                          </Table.Cell>
                          <Table.Cell className="standings-team-name">
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
                      );
                    })}
                  </Table.Body>
                </Table></Grid.Column>);
          })}
        </Grid>
        <Segment>
          {locations &&
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column>
                  <Map className="standingsMapControl" center={{ center: [-97.131087, 42.509726] }} points={locations.teamLocations} zoom={2.5} />
                </Grid.Column>
                <Grid.Column>
                  {locations.seasonDescription}
                  {locations.divisions.map((marker, index) => {
                    return (<div key={marker.key + index}><Label color={marker.value}>{marker.key}</Label></div>);
                  })}
                </Grid.Column>
              </Grid.Row>
            </Grid>}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  standings: state.league.standings,
  locations: state.team.locations,
});

const mapDispatchToProps = dispatch => ({
  getStandings: () => dispatch(actions.getStandings()),
  getTeamLocations: () => dispatch(teamActions.getTeamLocations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Standings);