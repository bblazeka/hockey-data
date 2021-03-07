import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as leagueActions from '../../services/league';
import * as actions from '../../services/news';
import Loader from '../../components/Loader/Loader';
import { Card, Grid, Header } from 'semantic-ui-react';

import './Home.scss';
import { GameCard, SocialFeed } from '../../components';
import NewsFeed from '../../components/NewsFeed/NewsFeed';

class Home extends Component {

  componentDidMount() {
    this.props.getGamesToday();
    this.props.getNews("NHL");
    this.props.getTweets("NHL");
  }

  render() {
    const { homeNews, tweets, games } = this.props;
    if (!homeNews) {
      return (<div><Loader></Loader></div>)
    }
    return (
      <div>
        <Header as="h2">Today's NHL games</Header>
        <Card.Group>
          {games.map((game)=> {
            return (<GameCard key={`gamecard${game.gamePk}`} game={game} />)
          })}
        </Card.Group>
        <div className="news-container">
          <Grid columns={2}><Grid.Row>
            <Grid.Column><NewsFeed news={homeNews}></NewsFeed></Grid.Column>
            <Grid.Column><SocialFeed tweets={tweets}></SocialFeed></Grid.Column>
          </Grid.Row></Grid>
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  homeNews: state.news.news,
  teams: state.team.teams,
  tweets: state.news.tweets,
  games: state.league.gamesToday
})

const mapDispatchToProps = dispatch => ({
  getNews: (query) => dispatch(actions.getNews(query)),
  getTweets: (query) => dispatch(actions.getTweets(query)),
  getGamesToday: () => dispatch(leagueActions.getGamesToday())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);