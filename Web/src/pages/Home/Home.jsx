import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";

import * as actions from "services/news";
import { Loader, NewsFeed, SocialFeed } from "components";
import { selectHome } from "services/selectors";

import GameCards from "./GameCards";

export default function Home() {
  const { homeNews, loadingNews, tweets, loadingTweets } =
    useSelector(selectHome);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getNews("NHL"));
    dispatch(actions.getTweets("NHL"));
  }, [dispatch]);

  if (loadingNews && loadingTweets) {
    return <Loader></Loader>;
  }
  return (
    <>
      <GameCards />
      <div className="news-container">
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
      </div>
    </>
  );
}
