import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Image, List, Progress, Segment, Statistic } from 'semantic-ui-react';
import dayjs from 'dayjs';

import * as actions from '../../services/game';
import { getLogo } from '../../util/assets';
import { GameTeamStats, Loader } from '../../components';
import { DateToServerFormat, GetCompetitionStageFullName } from '../../util/common';
import './Game.scss';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '0',
      home: 1,
      away: 2,
      filterActive: true,
    };
    this.changeAway = this.changeAway.bind(this);
    this.changeHome = this.changeHome.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { id } = props.match.params;
    if (id !== state.id) {
      props.getGame(id);
      return {
        id,
      };
    }
    return null;
  }

  changeHome(event, data) {
    this.setState({
      home: data.value
    });
  }

  changeAway(event, data) {
    this.setState({
      away: data.value
    });
  }

  render() {
    const { game, loading } = this.props;
    if (loading) {
      return (<Loader></Loader>);
    }
    return (
      <div>
        {game && <Segment>
          <Grid stackable>
            <Grid.Column floated='left' width={6}>
              <Statistic.Group>
                <Statistic>
                  <Statistic.Value>
                    <Image avatar className="main-img" src={getLogo(game.teams.home.team.id)} />
                  </Statistic.Value>
                  <Statistic.Label>{game.teams.home.team.name}</Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Value>
                    {`${game.linescore.teams.home.goals}:${game.linescore.teams.away.goals}`}
                  </Statistic.Value>
                  <Statistic.Label>
                    {game.linescore.teams.home.shotsOnGoal} SOG {game.linescore.teams.away.shotsOnGoal}
                  </Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Value>
                    <Image avatar className="main-img" src={getLogo(game.teams.away.team.id)} />
                  </Statistic.Value>
                  <Statistic.Label>{game.teams.away.team.name}</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
            <Grid.Column floated='right' width={3}>
              <List>
                <List.Item>
                  <List.Icon name='trophy' />
                  <List.Content>{GetCompetitionStageFullName(game.gameType)} {game.season}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='calendar outline' />
                  <List.Content>{dayjs(DateToServerFormat(game.gameDate)).format('DD.MM.YYYY')}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='clock outline' />
                  <List.Content>{dayjs(game.gameDate).format('HH:mm')}</List.Content>
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
                  <Image verticalAlign="bottom" avatar src={getLogo(game.teams.home.team.id)} />
                </List.Item>
                <List.Item>
                  <List.Content verticalAlign='top'>
                    <List.Header>G</List.Header>
                    SOG
                  </List.Content>
                </List.Item>
                {game.linescore.periods && game.linescore.periods.map(period => {
                  return (<List.Item key={`${period.num}${period.home}`}>
                    <List.Content verticalAlign='bottom'>
                      <List.Header>{period.home.goals}</List.Header>{period.home.shotsOnGoal}
                    </List.Content>
                  </List.Item>);
                })}
              </List>
              <br />
              <List horizontal>
                <List.Item>
                  <Image verticalAlign="bottom" avatar src={getLogo(game.teams.away.team.id)} />
                </List.Item>
                <List.Item>
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
          <Progress className="game-progress" color='blue' percent={game.percentage}>{game.linescore.currentPeriodOrdinal} {game.linescore.currentPeriodTimeRemaining}</Progress>
        </Segment>}
        {game && <div>
          <GameTeamStats team={game.teams.home} />
          <GameTeamStats team={game.teams.away} />
        </div>}
        {game && <Segment>
          <List horizontal>
            <List.Item>
              <Header as='h5'>Game officials:</Header>
            </List.Item>
            {game.officials && game.officials.map((official, index) => {
              return (<List.Item key={official.official.id + '' + index}>
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
  game: state.game.game,
  loading: state.game.loading,
  dropdownTeams: state.team.dropdownTeams,
});

const mapDispatchToProps = dispatch => ({
  getGame: (id) => dispatch(actions.getGame(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);