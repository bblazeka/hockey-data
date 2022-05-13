import React from "react";
import { Feed, Header, Icon, Label } from "semantic-ui-react";
import styled from "styled-components";

import { Loader, NotFound } from "components";

const NewsContainerStyled = styled.div`
  padding: 20px;
`;

function SocialFeed({ tweets }) {
  if (!tweets) {
    return <Loader text="Loading social feed..."></Loader>;
  }
  return (
    <NewsContainerStyled>
      <Header as="h3">Feed</Header>
      <Feed>
        {tweets.length === 0 && <NotFound />}
        {tweets.map((tweet) => {
          return (
            <Feed.Event key={`socialFeed${tweet.id}`}>
              <Feed.Label>
                <Icon name="twitter"></Icon>
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Feed.User href={tweet.url} target="_blank">
                    {tweet.user.name} (@{tweet.user.screenName})
                  </Feed.User>
                  <Feed.Date>{tweet.createdAt}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra>{tweet.text}</Feed.Extra>
                <Feed.Meta>
                  {tweet.entities.map((hashtag, index) => {
                    return (
                      <Label
                        key={`${index}${tweet.id}${tweet.user.id}${hashtag.text}`}
                      >
                        {hashtag.text}
                      </Label>
                    );
                  })}
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          );
        })}
      </Feed>
    </NewsContainerStyled>
  );
}

export default React.memo(SocialFeed);
