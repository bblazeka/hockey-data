import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flag, Grid, Header, Image, List, Search, Segment, Tab } from 'semantic-ui-react';

import * as actions from '../../services/player';
import './Player.css';
import Loader from '../../components/Loader/Loader';

import routes from '../../routes';
import { SocialFeed, StatsGrid } from '../../components';
import { generateSemanticUICountryId, isNullOrUndefined } from  '../../util/common';
import { getLogo } from '../../util/assets';
import { getTweets } from '../../services/news';

const initialState = { isLoading: false, results: [], value: '', playerQuery: '' }

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
  }

  static getDerivedStateFromProps(props, state) {
    const { id } = props.match.params;
    const { player, tweets, loadingTweets } = props;
    if (state.id !== id) {
      props.getPlayer(id);
      return {
        id,
      }
    }
    if ((player !== null && state.playerQuery !== player.fullName) || (!loadingTweets && isNullOrUndefined(tweets)))
    {
      props.getTweets(player.fullName);
      return {
        playerQuery: player.fullName,
      }
    }
    return null
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    if (this.state.value.length < 1 && value.length < 1) {
      return this.setState(initialState);
    }

    if (value.length > 2) {
      this.props.searchBasicPlayer(value);
      this.setState({ isLoading: false, value });
    }
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    this.props.searchPlayer(result.title);
  }

  render() {
    const { isLoading, value } = this.state;
    const { player, suggestions, tweets } = this.props;
    if (!player) {
      return (<div><Loader></Loader></div>)
    }
    const panes = [
      { menuItem: 'NHL stats', render: () => <Tab.Pane>
      <StatsGrid stats={player.nhlstats} skater={player.primaryPosition.code !== "G"} detailed={true}></StatsGrid></Tab.Pane> },
      { menuItem: 'Career stats', render: () => <Tab.Pane>
      <StatsGrid stats={player.careerstats} skater={player.primaryPosition.code !== "G"} detailed={false}></StatsGrid></Tab.Pane> },
    ]
    return (
      <div>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={suggestions}
          value={value}
        />
        <Segment textAlign='center'>
          <Grid columns='equal'>
            <Grid.Column key="colLogo">
              <Image src={getLogo(player.currentTeam.id)} size="small"></Image>
            </Grid.Column>
            <Grid.Column key="colName" floated="left">
              <Header as="h2">{player.fullName}
                <Header.Subheader>
                  <Flag name={generateSemanticUICountryId(player.nationality)} /> {player.nationality}
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column key="colInfo" floated="right" width={8}>
              <List horizontal className="info-list">
                <List.Item>
                  <List.Icon name='user' />
                  <List.Header>Position</List.Header>
                  <List.Content>{player.primaryPosition.name}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='users' />
                  <List.Header>Team</List.Header>
                  <Link to={routes.teams + "/" + player.currentTeam.id}>{player.currentTeam.name}</Link>
                </List.Item>
                <List.Item>
                  <List.Icon name='birthday cake' />
                  <List.Header>Birthdate</List.Header>
                  <List.Content>{player.birthDate}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='marker' />
                  <List.Header>Birthplace</List.Header>
                  <List.Content>{player.birthCity}</List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid>
        </Segment>
        <Tab panes={panes} />
        <SocialFeed tweets={tweets}></SocialFeed>
      </div>);
  }
}

const mapStateToProps = state => ({
  player: state.player.player,
  suggestions: state.player.suggestions,
  tweets: state.news.tweets,
  loadingTweets: state.news.loadingTweets,
})

const mapDispatchToProps = dispatch => ({
  getPlayer: (id) => dispatch(actions.getPlayer(id)),
  searchBasicPlayer: (name) => dispatch(actions.searchBasicPlayer(name)),
  searchPlayer: (name) => dispatch(actions.searchPlayer(name, true)),
  getTweets: (query) => dispatch(getTweets(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);