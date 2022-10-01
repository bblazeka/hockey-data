import React from "react";
import { Grid } from "semantic-ui-react";
import { useQuery } from "@apollo/client";

import { Loader, NewsFeed, SocialFeed } from "components";
import { getNews, getTweets } from "services/querySchemas/misc";

import GameCards from "./GameCards";

export default function Home() {

  const {loading: loadingNews, data: newsData } = useQuery(getNews, { variables: { query: "NHL" }});
  const {loading: loadingTweets, data: tweetsData} = useQuery(getTweets, { variables: { query: "NHL"}});

  if (loadingNews || loadingTweets) {
    return <Loader />;
  }
  return (
    <>
      <GameCards />
      <>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <NewsFeed news={newsData?.articles}></NewsFeed>
            </Grid.Column>
            <Grid.Column>
              <SocialFeed tweets={tweetsData?.tweets}></SocialFeed>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    </>
  );
}
