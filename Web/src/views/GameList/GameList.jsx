import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Image, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { RadialChart, DiscreteColorLegend, FlexibleXYPlot, LineMarkSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';
import ColorScheme from 'color-scheme';

import routes from '../../routes';
import * as actions from '../../services/game';
import { getLogo } from '../../util/assets';
import { Loader } from '../../components';
import './GameList.scss';
import { GetCompetitionStageFullName, IsNullOrUndefined } from '../../util/common';

class GameList extends Component {
  constructor(props) {
    super(props);
    var scheme = new ColorScheme();
    scheme.from_hue(20).scheme('mono').variation('soft');
    this.state = {
      id: '0',
      home: 1,
      homeName: 'Home team',
      away: 2,
      awayName: 'Away team',
      scheme,
    };
    this.changeAway = this.changeAway.bind(this);
    this.changeHome = this.changeHome.bind(this);
    this.fetch = this.fetch.bind(this);
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
    const { awayName, homeName, scheme } = this.state;
    if (loading || loadingTeams) {
      return (<div><Loader></Loader></div>);
    }
    if (!IsNullOrUndefined(gamesBetweenTeams)) {
      var winsGraph = [{ 'label': homeName, 'angle': gamesBetweenTeams.score.homeWins }, { 'label': awayName, 'angle': gamesBetweenTeams.score.awayWins }];
    }
    console.log(gamesBetweenTeams);
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
          {gamesBetweenTeams && winsGraph &&
            <div style={{ display: 'flex' }}>
              <RadialChart
              animation
              labelsRadiusMultiplier={0.8}
              showLabels
              data={winsGraph}
              colorType={'category'}
              colorRange={scheme.colors().map((color) => {
                return `#${color}`;
              })}
              width={200}
              radius={90}
              height={200} />
<FlexibleXYPlot yDomain={[0, 8]} xDomain={[0, gamesBetweenTeams.games.length + 1]} height={200}>
            <DiscreteColorLegend
              style={{ position: 'relative', left: '50px', top: '-200px' }}
              orientation="horizontal"
              items={[
                {
                  title: homeName,
                  color: '#12939A'
                },
                {
                  title: awayName,
                  color: '#79C7E3'
                }
              ]}
            />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="X" tickValues={[0, 1, 2, 3, 4, 5, 6, 7]} tickFormat={v => (v > 0) ? `Game ${v}` : ''} />
            <YAxis />
            <LineMarkSeries
              style={{ fill: 'none' }}
              data={gamesBetweenTeams.score.homeGoals.map((el, index) => ({ 'x': index + 1, 'y': el }))}
            />
            <LineMarkSeries
              style={{ fill: 'none' }}
              data={gamesBetweenTeams.score.awayGoals.map((el, index) => ({ 'x': index + 1, 'y': el }))}
            />
          </FlexibleXYPlot>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(GameList);