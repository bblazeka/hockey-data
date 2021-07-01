import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Image, List, Segment, Statistic } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import routes from '../../routes';
import * as actions from '../../services/game';
import * as teamActions from '../../services/team';
import { getLogo } from '../../util/assets';
import { Loader } from '../../components';
import './GameList.scss';
import { GetCompetitionStageFullName, IsNullOrUndefined } from '../../util/common';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '0',
      home: 1,
      homeName: 'Home team',
      away: 2,
      awayName: 'Away team',
    };
    this.changeAway = this.changeAway.bind(this);
    this.changeHome = this.changeHome.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.props.getDropdownTeams();
  }

  changeHome(event, data) {
    this.setState({
      home: data.value,
      homeName: event.target.textContent,
    });
  }

  changeAway(event, data) {
    this.setState({
      away: data.value,
      awayName: event.target.textContent,
    });
  }

  fetch() {
    this.props.findGames(this.state.home, this.state.away);
  }


  render() {
    const { gamesBetweenTeams, dropdownTeams, loading, loadingTeams } = this.props;
    if (loading || loadingTeams || IsNullOrUndefined(dropdownTeams)) {
      return (<div><Loader></Loader></div>);
    }
    const homeTeam = (!IsNullOrUndefined(gamesBetweenTeams) && gamesBetweenTeams.games.length > 0) ? gamesBetweenTeams.games[0].home.team.name : 'Home team';
    const awayTeam = (!IsNullOrUndefined(gamesBetweenTeams) && gamesBetweenTeams.games.length > 0) ? gamesBetweenTeams.games[0].away.team.name : 'Away team';
    return (
      <div>
        <Segment className='game-list-filter'>
          <Dropdown
            placeholder='Home team'
            onChange={this.changeHome}
            options={dropdownTeams.map(el => { return { 'key': el.id, 'text': el.name, 'value': el.id, 'image': { 'avatar': true, 'src': getLogo(el.id) } }; })
            } />
          <Dropdown
            placeholder='Away team'
            onChange={this.changeAway}
            options={dropdownTeams.map(el => { return { 'key': el.id, 'text': el.name, 'value': el.id, 'image': { 'avatar': true, 'src': getLogo(el.id) } }; })
            } />
          <Button onClick={this.fetch}>Search</Button>
        </Segment>
        <Segment>
          {gamesBetweenTeams &&
            <div style={{ display: 'flex' }}>
              <Statistic.Group horizontal>
                <Statistic>
                  <Statistic.Value>{gamesBetweenTeams.score.homeWins}</Statistic.Value>
                  <Statistic.Label>{`${homeTeam} wins`}</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{gamesBetweenTeams.score.awayWins}</Statistic.Value>
                  <Statistic.Label>{`${awayTeam} wins`}</Statistic.Label>
                </Statistic>
              </Statistic.Group>
              <div style={{ height: '13em', width: '180em' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={gamesBetweenTeams.score.gameScores}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="homeGoals" name={homeTeam} fill="#8884d8" />
                    <Bar dataKey="awayGoals" name={awayTeam} fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          }
          <List>
            {gamesBetweenTeams && gamesBetweenTeams.games.map(game => {
              return (
                <List.Item key={game.gamePk}>
                  <List.Content floated='right'>
                    <Link to={`${routes.game}/${game.gamePk}`}><Button>Open</Button></Link>
                  </List.Content>
                  <List.Content>
                    <List horizontal>
                      <List.Item>
                        <Image className="tiny-logo" src='/favicon.ico' />
                        <List.Content>
                          <List.Header>{game.season}</List.Header>
                          {GetCompetitionStageFullName(game.gameType)}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <Image avatar src={getLogo(game.home.team.id)} />
                        <List.Content>
                          <List.Header>{game.home.team.name}</List.Header>
                          {game.home.leagueRecord.wins}-{game.home.leagueRecord.losses}-{game.home.leagueRecord.ot}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        {game.home.score}:{game.away.score}
                      </List.Item>
                      <List.Item>
                        <Image avatar src={getLogo(game.away.team.id)} />
                        <List.Content>
                          <List.Header>{game.away.team.name}</List.Header>
                          {game.away.leagueRecord.wins}-{game.away.leagueRecord.losses}-{game.away.leagueRecord.ot}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        {dayjs(game.gameDate).toString()}
                      </List.Item>
                    </List>
                  </List.Content>
                </List.Item>);
            })}
          </List>
        </Segment>
      </div>);
  }
}

const mapStateToProps = state => ({
  gamesBetweenTeams: state.game.gamesBetweenTeams,
  dropdownTeams: state.team.dropdownTeams,
  loading: state.game.loading,
  loadingTeams: state.team.loading
});

const mapDispatchToProps = dispatch => ({
  findGames: (home, away) => dispatch(actions.findGames(home, away)),
  getDropdownTeams: () => dispatch(teamActions.getDropdownTeams())
});

export default connect(mapStateToProps, mapDispatchToProps)(GameList);