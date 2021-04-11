import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Header } from 'semantic-ui-react';
import { IsNullOrUndefined } from 'common';

import './Home.scss';
import * as leagueActions from '../../services/league';
import * as actions from '../../services/news';
import { GameCard, Loader, NewsFeed, NotFound, SocialFeed } from '../../components';

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
        <Header as="h2">Today NHL games</Header>
        <Card.Group>
          {(IsNullOrUndefined(games) || games.length===0) && <NotFound text="No games found." />}
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