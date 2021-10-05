import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Grid, Header } from "semantic-ui-react";

import * as gameActions from "services/game";
import * as actions from "services/news";
import { GameCard, Loader, NewsFeed, NotFound, SocialFeed } from "components";
import { selectHome } from "services/selectors";
import { IsNullOrUndefined } from "util/common";

export default function Home() {
  const { homeNews, loadingNews, tweets, loadingTweets, games } =
    useSelector(selectHome);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gameActions.getGamesToday());
    dispatch(actions.getNews("NHL"));
    dispatch(actions.getTweets("NHL"));
  }, [dispatch]);

  if (loadingNews && loadingTweets) {
    return <Loader></Loader>;
  }
  return (
    <>
      <Header as="h2">Today NHL games</Header>
      {(IsNullOrUndefined(games) || games.length === 0) && (
        <NotFound text="No games found." />
      )}
      <Card.Group>
        {games.map((game) => {
          return <GameCard key={`gamecard${game.gamePk}`} game={game} />;
        })}
      </Card.Group>
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
