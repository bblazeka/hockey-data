import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Grid, Header, Image, List, Segment, Statistic, Table } from 'semantic-ui-react';
import routes from '../../routes';
import { Link } from 'react-router-dom';

import * as actions from '../../services/league';

import { getLogo } from '../../util/assets';
import { Loader } from '../../components';
import { isNullOrUndefined, formatDecimals } from '../../util/common';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "0",
      home: 1,
      away: 2,
      filterActive: true,
    }
    this.changeAway = this.changeAway.bind(this);
    this.changeHome = this.changeHome.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { id } = props.match.params;
    if (!isNullOrUndefined(props.game) && props.game.id !== state.id) {
      props.history.push(`/game/${props.game.id}`);
      return {
        id: props.game.id
      }
    }
    if (isNullOrUndefined(props.game) && id !== 0) {
      props.getGame(id)
      return {
        id,
      }
    }
    return null
  }

  changeHome(event, data) {
    this.setState({
      home: data.value
    })
  }

  changeAway(event, data) {
    this.setState({
      away: data.value
    })
  }

  fetch() {
    this.props.findGame("2019-10-16", this.state.home, this.state.away)
  }

  TeamRender(team) {
    return (
      <Segment>
        <Header as='h2'><img className="mid-logo" src={getLogo(team.team.id)} alt={`img${team.team.id}${team.team.name}`} /> {team.team.name}</Header>
        <Header as="h3">Roster</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>G</Table.HeaderCell>
              <Table.HeaderCell>A</Table.HeaderCell>
              <Table.HeaderCell>PIM</Table.HeaderCell>
              <Table.HeaderCell>SOG</Table.HeaderCell>
              <Table.HeaderCell>HIT</Table.HeaderCell>
              <Table.HeaderCell>BLK</Table.HeaderCell>
              <Table.HeaderCell>FW</Table.HeaderCell>
              <Table.HeaderCell>FO</Table.HeaderCell>
              <Table.HeaderCell>PPG</Table.HeaderCell>
              <Table.HeaderCell>PPA</Table.HeaderCell>
              <Table.HeaderCell>SHG</Table.HeaderCell>
              <Table.HeaderCell>SHA</Table.HeaderCell>
              <Table.HeaderCell>TOI</Table.HeaderCell>
              <Table.HeaderCell>TOI-PP</Table.HeaderCell>
              <Table.HeaderCell>TOI-SH</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.values(team.players).filter((player) => { return player.position.code !== 'G' && !isNullOrUndefined(player.stats.skaterStats) }).map((player) => {
              return (<Table.Row key={player.person.fullName}>
                <Table.Cell><Link to={routes.player + "/" + player.person.id}><Header as="h4">{player.person.fullName}
                  <Header.Subheader>
                    {'#' + player.jerseyNumber + " " + player.position.name}
                  </Header.Subheader></Header></Link></Table.Cell>
                <Table.Cell>{player.stats.skaterStats.goals}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.assists}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.penaltyMinutes}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.shots}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.hits}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.blocked}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.faceOffWins}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.faceoffTaken}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.powerPlayGoals}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.powerPlayAssists}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.shortHandedGoals}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.shortHandedAssists}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.timeOnIce}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.powerPlayTimeOnIce}</Table.Cell>
                <Table.Cell>{player.stats.skaterStats.shortHandedTimeOnIce}</Table.Cell>
              </Table.Row>)
            })}
          </Table.Body>
        </Table>
        <Header as="h3">Goalies</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>SV</Table.HeaderCell>
              <Table.HeaderCell>SA</Table.HeaderCell>
              <Table.HeaderCell>SV%</Table.HeaderCell>
              <Table.HeaderCell>TOI</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.values(team.players).filter((player) => { return player.position.code === 'G' && !isNullOrUndefined(player.stats) })
              .map((player) => {
                return (<Table.Row key={player.person.fullName}>
                  <Table.Cell><Link to={routes.player + "/" + player.person.id}><Header as="h4">{player.person.fullName}
                    <Header.Subheader>
                      {`#${player.jerseyNumber} ${player.position.name}`}
                    </Header.Subheader></Header></Link></Table.Cell>
                  <Table.Cell>{player.stats.goalieStats.saves}</Table.Cell>
                  <Table.Cell>{player.stats.goalieStats.shots}</Table.Cell>
                  <Table.Cell>{formatDecimals(player.stats.goalieStats.savePercentage, 2)}</Table.Cell>
                  <Table.Cell>{player.stats.goalieStats.timeOnIce}</Table.Cell>
                </Table.Row>)
              })}
          </Table.Body>
        </Table>
        <Header as="h3">Staff</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Position</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Object.values(team.coaches).map((coach) => {
              return (<Table.Row key={coach.person.fullName}>
                <Table.Cell>{coach.person.fullName}</Table.Cell>
                <Table.Cell>{coach.position.name}</Table.Cell>
              </Table.Row>)
            })}
          </Table.Body>
        </Table>
      </Segment>

    )
  }

  render() {
    const { game, dropdownTeams } = this.props;
    if (!dropdownTeams) {
      return (<Loader></Loader>);
    }
    return (
      <div>
        <Segment>
          <Dropdown
            onChange={this.changeHome}
            options={dropdownTeams.map(el => { return { "key": el.id, "text": el.name, "value": el.id, "logo": { "avatar": true, "logo": getLogo(el.id) } } })
            } />
          <Dropdown
            onChange={this.changeAway}
            options={dropdownTeams.map(el => { return { "key": el.id, "text": el.name, "value": el.id, "logo": { "avatar": true, "logo": getLogo(el.id) } } })
            } />
          <Button onClick={this.fetch}>OK</Button>
        </Segment>
        {game && <Segment>
          <Grid>
            <Grid.Column floated='left' width={5}>
              {game.teams.home.team.name}
              <Statistic>
                <Statistic.Value>{`${game.linescore.teams.home.goals}:${game.linescore.teams.away.goals}`}</Statistic.Value>
                <Statistic.Label>{game.linescore.currentPeriodTimeRemaining}</Statistic.Label>
              </Statistic>
              {game.teams.away.team.name}
              {game.linescore.teams.home.shotsOnGoal} SOG {game.linescore.teams.away.shotsOnGoal}
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <List horizontal>
                <List.Item>
                  <Image avatar src={getLogo(game.teams.home.team.id)} />
                  <List.Content>
                    <List.Header>G</List.Header>
                    SOG
                  </List.Content>
                </List.Item>
                {game.linescore.periods && game.linescore.periods.map(period => {
                  return (<List.Item key={`${period.ordinalNum}${period.home}`}><List.Content><List.Header>{period.home.goals}</List.Header>{period.home.shotsOnGoal}</List.Content>
                  </List.Item>);
                })}
              </List>
              <br />
              <List horizontal>
                <List.Item>
                  <Image avatar src={getLogo(game.teams.away.team.id)} />
                  <List.Content>
                    <List.Header>G</List.Header>
                    SOG
                  </List.Content>
                </List.Item>
                {game.linescore.periods && game.linescore.periods.map(period => {
                  return (<List.Item key={`${period.ordinalNum}${period.away}`}><List.Content><List.Header>{period.away.goals}</List.Header>{period.away.shotsOnGoal}</List.Content>
                  </List.Item>);
                })}
              </List>
            </Grid.Column>
          </Grid>

        </Segment>}
        {game && <Segment.Group horizontal>
          {this.TeamRender(game.teams.home)}
          {this.TeamRender(game.teams.away)}
        </Segment.Group>}
        {game && <Segment>
          {game.officials && game.officials.map(official => {
            return (<div key={official.official.id}>{official.official.fullName} {official.officialType}</div>);
          })}
        </Segment>}
      </div>);
  }
}

const mapStateToProps = state => ({
  game: state.league.game,
  dropdownTeams: state.team.dropdownTeams,
})

const mapDispatchToProps = dispatch => ({
  findGame: (date, home, away) => dispatch(actions.findGame(date, home, away)),
  getGame: (id) => dispatch(actions.getGame(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);