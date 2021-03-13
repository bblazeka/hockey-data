import React from 'react';
import { Feed, Header, Icon, Label } from 'semantic-ui-react';
import { IsNullOrUndefined } from  'common';

import './SocialFeed.scss';
import Loader from '../Loader/Loader';

function SocialFeed(props) {
  const { tweets } = props;
  if (IsNullOrUndefined(tweets))
  {
    return (<Loader></Loader>)
  }
  return (
    <div className="news-container">
      <Header as='h3'>Feed</Header>
      <Feed>
        {tweets.length === 0 && <div>Nothing found.</div>}
        {tweets.map((start) => {
          return (
          <Feed.Event key={start.id}>
            <Feed.Label>
              <Icon name="twitter"></Icon>
            </Feed.Label>
            <Feed.Content>
              <Feed.Summary>
                <Feed.User>{start.user.name} (@{start.user.screenName})</Feed.User>
                <Feed.Date>{start.createdAt}</Feed.Date>
              </Feed.Summary>
              <Feed.Extra>
                {start.text}
              </Feed.Extra>
              <Feed.Meta>
                {start.entities.map((hashtag) => {
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