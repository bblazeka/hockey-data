import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import routes from '../../routes';
import * as actions from '../../services/league';
import { getLogo } from '../../util/assets';
import { Loader } from '../../components';
import './GameList.scss';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '0',
      home: 1,
      away: 2
    };
    this.changeAway = this.changeAway.bind(this);
    this.changeHome = this.changeHome.bind(this);
    this.fetch = this.fetch.bind(this);
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

  fetch() {
    this.props.findGames(this.state.home, this.state.away);
  }


  render() {
    const { games, dropdownTeams } = this.props;
    if (!dropdownTeams) {
      return (<Loader></Loader>);
    }
    return (
      <div>
        <Segment>
          <Dropdown
            placeholder='Home team'
            onChange={this.changeHome}
            options={dropdownTeams.map(el => { return { 'key': el.id, 'text': el.name, 'value': el.id, 'logo': { 'avatar': true, 'logo': getLogo(el.id) } }; })
            } />
          <Dropdown
            placeholder='Away team'
            onChange={this.changeAway}
            options={dropdownTeams.map(el => { return { 'key': el.id, 'text': el.name, 'value': el.id, 'logo': { 'avatar': true, 'logo': getLogo(el.id) } }; })
            } />
          <Button onClick={this.fetch}>OK</Button>
        </Segment>
        <Segment>
          <List>
            {games && games.map(game => {
              return (
                <List.Item key={game.gamePk}>
                  <List.Content floated='right'>
                    <Link to={`${routes.game}/${game.gamePk}`}><Button>Open</Button></Link>
                  </List.Content>
                  <List.Content>{dayjs(game.gameDate).toString()} {game.home.team.name} {game.home.score}:{game.away.score} {game.away.team.name}</List.Content>
                  
                </List.Item>);
            })}
          </List>
        </Segment>
      </div>);
  }
}

const mapStateToProps = state => ({
  games: state.league.games,
  dropdownTeams: state.team.dropdownTeams,
});

const mapDispatchToProps = dispatch => ({
  findGames: (home, away) => dispatch(actions.findGames(home, away)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameList);