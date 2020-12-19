import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../services/team';
import './Team.css';
import Loader from '../../components/Loader/Loader';
import { SocialFeed } from '../../components';
import { RosterGrid } from '../../components';
import { getLogo } from '../../util/assets';

import { Header } from 'semantic-ui-react';
import { getTweets } from '../../services/news';

class Team extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: "0",
      teamQuery: "",
      filterActive: true,
    }
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
    if (team !== null && state.teamQuery !== team.name)
    {
      props.getTweets(team.name);
      return {
        teamQuery: team.name,
      }
    }
    return null
  }

  render() {
    const { team, tweets } = this.props;
    if (!team) {
      return (<div><Loader></Loader></div>)
    }
    return (
      <div>
        <Header as='h1'><img className="mid-logo" src={getLogo(team.id)} alt={`img${team.id}${team.name}`}></img>{team.name}</Header>
        <RosterGrid team={team} />
        <SocialFeed tweets={tweets}></SocialFeed>
      </div>);
  }
}

const mapStateToProps = state => ({
  team: state.team.team,
  tweets: state.news.tweets,
  teams: state.team.teams,
})

const mapDispatchToProps = dispatch => ({
  getTeam: (id) => dispatch(actions.getTeam(id)),
  getTweets: (query) => dispatch(getTweets(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Team);