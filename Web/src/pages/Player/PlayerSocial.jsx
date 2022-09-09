
import React from "react";
import { Grid } from "semantic-ui-react";

import { NewsFeed, SocialFeed, Loader } from "components";
import { useQuery } from "@apollo/client";
import { getNews, getTweets } from "services/querySchemas/misc";

export default function PlayerHeader({ player }) {

  const {loading: loadingNews, data: newsData } = useQuery(getNews, { variables: { query: player.fullName }});
  const {loading: loadingTweets, data: tweetsData} = useQuery(getTweets, { variables: { query: player.fullName}});

  if (loadingNews || loadingTweets) {
    return <Loader />;
  }
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <NewsFeed news={newsData?.articles}></NewsFeed>
        </Grid.Column>
        <Grid.Column>
          <SocialFeed tweets={tweetsData?.tweets}></SocialFeed>
        </Grid.Column>
      </Grid.Row>
    </Grid>);
}