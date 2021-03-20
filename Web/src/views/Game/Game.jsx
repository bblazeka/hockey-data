import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Image, List, Progress, Segment, Statistic, Table } from 'semantic-ui-react';
import routes from '../../routes';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import * as actions from '../../services/league';

import { getLogo } from '../../util/assets';
import { Loader } from '../../components';
import { formatDecimals } from '../../util/common';
import { DateToServerFormat } from 'common';
import './Game.scss';

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
  }

  static getDerivedStateFromProps(props, state) {
    const { id } = props.match.params;
    if (id !== state.id) {
      props.getGame(id);
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

  TeamRender(team) {
    return (
      <Segment className="teamSegment">
        <Header as='h2'><img className="mid-logo" src={getLogo(team.team.id)} alt={`img${team.team.id}${team.team.name}`} /> {team.team.name}</Header>
        <Header as="h3">Roster</Header>
        <div className="teamTable">
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
              {team.skaters.map((player) => {
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
        </div>
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
            {team.goalies.map((player) => {
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
        {game && <Segment>
          <Grid>
            <Grid.Column floated='left' width={6}>
              <Statistic.Group>
                <Statistic>
                  <Statistic.Value>
                    <Image avatar className="mainImg" src={getLogo(game.teams.home.team.id)} />
                  </Statistic.Value>
                  <Statistic.Label>{game.teams.home.team.name}</Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Value>
                    {`${game.linescore.teams.home.goals}:${game.linescore.teams.away.goals}`}
                  </Statistic.Value>
                  <Statistic.Label>
                    {game.linescore.currentPeriodTimeRemaining}<br />
                    {game.linescore.teams.home.shotsOnGoal} SOG {game.linescore.teams.away.shotsOnGoal}

                  </Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Value>
                    <Image avatar className="mainImg" src={getLogo(game.teams.away.team.id)} />
                  </Statistic.Value>
                  <Statistic.Label>{game.teams.away.team.name}</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
            <Grid.Column floated='right' width={1}>
              <List>
                <List.Item>
                  <List.Icon name='trophy' />
                  <List.Content>{game.season}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='calendar outline' />
                  <List.Content>{DateToServerFormat(game.gameDate)}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='clock outline' />
                  <List.Content>{dayjs(game.gameDate).format("HH:mm")}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='marker' />
                  <List.Content>{game.venue.name}</List.Content>
                </List.Item>
              </List>

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
                  return (<List.Item key={`${period.num}${period.home}`}><List.Content><List.Header>{period.home.goals}</List.Header>{period.home.shotsOnGoal}</List.Content>
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
                  return (<List.Item key={`${period.num}${period.away}`}><List.Content><List.Header>{period.away.goals}</List.Header>{period.away.shotsOnGoal}</List.Content>
                  </List.Item>);
                })}
              </List>
            </Grid.Column>
          </Grid>
          <Progress percent={game.percentage} />
        </Segment>}
        {game && <Grid columns={2}>
          <Grid.Column>
            {this.TeamRender(game.teams.home)}
          </Grid.Column>
          <Grid.Column>
            {this.TeamRender(game.teams.away)}
          </Grid.Column>
        </Grid>}
        {game && <Segment>
          <List horizontal>
            {game.officials && game.officials.map(official => {
              return (<List.Item key={official.official.id}>
                <List.Icon name='user' />
                <List.Content>
                  <List.Header>{official.official.fullName}</List.Header>
                  {official.officialType}
                </List.Content>
              </List.Item>);
            })}
          </List>
        </Segment>}
      </div>);
  }
}

const mapStateToProps = state => ({
  game: state.league.game,
  dropdownTeams: state.team.dropdownTeams,
})

const mapDispatchToProps = dispatch => ({
  getGame: (id) => dispatch(actions.getGame(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);