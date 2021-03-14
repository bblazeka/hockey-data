import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flag, Grid, Header, Image, List, Search, Segment, Tab } from 'semantic-ui-react';
import { IsNullOrUndefined } from 'common';

import * as actions from '../../services/player';
import './Player.scss';

import routes from '../../routes';
import { Loader, NewsFeed, SocialFeed, StatsGrid } from '../../components';
import { generateSemanticUICountryId } from  '../../util/common';
import { getLogo } from '../../util/assets';
import { getTweets, getNews } from '../../services/news';

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
    if ((player !== null && state.playerQuery !== player.fullName) || (!loadingTweets && IsNullOrUndefined(tweets)))
    {
      props.getTweets(player.fullName);
      props.getNews(player.fullName);
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
    }
    else
    {
      this.setState({ isLoading: false });
    }
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: '', isLoading: false });
    this.props.getPlayer(result.id);
  }

  render() {
    const { isLoading, value } = this.state;
    const { player, suggestions, tweets, news } = this.props;
    if (!player) {
      return (<div><Loader></Loader></div>)
    }
    const panes = [
      { menuItem: 'NHL stats', render: () => <Tab.Pane>
      <StatsGrid data={player.nhlStats} skater={player.primaryPosition.code !== "G"} detailed={true}></StatsGrid></Tab.Pane> },
      { menuItem: 'Career stats', render: () => <Tab.Pane>
      <StatsGrid data={player.careerStats} skater={player.primaryPosition.code !== "G"} detailed={false}></StatsGrid></Tab.Pane> },
    ]
    return (
      <div>
        <Search
          className="search-box"
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={suggestions}
          value={value}
        />
        <Segment textAlign='center'>
          <Grid columns='equal'>
          <Grid.Column width={3}>
              <Image src={getLogo(player.currentTeam.id)} size='medium'></Image>
            </Grid.Column>
            <Grid.Column width={12}>
            <Grid columns='equal'>
            <Grid.Row>
            <Grid.Column floated="left">
              <Header as="h2">{player.fullName}
                <Header.Subheader>
                  <Flag name={generateSemanticUICountryId(player.nationality)} /> {player.nationality}
                </Header.Subheader>
              </Header>
            </Grid.Column>
            <Grid.Column key="colInfo" floated="right" width={8}>
              <List horizontal className="info-list">
                <List.Item>
                  <List.Icon name='map marker' />
                  <List.Header>Position</List.Header>
                  <List.Content>{player.primaryPosition.name}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='users' />
                  <List.Header>Team</List.Header>
                  <Link to={routes.teams + "/" + player.currentTeam.id}>{player.currentTeam.name}</Link>
                </List.Item>                
                <List.Item>
                  <List.Icon name='user' />
                  <List.Header>Age</List.Header>
                  <List.Content>{player.currentAge}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='birthday cake' />
                  <List.Header>Birthdate</List.Header>
                  <List.Content>{player.birthDate}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='map pin' />
                  <List.Header>Birthplace</List.Header>
                  <List.Content>{player.birthCity}</List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column className="player-desc">
                {player.description}
              </Grid.Column>
            </Grid.Row>
            </Grid>
            </Grid.Column>
          </Grid>
        </Segment>
        <Tab panes={panes} />
        <Grid columns={2}><Grid.Row>
          <Grid.Column><NewsFeed news={news}></NewsFeed></Grid.Column>
          <Grid.Column><SocialFeed tweets={tweets}></SocialFeed></Grid.Column>
        </Grid.Row></Grid>
      </div>);
  }
}

const mapStateToProps = state => ({
  player: state.player.player,
  suggestions: state.player.suggestions,
  tweets: state.news.tweets,
  news: state.news.news,
  loadingTweets: state.news.loadingTweets,
})

const mapDispatchToProps = dispatch => ({
  getPlayer: (id) => dispatch(actions.getPlayer(id)),
  searchBasicPlayer: (name) => dispatch(actions.searchBasicPlayer(name)),
  getNews: (query) => dispatch(getNews(query)),
  getTweets: (query) => dispatch(getTweets(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);