import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Feed, Image, Label } from 'semantic-ui-react';

import * as actions from '../../services/news';
import Loader from '../../components/Loader/Loader';

import './Home.css';
import { SocialFeed } from '../../components';
import { isNullOrUndefined } from '../../util/common';

class Home extends Component {

  constructor(props) {
    super(props)

    this.props.getHome()
    this.props.getTweets("NHL")
  }

  render() {
    const { homeNews, tweets } = this.props;
    if (!homeNews) {
      return (<div><Loader></Loader></div>)
    }
    return (
      <div className="news-container">
        <Feed>
          {homeNews.map((article, index) => {
            return (<Feed.Event key={index}>
              <Feed.Content>
                <Feed.Label>
                  <Image src={article.images[0].url} className="mid-logo" alt={article.images[0].url} />
                </Feed.Label>
                <Feed.Summary>
                  <Feed.User>{article.headline}</Feed.User>
                  <Feed.Date>ESPN</Feed.Date>
                </Feed.Summary>
                <Feed.Extra>
                  {article.description}
                </Feed.Extra>
                <Feed.Meta>
                  {article.categories.filter(a => !isNullOrUndefined(a.description) && a.description !== "news").map((category) => {
                    return (
                      <Label key={`${category.uid}${category.id}`}>
                        {category.description}
                      </Label>
                    )
                  })}
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>);
          })}
        </Feed>
        <SocialFeed tweets={tweets}></SocialFeed>
      </div>);
  }
}

const mapStateToProps = state => ({
  homeNews: state.news.homeNews,
  teams: state.team.teams,
  tweets: state.news.tweets,
})

const mapDispatchToProps = dispatch => ({
  getHome: () => dispatch(actions.getHome()),
  getTweets: (query) => dispatch(actions.getTweets(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);