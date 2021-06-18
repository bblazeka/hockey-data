import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Header } from 'semantic-ui-react';
import { IsNullOrUndefined } from '../../util/common';

import './Home.scss';
import * as gameActions from '../../services/game';
import * as actions from '../../services/news';
import { GameCard, Loader, NewsFeed, NotFound, SocialFeed } from '../../components';

class Home extends Component {

  componentDidMount() {
    this.props.getGamesToday();
    this.props.getNews('NHL');
    this.props.getTweets('NHL');
  }

  render() {
    const { homeNews, tweets, games, loadingNews, loadingTweets } = this.props;
    if (loadingNews && loadingTweets) {
      return (<div><Loader></Loader></div>);
    }
    return (
      <div>
        <Header as="h2">Today NHL games</Header>
        <Card.Group>
          {(IsNullOrUndefined(games) || games.length === 0) && <NotFound text="No games found." />}
          {games.map((game) => {
            return (<GameCard key={`gamecard${game.gamePk}`} game={game} />);
          })}
        </Card.Group>
        <div className="news-container">
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column><NewsFeed news={homeNews}></NewsFeed></Grid.Column>
              <Grid.Column><SocialFeed tweets={tweets}></SocialFeed></Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  homeNews: state.news.news,
  loadingNews: state.news.loadingNews,
  teams: state.team.teams,
  tweets: state.news.tweets,
  loadingTweets: state.news.loadingTweets,
  games: state.game.gamesToday
});

const mapDispatchToProps = dispatch => ({
  getNews: (query) => dispatch(actions.getNews(query)),
  getTweets: (query) => dispatch(actions.getTweets(query)),
  getGamesToday: () => dispatch(gameActions.getGamesToday())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);