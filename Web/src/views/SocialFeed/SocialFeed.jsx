import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Feed, Label } from 'semantic-ui-react';

import * as actions from '../../services/news';
import './SocialFeed.css';
import Loader from '../../components/Loader/Loader';

class SocialFeed extends Component {

  constructor(props) {
    super(props)

    this.props.getTweets()
  }

  render() {
    const { tweets } = this.props;
    if (!tweets) {
      return (<div><Loader></Loader></div>)
    }
    return (
      <div className="news-container">
        <Feed>
          {tweets.map((start) => {
            return (<Feed.Event key={start.id}>
              <Feed.Label>
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User>{start.user.name} (@{start.user.screen_name})</Feed.User>
                  <Feed.Date>{start.created_at}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra>
                  {start.text}
                </Feed.Extra>
                <Feed.Meta>
                  {start.entities.hashtags.map((hashtag) => {
                    return (
                      <Label key={`${start.user.id}${hashtag.text}`}>
                        {hashtag.text}
                      </Label>
                    )
                  })}
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>);
          })}
        </Feed>
      </div>);
  }
}

const mapStateToProps = state => ({
  tweets: state.news.tweets,
})

const mapDispatchToProps = dispatch => ({
  getTweets: () => dispatch(actions.getTweets())
})

export default connect(mapStateToProps, mapDispatchToProps)(SocialFeed);