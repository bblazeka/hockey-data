import React from 'react';
import { Feed, Label } from 'semantic-ui-react';

import './SocialFeed.css';
import Loader from '../Loader/Loader';
import { Header } from 'semantic-ui-react';

function SocialFeed(props) {
  const { tweets } = props;
  if (tweets === undefined)
  {
    return (<Loader></Loader>)
  }
  return (
    <div className="news-container">
      <Header as='h3'>Feed</Header>
      <Feed>
        {tweets.map((start) => {
          return (
          <Feed.Event key={start.id}>
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

export default SocialFeed;