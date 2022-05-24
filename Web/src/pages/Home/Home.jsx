import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";

import { Loader, NewsFeed, SocialFeed } from "components";
import { selectHome } from "reducers/selectors";

import GameCards from "./GameCards";
import { getNews, getTweets } from "reducers/miscActions";

export default function Home() {
  const { homeNews, loadingNews, tweets, loadingTweets } =
    useSelector(selectHome);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews("NHL"));
    dispatch(getTweets("NHL"));
  }, [dispatch]);

  if (loadingNews && loadingTweets) {
    return <Loader />;
  }
  return (
    <>
      <GameCards />
      <>
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <NewsFeed news={homeNews}></NewsFeed>
            </Grid.Column>
            <Grid.Column>
              <SocialFeed tweets={tweets}></SocialFeed>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
    </>
  );
}
