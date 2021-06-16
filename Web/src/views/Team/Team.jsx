import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Grid, Header, Segment, Tab } from 'semantic-ui-react';

import './Team.scss';
import * as actions from '../../services/team';
import { Loader, Map, NewsFeed, RosterGrid, RosterStatsGrid, SocialFeed } from '../../components';
import { getLogo } from '../../util/assets';
import { getNews, getTweets } from '../../services/news';
import { geocode } from '../../services/util';
import { getTeamSchedule } from '../../services/league';
import { DateToServerFormat } from '../../util/common';
import TeamSchedule from '../../components/TeamSchedule/TeamSchedule';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '0',
      teamQuery: '',
      filterActive: true,
    };
    this.checkedChanged = this.checkedChanged.bind(this);
  }

  checkedChanged(e, { checked }) {
    this.setState({ filterActive: checked });
  }

  static getDerivedStateFromProps(props, state) {
    const { id } = props.match.params;
    const { team } = props;
    if (state.id !== id) {
      props.getTeam(id);
      return {
        id,
      };
    }
    if (team !== null && state.teamQuery !== team.name) {
      props.geocode(`${team.venue.name} ${team.venue.city}`);
      props.getNews(team.name);
      props.getTweets(team.name);
      var today = new Date();
      var finish = new Date(today);
      finish.setDate(finish.getDate() + 14);
      var start = DateToServerFormat(today);
      var end = DateToServerFormat(finish);
      props.getTeamSchedule(team.id, start, end);
      return {
        teamQuery: team.name,
      };
    }
    return null;
  }

  render() {
    const { teamGames, team, tweets, news, location } = this.props;
    const { filterActive } = this.state;
    if (!team) {
      return (<div><Loader></Loader></div>);
    }
    const panes = [
      {
        menuItem: 'Roster', render: () => <Tab.Pane>
          <RosterGrid team={team} filterPlayers={filterActive} /></Tab.Pane>
      },
      {
        menuItem: 'Stats', render: () => <Tab.Pane>
          <RosterStatsGrid rosterStats={team.skaterStats} title="Skaters" />
          <RosterStatsGrid rosterStats={team.goalieStats} title="Goalies" />
        </Tab.Pane>
      },
    ];
    return (
      <div>
        <Header as='h1' className="team-header"><img className="mid-logo" src={getLogo(team.id)} alt={`img${team.id}${team.name}`} />{team.name}</Header>
        <p className="desc">{team.description}</p>
        <Tab
          panes={panes}
        />
        <Segment>
          <Checkbox checked={filterActive} label='Show active players only' onChange={this.checkedChanged} />
        </Segment>
        <TeamSchedule games={teamGames} />
        <Grid columns={2}><Grid.Row>
          <Grid.Column><NewsFeed news={news}></NewsFeed></Grid.Column>
          <Grid.Column><SocialFeed tweets={tweets}></SocialFeed></Grid.Column>
        </Grid.Row></Grid>
        {location &&
          <Segment className="mapComponent">
            <Map className="mapControl" points={[location]} center={location} zoom={8} />
            <div className="location-text">
              <Header as='h4'>{team.venue.name}
                <Header.Subheader>{team.venue.city}</Header.Subheader>
              </Header>
              <p>{team.venue.description}</p>
            </div>
          </Segment>}
      </div>);
  }
}

const mapStateToProps = state => ({
  team: state.team.team,
  tweets: state.news.tweets,
  teams: state.team.teams,
  news: state.news.news,
  teamGames: state.league.teamGames,
  location: state.util.location
});

const mapDispatchToProps = dispatch => ({
  getTeam: (id) => dispatch(actions.getTeam(id)),
  geocode: (query) => dispatch(geocode(query)),
  getTweets: (query) => dispatch(getTweets(query)),
  getNews: (query) => dispatch(getNews(query)),
  getTeamSchedule: (id, start, end) => dispatch(getTeamSchedule(id, start, end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Team);