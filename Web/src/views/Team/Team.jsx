import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../services/team';
import './Team.scss';
import Loader from '../../components/Loader/Loader';
import { Map, NewsFeed, RosterGrid, SocialFeed } from '../../components';
import { getLogo } from '../../util/assets';

import { Checkbox, Header, Segment } from 'semantic-ui-react';
import { getNews, getTweets } from '../../services/news';
import { geocode } from '../../services/util';

class Team extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "0",
      teamQuery: "",
      filterActive: false,
    }
    this.checkedChanged = this.checkedChanged.bind(this);
  }
  
  checkedChanged(e, { checked }) {
    this.setState({ filterActive: checked});
  }

  static getDerivedStateFromProps(props, state) {
    const { id } = props.match.params;
    const { team } = props;
    if (state.id !== id) {
      props.getTeam(id);
      return {
        id,
      }
    }
    if (team !== null && state.teamQuery !== team.name) {
      props.geocode(`${team.venue.name} ${team.venue.city}`)
      props.getNews(team.name);
      props.getTweets(team.name);
      return {
        teamQuery: team.name,
      }
    }
    return null
  }

  render() {
    const { team, tweets, news, location } = this.props;
    const { filterActive } = this.state;
    if (!team) {
      return (<div><Loader></Loader></div>)
    }
    return (
      <div>
        <Header as='h1'><img className="mid-logo" src={getLogo(team.id)} alt={`img${team.id}${team.name}`} />{team.name}</Header>
        <Checkbox label='Show active players only' onChange={this.checkedChanged} />
        <RosterGrid team={team} filterPlayers={filterActive} />
        <NewsFeed news={news}></NewsFeed>
        <SocialFeed tweets={tweets}></SocialFeed>
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
        <Segment>{team.description}</Segment>
      </div>);
  }
}

const mapStateToProps = state => ({
  team: state.team.team,
  tweets: state.news.tweets,
  teams: state.team.teams,
  news: state.news.news,
  location: state.util.location
})

const mapDispatchToProps = dispatch => ({
  getTeam: (id) => dispatch(actions.getTeam(id)),
  geocode: (query) => dispatch(geocode(query)),
  getTweets: (query) => dispatch(getTweets(query)),
  getNews: (query) => dispatch(getNews(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Team);